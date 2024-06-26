
import React from 'react';
import { useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';

export default function Sidebar() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    
  };

  return (
    <div className="h-screen w-64 bg-blue-800 text-white flex flex-col fixed top-0 left-0">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Interview App</h1>
      </div>
      <nav className="mt-4 flex-1">
        <ul>
          <li className="py-2 px-4 hover:bg-blue-700">
            <Link to="/home">Home</Link>
          </li>
          <li className="py-2 px-4 hover:bg-blue-700">
            <Link to="/lobby">Interview Rooms</Link>
          </li>
          <li className="py-2 px-4 hover:bg-blue-700">
            <Link to="/about">About</Link>
          </li>
          <li className="py-2 px-4 hover:bg-blue-700">
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>
      <div className="m-4">
        <Link 
          to="/add-interview"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Interview
        </Link>
      </div>
    </div>
  );
}
