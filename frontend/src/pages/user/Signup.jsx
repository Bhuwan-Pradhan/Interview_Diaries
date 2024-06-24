import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSignupData } from "../../slices/authSlice";
import { signUp } from "../../services/authApi";
import logo from "../../assets/logo.png";
import defaultProfilePic from "../../assets/default-profile-pic.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    avatar: null,
  });

  const { fullName, username, email, password, avatar } = formData;
  const [profilePicPreview, setProfilePicPreview] = useState(defaultProfilePic);

  const handleOnChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "avatar" && files.length > 0) {
      const file = files[0];
      setFormData((prevData) => ({
        ...prevData,
        avatar: file,
      }));
      setProfilePicPreview(URL.createObjectURL(file));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (!fullName || !username || !email || !password || !avatar) {
      toast.error("All fields are required, including the profile picture.");
      return;
    }

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("fullName", fullName);
    formDataToSubmit.append("username", username);
    formDataToSubmit.append("email", email);
    formDataToSubmit.append("password", password);
    formDataToSubmit.append("avatar", avatar);


    dispatch(setSignupData(formDataToSubmit));
    dispatch(signUp(formDataToSubmit, navigate));

    // Reset
    setFormData({
      fullName: "",
      username: "",
      email: "",
      password: "",
      avatar: null,
    });
    setProfilePicPreview(defaultProfilePic);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer />
      <form
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        onSubmit={handleOnSubmit}
      >
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Interview Diaries" className="w-32" />
        </div>
        <h1 className="text-2xl font-bold mb-6 text-center">Signup</h1>

        <div className="flex flex-col items-center mb-6 relative">
          <input
            className="hidden"
            type="file"
            name="avatar"
            accept="image/*"
            id="profilePic"
            onChange={handleOnChange}
          />
          <label htmlFor="profilePic" className="cursor-pointer">
            <img
              src={profilePicPreview}
              alt="Profile Preview"
              className="w-24 h-24 rounded-full object-cover border-2 border-blue-600"
            />
            <div className="absolute bottom-0  bg-blue-600 text-white p-1 rounded-full">
              <FontAwesomeIcon icon={faPencilAlt} />
            </div>
          </label>
        </div>

        <div className="space-y-4">
          <div>
            <input
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
              type="text"
              name="fullName"
              placeholder="Enter Full Name"
              value={fullName}
              onChange={handleOnChange}
            />
          </div>
          <div>
            <input
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
              type="text"
              name="username"
              placeholder="Enter User Name"
              value={username}
              onChange={handleOnChange}
            />
          </div>
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
            Signup
          </button>
        </div>

        <div className="mt-4 text-center">
          Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a>
        </div>
      </form>
    </div>
  );
}