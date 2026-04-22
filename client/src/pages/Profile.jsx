import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Profile/Sidebar";
import { useSelector } from "react-redux";
import axios from "axios";
import {Loader} from "../components/Loader/Loader.jsx";
import MobileNav from "../components/Profile/MobileNav.jsx";

const Profile = () => {
  const [profile, setProfile] = useState();
  //const isLoggedIn = useSelector((state) => state.auth);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:8080/api/users/user-info",
        { headers },
      );
      setProfile(response.data);
    };
    fetch();
  }, []);

  return (
    <div className="bg-gray-900 flex min-h-screen px-2 md:pl-10 flex-col md:flex-row py-4 md:py-8 text-white">
      <>
        {!profile && 
        <div className="flex items-center justify-center w-full h-full">
          <Loader />
        </div> }
        {profile && (
          <>
            <div className="w-full md:w-1/6 h-full">
              <Sidebar data={profile} />
              <MobileNav/>
            </div>
            <div className="w-full md:w-5/6">
              <Outlet />
            </div>
          </>
        )}
      </>
    </div>
  );
};

export default Profile;
