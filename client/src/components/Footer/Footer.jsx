import React from "react";
import { useDarkMode } from "../DarkMode/DarkModeContext";
import { Link } from "react-router-dom";

const Footer = () => {
  const { isDark } = useDarkMode();

  return (
    <footer
      className={`w-full ${
        isDark
          ? "bg-linear-to-b from-gray-900 to-gray-950 text-gray-300"
          : "bg-linear-to-b from-amber-50 to-slate-100 text-slate-600"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col items-center">
        <div
          className={`flex items-center space-x-3 mb-6 text-2xl font-semibold
            ${isDark ? "text-white" : "text-slate-800"}`}
        >
          <img src="/favicon.svg" alt="Bookify logo" className="w-8 h-8" />
          <h1>bookify</h1>
        </div>
        <p
          className={`text-center max-w-xl text-sm font-normal leading-relaxed
            ${isDark ? "text-gray-400" : "text-slate-500"}`}
        >
          A smarter way to find the books you love. Read more, explore better
        </p>
      </div>
      <div
        className={`border-t ${isDark ? "border-zinc-700" : "border-slate-300"}`}
      >
        <div
          className={`max-w-7xl mx-auto px-6 py-6 text-center text-sm font-normal
      ${isDark ? "text-gray-400" : "text-slate-500"}`}
        >
          <Link
            className={`hover:text-purple-500 transition-colors duration-300
        ${isDark ? "text-gray-300" : "text-slate-700"}`}
          >
            bookify
          </Link>{" "}
          {"©"} 2025. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
