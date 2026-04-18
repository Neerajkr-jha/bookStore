import React from "react";
import { Link } from "react-router-dom";

const MobileNav = () => {
  return (
    <div className="lg:hidden w-full flex items-center justify-between mt-4">
        <Link
          to="/profile"
          className="text-zinc-100 font-semibold w-full text-center hover:bg-zinc-600 transition-all rounded duration-300"
        >
          Favourites
        </Link>
        <Link
          to="/profile/orderHistory"
          className="text-zinc-100 font-semibold w-full text-center hover:bg-zinc-600 transition-all rounded duration-300"
        >
          Order History
        </Link>
        <Link
          to="/profile/settings"
          className="text-zinc-100 font-semibold w-full text-center hover:bg-zinc-600 transition-all rounded duration-300"
        >
          Settings
        </Link>
      </div> 
  );
};

export default MobileNav;
