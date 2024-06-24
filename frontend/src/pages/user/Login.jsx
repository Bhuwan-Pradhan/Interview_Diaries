import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authApi";
import logo from "../../assets/logo.png";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password, navigate));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        onSubmit={handleOnSubmit}
      >
        <div className="flex justify-center mb-6">
          <img src={logo} alt="The Mind Map" className="w-32" />
        </div>
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <div className="space-y-4">
          <div>
            <input
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
              type="email"
              name="email"
              placeholder="Enter email address"
              value={email}
              onChange={handleOnChange}
            />
          </div>

          <div>
            <input
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
              type="password"
              name="password"
              placeholder="Enter Password"
              value={password}
              onChange={handleOnChange}
            />
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </div>

        <div className="mt-4 text-center">
          Don't have an account? <a href="/signup" className="text-blue-600 hover:underline">Register</a>
        </div>
      </form>
    </div>
  );
}
