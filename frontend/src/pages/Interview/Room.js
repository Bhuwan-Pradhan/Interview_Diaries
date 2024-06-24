import React, { useEffect, useCallback, useState } from "react";
import ReactPlayer from "react-player";
import peer from "../../services/peer";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../context/SocketProvider";

const RoomPage = () => {
  const navigate = useNavigate();
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const [sharedText, setSharedText] = useState("");
  const [clicked, setClicked] = useState(false);

  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`Email ${email} joined room`);
    setRemoteSocketId(id);
  }, []);

  const handleCallUser = useCallback(async () => {
    setClicked(true);
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
  }, [remoteSocketId, socket]);

  const handleIncommingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      console.log(`Incoming Call, from, offer`);
      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
    },
    [socket]
  );

  const sendStreams = useCallback(() => {
    if (myStream) {
      for (const track of myStream.getTracks()) {
        peer.peer.addTrack(track, myStream);
      }
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    ({ from, ans }) => {
      peer.setLocalDescription(ans);
      console.log("Call Accepted!");
      sendStreams();
    },
    [sendStreams]
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoNeedFinal = useCallback(async ({ ans }) => {
    await peer.setLocalDescription(ans);
  }, []);

  useEffect(() => {
    peer.peer.addEventListener("track", async (ev) => {
      const remoteStream = ev.streams;
      console.log("GOT TRACKS!!");
      setRemoteStream(remoteStream[0]);
    });
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incomming:call", handleIncommingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncomming);
    socket.on("peer:nego:final", handleNegoNeedFinal);

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incomming:call", handleIncommingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncomming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncommingCall,
    handleCallAccepted,
    handleNegoNeedIncomming,
    handleNegoNeedFinal,
  ]);

  const handleTextChange = (e) => {
    setSharedText(e.target.value);
    socket.emit("text:update", { text: e.target.value, to: remoteSocketId });
  };

  useEffect(() => {
    socket.on("text:update", ({ text }) => {
      setSharedText(text);
    });

    return () => {
      socket.off("text:update");
    };
  }, [socket]);

  const handleDisconnect = () => {
    // Clean up peer connection
    if (peer.peer) {
      const tracks = peer.peer.getSenders();
      tracks.forEach((track) => peer.peer.removeTrack(track));
      peer.peer.close();
    }
    // Reset states
    setMyStream(null);
    setRemoteSocketId(null);
    setRemoteStream(null);
    setClicked(false);
    // Notify server to end the call
    socket.emit("call:end", { to: remoteSocketId });
    navigate("/lobby");

  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 p-4 space-y-4">
        <h1 className="text-2xl font-bold">Room Page</h1>
        <h4 className="text-lg">{remoteSocketId ? "Connected" : "No one in room"}</h4>
        {remoteSocketId && !clicked && (
          <button
            onClick={handleCallUser}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            CONNECT
          </button>
        )}
        {clicked && (
          <button
            onClick={handleDisconnect}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            DISCONNECT
          </button>
        )}
        {clicked && myStream && (
          <div>
            <h1 className="text-xl font-semibold">My Stream</h1>
            <ReactPlayer
              playing
              muted
              height="200px"
              width="100%"
              url={myStream}
            />
          </div>
        )}
        {clicked && remoteStream && (
          <div>
            <h1 className="text-xl font-semibold">Remote Stream</h1>
            <ReactPlayer
              playing
              muted
              height="200px"
              width="100%"
              url={remoteStream}
            />
          </div>
        )}
      </div>
      <div className="w-1/2 p-4">
        <textarea
          className="w-full h-full border border-gray-300 p-4 rounded"
          value={sharedText}
          onChange={handleTextChange}
          placeholder="Start typing to share text..."
        />
      </div>
    </div>
  );
};

export default RoomPage;