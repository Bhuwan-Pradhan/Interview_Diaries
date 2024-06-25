import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useSocket } from '../context/SocketProvider';

const RoomCard = ({ roomC }) => {
  const socket = useSocket();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const email=user.email;
  const room=roomC.roomID;


  const handleJoinRoom = useCallback(
    (data) => {
      const { room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on('room:join', handleJoinRoom);
    return () => {
      socket.off('room:join', handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
      <div className="flex items-center">
        <img
          src={roomC.creator.avatar}
          alt={roomC.creator.fullName}
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <h3 className="text-lg font-bold">{roomC.creator.fullName}</h3>
          <p className="text-gray-600">Room ID: {roomC.roomID}</p>
        </div>
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          socket.emit('room:join', { email, room });
        }}
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        Join
      </button>
    </div>
  );
};

export default RoomCard;
