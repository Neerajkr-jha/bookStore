import axios from "axios";
import React, { useEffect, useState } from "react";
import { Loader } from "../Loader/Loader";

const Settings = () => {
  const [profileData, setProfileData] = useState();
  const [value, setValue] = useState({ address: "" });
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
      setProfileData(response.data);
      setValue({ address: response.data.address });
    };
    fetch();
  }, []);

  const handleChnage = (e) => {
    const { name, value } = e.target;
    setValue({ ...value, [name]: value });
  };
  const handleSubmit = async () => {
    const response = await axios.put(
      "http://localhost:8080/api/users/update-address",
      value,
      {headers},
    );
    alert(response.data.message);
  };
  return (
    <>
      {!profileData && (
        <div className="flex items-center justify-center w-full h-full">
          <Loader />
        </div>
      )}
      {profileData && (
        <div className="w-full p-4 md:p-4 text-gray-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-gray-200 mb-8">
            Settings
          </h1>
          <div className="flex gap-12 md:flex-row flex-col">
            <div>
              <label>Username</label>
              <p className="p-2 rounded bg-gray-800 font-semibold w-fit">
                {profileData.username}
              </p>
            </div>
            <div>
              <label>Email</label>
              <p className="p-2 rounded bg-gray-800 font-semibold w-fit">
                {profileData.email}
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-col">
            <label>Address</label>
            <textarea
              className="p-2 rounded bg-gray-800 mt-2 font-semibold outline-none"
              rows="7"
              name="address"
              placeholder="Address"
              value={value.address}
              onChange={handleChnage}
            ></textarea>
          </div>
          <div className="mt-4 flex md:justify-end justify-center">
            <button
              className="cursor-pointer bg-violet-500 text-gray-100 font-semibold px-3 py-2 rounded hover:bg-violet-400"
              onClick={handleSubmit}
            >
              Update address
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
