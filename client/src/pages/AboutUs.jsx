import React from "react";
import {Link} from 'react-router-dom'
import { useDarkMode } from "../components/DarkMode/DarkModeContext";

const AboutUs = () => {
  const { isDark } = useDarkMode();

  return (
    <section
      className={`min-h-screen px-6 py-12
        ${isDark ? "bg-gray-900" : "bg-slate-50"}`}
    >
      <h1
        className={`text-3xl md:text-4xl font-semibold text-center
          ${isDark ? "text-white" : "text-slate-800"}`}
      >
        Meet Our Team
      </h1>

      <p
        className={`text-center mt-3 max-w-xl mx-auto text-sm md:text-base
          ${isDark ? "text-gray-400" : "text-slate-500"}`}
      >
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-12">
        {[
          {
            src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
            name: "Donald Jackman",
            role: "Founder & CEO",
          },
          {
            src: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
            name: "Michael Brown",
            role: "Head of Engineering",
          },
          {
            src: "https://randomuser.me/api/portraits/men/75.jpg",
            name: "David Thompson",
            role: "Full-Stack Developer",
          },
          {
            src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
            name: "Olivia Martinez",
            role: "Product Designer",
          },
          {
            src: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60",
            name: "Liam Anderson",
            role: "Backend Developer",
          },
          {
            src: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60",
            name: "Jordan Lee",
            role: "Marketing Lead",
          },
        ].map(({ src, name, role }) => (
          <div
            key={name}
            className={`backdrop-blur border rounded-2xl p-6 flex flex-col items-center transition-all duration-300 hover:-translate-y-1
              ${
                isDark
                  ? "bg-gray-800/70 border-gray-700 hover:shadow-lg hover:shadow-gray-900"
                  : "bg-white border-slate-200 hover:shadow-lg hover:shadow-slate-200"
              }`}
          >
            <img
              src={src}
              alt={name}
              className={`w-20 h-20 rounded-full object-cover border-2 transition
                ${isDark ? "border-gray-600" : "border-slate-300"}`}
            />

            <h3
              className={`text-lg font-semibold mt-3 text-center
                ${isDark ? "text-white" : "text-slate-800"}`}
            >
              {name}
            </h3>

            <p className="text-purple-400 text-sm text-center mt-1">{role}</p>

            <div className="flex gap-3 mt-3">
              <Link
                to="/"
                className={`transition hover:text-purple-400
                  ${isDark ? "text-gray-400" : "text-slate-400"}`}
              >
                <svg width="18" height="18" fill="none">
                  <path d="..." />
                </svg>
              </Link>
              <Link
                to="/"
                className={`transition hover:text-purple-400
                  ${isDark ? "text-gray-400" : "text-slate-400"}`}
              >
                <svg width="18" height="18" fill="none">
                  <path d="..." />
                </svg>
              </Link>
              <Link
                to="#"
                className={`transition hover:text-purple-400
                  ${isDark ? "text-gray-400" : "text-slate-400"}`}
              >
                <svg width="18" height="18" fill="none">
                  <path d="..." />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutUs;
