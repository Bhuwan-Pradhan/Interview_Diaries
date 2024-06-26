import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../../context/SocketProvider';
import Modal from 'react-modal';
import RoomCard from '../../components/RoomCard';
import 'tailwindcss/tailwind.css';
import { useDispatch, useSelector } from "react-redux";
import { createRoom, getRooms } from '../../services/roomApi';
import Sidebar from '../../components/SideBar';
Modal.setAppElement('#root');

const LobbyScreen = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);
  const email = user.email;
  const [room, setRoom] = useState('');
  const [rooms, setRooms] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const socket = useSocket();
  const navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setRoom('');
  };

  const handleCreateRoom = async () => {
    dispatch(createRoom(token));
  };

  const handleJoinRoom = useCallback(
    (data) => {
      const { room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await getRooms();
        setRooms(response);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, [rooms]);

  useEffect(() => {
    socket.on('room:join', handleJoinRoom);
    return () => {
      socket.off('room:join', handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-8">Lobby</h1>
        <div className="space-x-4 mb-4">
          <button
            onClick={handleCreateRoom}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Create Room
          </button>
          <button
            onClick={openModal}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Join Room
          </button>
        </div>

        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          className="bg-white rounded-lg p-8 shadow-lg max-w-lg mx-auto mt-10"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <h2 className="text-2xl font-bold mb-4">Join Room</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              socket.emit('room:join', { email, room });
              closeModal();
            }}
            className="space-y-4"
          >
            <div>
              <label htmlFor="roomID" className="block text-gray-700">
                Room ID
              </label>
              <input
                type="text"
                id="roomID"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className="mt-1 p-2 border rounded w-full"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                Join
              </button>
            </div>
          </form>
        </Modal>

        <div className="mt-8 ml-72">
          <h2 className="text-2xl font-bold mb-4">Available Rooms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rooms.map((roomC) => (
              <RoomCard key={roomC.roomID} roomC={roomC} />
            ))}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default LobbyScreen;
