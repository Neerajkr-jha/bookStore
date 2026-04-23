import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDarkMode } from "../components/DarkMode/DarkModeContext";

const SignUp = () => {
  const { isDark } = useDarkMode();
  const navigate = useNavigate();
  const [Values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });

  const handleChnage = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      if (
        Values.username === "" ||
        Values.email === "" ||
        Values.address === "" ||
        Values.password === ""
      ) {
        toast.error("All fields are required");
      } else {
        const response = await axios.post(
          "https://bookify-bwff.onrender.com/api/users/sign-up",
          Values,
        );
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const inputClass = `w-full mt-2 px-3 py-2 rounded-lg border focus:outline-none transition-colors duration-200
    ${
      isDark
        ? "bg-gray-900 text-gray-100 border-gray-700 placeholder-gray-500"
        : "bg-slate-50 text-slate-800 border-slate-300 placeholder-slate-400"
    }`;

  const labelClass = `${isDark ? "text-gray-400" : "text-slate-600"}`;

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 ${isDark ? "bg-gray-900" : "bg-slate-50"}`}
    >
      <div
        className={`rounded border px-8 py-5 w-full md:w-3/6 lg:w-2/6
        ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-slate-200 shadow-sm"}`}
      >
        <p
          className={`text-2xl text-center ${isDark ? "text-gray-400" : "text-slate-700"}`}
        >
          Sign Up
        </p>
        <div className="mt-4">
          <div>
            <label className={labelClass}>Username</label>
            <input
              value={Values.username}
              onChange={handleChnage}
              type="text"
              name="username"
              placeholder="Username"
              className={inputClass}
              required
            />
          </div>
          <div className="mt-4">
            <label className={labelClass}>Email</label>
            <input
              value={Values.email}
              onChange={handleChnage}
              type="email"
              name="email"
              placeholder="Email"
              className={inputClass}
              required
            />
          </div>
          <div className="mt-4">
            <label className={labelClass}>Password</label>
            <input
              value={Values.password}
              onChange={handleChnage}
              type="password"
              name="password"
              placeholder="Password"
              className={inputClass}
              required
            />
          </div>
          <div className="mt-4">
            <label className={labelClass}>Address</label>
            <textarea
              value={Values.address}
              onChange={handleChnage}
              rows={5}
              name="address"
              className={inputClass}
              required
            />
          </div>
          <div className="mt-4">
            <button
              className="w-full py-2 rounded-lg font-semibold text-white bg-violet-500 hover:bg-violet-600 transition-all duration-300"
              onClick={handleSubmit}
            >
              Sign Up
            </button>
          </div>
          <p
            className={`text-center mt-4 ${isDark ? "text-gray-500" : "text-slate-400"}`}
          >
            or
          </p>
          <p
            className={`text-center text-sm mt-4 ${isDark ? "text-gray-400" : "text-slate-500"}`}
          >
            Already have an account?{" "}
            <Link
              className="text-purple-400 hover:text-purple-300 transition"
              to="/login"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
      <Toaster position="top-center" />
    </div>
  );
};

export default SignUp;
