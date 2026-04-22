import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import toast, { Toaster } from "react-hot-toast";
import { authActions } from "../../app/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useDarkMode } from "../DarkMode/DarkModeContext";

const Sidebar = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector((state) => state.auth.role);
  const { isDark } = useDarkMode();

  const handleLogout = async () => {
    toast.success("Logout Successfully");
    dispatch(authActions.logout());
    dispatch(authActions.changeRole("user"));
    localStorage.clear();
    navigate("/login");
  };

 
  const containerClass = `p-4 rounded flex flex-col gap-4 md:gap-0 items-center justify-between h-full transition-all duration-300
    ${
      isDark
        ? "bg-gray-800 text-white"
        : "bg-amber-100 text-gray-800"
    }`;

  const textPrimary = isDark ? "text-gray-100" : "text-gray-800";
  const textSecondary = isDark ? "text-gray-300" : "text-gray-600";

  const linkClass = `font-semibold w-full py-2 text-center rounded transition-all duration-300
    ${
      isDark
        ? "text-gray-100 hover:bg-gray-700"
        : "text-gray-700 hover:bg-amber-200"
    }`;

  const logoutBtn = `lg:w-full w-3/6 md:w-full mt-4 lg:mt-0 font-semibold flex items-center justify-center py-2 rounded transition-all duration-300
    ${
      isDark
        ? "bg-gray-900 text-white hover:bg-violet-400 hover:text-slate-900"
        : "bg-amber-200 text-gray-800 hover:bg-amber-300"
    }`;

  return (
    <div className={containerClass}>
    
      <div className="flex flex-col justify-center items-center">
        <img src={data.avatar} alt="avatar" className="h-[10vh]" />
        <p className={`${textPrimary} mt-3 text-xl`}>{data.username}</p>
        <p
          className={`${textSecondary} mt-3 font-normal md:hidden block lg:block`}
        >
          {data.email}
        </p>

        <div
          className={`w-full h-px mt-4 ${isDark ? "bg-gray-600" : "bg-amber-300"} lg:block hidden`}
        />
      </div>

      {/* User Links */}
      {role === "user" && (
        <div className="w-full flex-col items-center justify-center hidden py-2 lg:flex">
          <Link to="/profile" className={linkClass}>
            Favourites
          </Link>
          <Link to="/profile/orderHistory" className={`${linkClass} mt-4`}>
            Order History
          </Link>
          <Link to="/profile/settings" className={`${linkClass} mt-4`}>
            Settings
          </Link>
        </div>
      )}

      {/* Admin Links */}
      {role === "admin" && (
        <div className="w-full flex-col items-center justify-center hidden py-2 lg:flex">
          <Link to="/profile" className={linkClass}>
            Orders
          </Link>
          <Link to="/profile/add-book" className={`${linkClass} mt-4`}>
            Add Book
          </Link>
        </div>
      )}

      {/* Logout */}
      <button onClick={handleLogout} className={logoutBtn}>
        Log out <FaArrowRightFromBracket className="ms-4" />
      </button>

      <Toaster position="top-center" />
    </div>
  );
};

export default Sidebar;
