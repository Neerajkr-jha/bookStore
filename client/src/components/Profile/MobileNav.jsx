import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDarkMode } from "../DarkMode/DarkModeContext";

const MobileNav = () => {
  const role = useSelector((state) => state.auth.role);
  const { isDark } = useDarkMode();

  const linkClass = `font-semibold w-full py-2 text-center rounded transition-all duration-300
    ${
      isDark
        ? "text-gray-100 hover:bg-gray-700"
        : "text-gray-800 hover:bg-amber-200"
    }`;

  const container = `lg:hidden w-full flex items-center justify-between mt-4 gap-2 p-2 rounded
    ${
      isDark ? "bg-gray-800" : "bg-amber-100 border border-amber-200 shadow-sm"
    }`;

  return (
    <>
      {role === "user" && (
        <div className={container}>
          <Link to="/profile" className={linkClass}>
            Favourites
          </Link>
          <Link to="/profile/orderHistory" className={linkClass}>
            Orders
          </Link>
          <Link to="/profile/settings" className={linkClass}>
            Settings
          </Link>
        </div>
      )}

      {role === "admin" && (
        <div className={container}>
          <Link to="/profile" className={linkClass}>
            Orders
          </Link>
          <Link to="/profile/add-book" className={linkClass}>
            Add Book
          </Link>
        </div>
      )}
    </>
  );
};

export default MobileNav;
