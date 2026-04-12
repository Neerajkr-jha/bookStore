import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRightFromBracket } from "react-icons/fa6";

const Sidebar = ({ data }) => {
  return (
    <div className="bg-zinc-800 p-4 rounded text-white flex flex-col gap-4 md:gap-0 items-center justify-between h-full">
      <div className="flex flex-col justify-center items-center">
        <img src={data.avatar} alt="avatar" className="h-[10vh]" />
        <p className="text-zinc-100 mt-3 text-xl">{data.username}</p>
        <p className="text-zinc-300 mt-1 font-normal">{data.email}</p>
        <div className="w-full h-px mt-4 bg-zinc-500 lg:block hidden"></div>
      </div>
      <div className="w-full flex-col items-center justify-center hidden py-2 lg:flex">
        <Link
          to="/profile"
          className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-600 transition-all rounded duration-300"
        >
          Favourites
        </Link>
        <Link
          to="/profile/orderHistory"
          className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-600 transition-all mt-4 rounded duration-300"
        >
          Order History
        </Link>
        <Link
          to="/profile/settings"
          className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-600 transition-all mt-4 rounded duration-300"
        >
          Settings
        </Link>
      </div>

      <button className="bg-zinc-900 lg:w-full w-3/6 mt-4 lg:mt-0 text-white font-semibold flex items-center justify-center py-2 rounded hover:bg-white hover:text-zinc-900 transition-all duration-300">
        Log out <FaArrowRightFromBracket className="ms-4"/>
      </button>
    </div>
  );
};

export default Sidebar;
