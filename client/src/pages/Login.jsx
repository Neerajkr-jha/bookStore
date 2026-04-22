import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../app/authSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const [Values, setValues] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChnage = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      if (Values.username === "" || Values.password === "") {
        toast.error("All fields are required");
      } else {
        const response = await axios.post(
          "http://localhost:8080/api/users/sign-in",
          Values,
        );
        toast.success("Login Successfully");
        dispatch(authActions.login());
        dispatch(authActions.changeRole(response.data.role));
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div
        className="w-full max-w-md bg-gray-800 border border-gray-700 rounded p-8"
      >
   
        <h1 className="text-2xl font-semibold text-white text-center">
          Welcome Back
        </h1>
        <p className="text-gray-400 text-center mt-1">Login to your account</p>

        <div className="mt-6">
      
          <div>
            <label className="text-gray-400 text-sm">Username</label>
            <input
              value={Values.username}
              onChange={handleChnage}
              type="text"
              name="username"
              placeholder="Enter username"
              className="w-full mt-2 px-3 py-2 rounded-lg bg-gray-900 text-gray-100 border border-gray-700 focus:outline-none"
              required
            />
          </div>
          <div className="mt-4">
            <label className="text-gray-400 text-sm">Password</label>
            <input
              value={Values.password}
              onChange={handleChnage}
              type="text"
              name="password"
              placeholder="Enter password"
              className="w-full mt-2 px-3 py-2 rounded-lg bg-gray-900 text-gray-100 border border-gray-700 focus:outline-none"
              required
            />
          </div>
          <div className="mt-6">
            <button
              className="w-full py-2 rounded-lg font-semibold text-white bg-gray-500 hover:cursor-pointer transition-all duration-300"
              onClick={handleSubmit}
            >
              Login
            </button>
          </div>

          <p className="text-center text-gray-500 mt-6">or</p>

        
          <p className="text-center text-gray-400 mt-4 text-sm">
            Don't have an account?{" "}
            <Link
              className="text-purple-400 hover:text-purple-300 transition"
              to="/signup"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      <Toaster position="top-center" />
    </div>
  );
};

export default Login;
