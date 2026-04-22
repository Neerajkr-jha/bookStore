import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../app/authSlice";
import { useDispatch } from "react-redux";
import { useDarkMode } from "../components/DarkMode/DarkModeContext";

const Login = () => {
  const { isDark } = useDarkMode();
  const [Values, setValues] = useState({ username: "", password: "" });
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
        setTimeout(() => { navigate("/"); }, 1000);
      }
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const inputClass = `w-full mt-2 px-3 py-2 rounded-lg border focus:outline-none transition-colors duration-200
    ${isDark
      ? "bg-gray-900 text-gray-100 border-gray-700 placeholder-gray-500"
      : "bg-slate-50 text-slate-800 border-slate-300 placeholder-slate-400"
    }`;

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 ${isDark ? "bg-gray-900" : "bg-slate-50"}`}>
      <div className={`w-full max-w-md border rounded p-8
        ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-slate-200 shadow-sm"}`}
      >
        <h1 className={`text-2xl font-semibold text-center ${isDark ? "text-white" : "text-slate-800"}`}>
          Welcome Back
        </h1>
        <p className={`text-center mt-1 ${isDark ? "text-gray-400" : "text-slate-500"}`}>
          Login to your account
        </p>

        <div className="mt-6">
          <div>
            <label className={`text-sm ${isDark ? "text-gray-400" : "text-slate-600"}`}>Username</label>
            <input
              value={Values.username}
              onChange={handleChnage}
              type="text"
              name="username"
              placeholder="Enter username"
              className={inputClass}
              required
            />
          </div>
          <div className="mt-4">
            <label className={`text-sm ${isDark ? "text-gray-400" : "text-slate-600"}`}>Password</label>
            <input
              value={Values.password}
              onChange={handleChnage}
              type="password"
              name="password"
              placeholder="Enter password"
              className={inputClass}
              required
            />
          </div>
          <div className="mt-6">
            <button
              className="w-full py-2 rounded-lg font-semibold text-white bg-violet-500 hover:bg-violet-600 transition-all duration-300"
              onClick={handleSubmit}
            >
              Login
            </button>
          </div>

          <p className={`text-center mt-6 ${isDark ? "text-gray-500" : "text-slate-400"}`}>or</p>

          <p className={`text-center mt-4 text-sm ${isDark ? "text-gray-400" : "text-slate-500"}`}>
            Don't have an account?{" "}
            <Link className="text-purple-400 hover:text-purple-300 transition" to="/signup">
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