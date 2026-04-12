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
        dispatch(authActions.changeRole(response.data.role))
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
    <div className="h-screen bg-zinc-900 px-12 py-8 flex items-center justify-center">
      <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
        <p className="text-zinc-200 text-xl">Login</p>
        <div className="mt-4">
          <div>
            <label htmlFor="username" className="text-zinc-400">
              Username
            </label>
            <input
              value={Values.username}
              onChange={handleChnage}
              type="text"
              name="username"
              placeholder="Username"
              className="w-full mt-2 outline-none bg-zinc-900 text-zinc-100 p-2"
              required
            />
          </div>
          <div className="mt-4">
            <label htmlFor="password" className="text-zinc-400">
              Password
            </label>
            <input
              value={Values.password}
              onChange={handleChnage}
              type="text"
              name="password"
              placeholder="password"
              className="w-full mt-2 outline-none bg-zinc-900 text-zinc-100 p-2"
              required
            />
          </div>
          <div className="mt-4">
            <button
              className="py-2 w-full bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
              onClick={handleSubmit}
            >
              Login
            </button>
          </div>
          <p className="text-center text-zinc-200 font-medium text-2xl mt-4">
            or
          </p>
          <p className="text-center text-zinc-200 font-light mt-4">
            Don't have an account ? &nbsp;
            <Link className="hover:text-blue-500" to="/signup">
              <u>Sign Up</u>
            </Link>
          </p>
        </div>
      </div>
      <Toaster position="top-center" />
    </div>
  );
};

export default Login;
