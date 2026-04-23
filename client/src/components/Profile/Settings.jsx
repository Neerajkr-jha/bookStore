import axios from "axios";
import React, { useEffect, useState } from "react";
import { Loader } from "../Loader/Loader";
import { useDarkMode } from "../DarkMode/DarkModeContext";

const Settings = () => {
  const [profileData, setProfileData] = useState();
  const [value, setValue] = useState({ address: "" });
  const { isDark } = useDarkMode();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "https://bookify-bwff.onrender.com/api/users/user-info",
        { headers },
      );
      setProfileData(response.data);
      setValue({ address: response.data.address });
    };
    fetch();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const response = await axios.put(
      "http://localhost:8080/api/users/update-address",
      value,
      { headers },
    );
    alert(response.data.message);
  };

  const pageText = isDark ? "text-gray-100" : "text-gray-800";
  const subText = isDark ? "text-gray-300" : "text-gray-600";

  const card = isDark
    ? "bg-gray-800"
    : "bg-amber-100 border border-amber-200 shadow-sm";

  const input = isDark
    ? "bg-gray-900 text-white border-gray-700"
    : "bg-amber-50 text-gray-800 border-amber-200";

  const button = isDark
    ? "bg-violet-500 hover:bg-violet-400 text-white"
    : "bg-amber-200 hover:bg-amber-300 text-gray-800";

  return (
    <>
      {!profileData && (
        <div className="flex items-center justify-center w-full h-full">
          <Loader />
        </div>
      )}

      {profileData && (
        <div className={`w-full p-4 ${pageText}`}>
          <h1 className={`text-3xl md:text-5xl font-semibold mb-8 ${subText}`}>
            Settings
          </h1>

         
          <div className="flex gap-12 md:flex-row flex-col">
            <div>
              <label className={subText}>Username</label>
              <p className={`p-2 rounded font-semibold w-fit ${card}`}>
                {profileData.username}
              </p>
            </div>

            <div>
              <label className={subText}>Email</label>
              <p className={`p-2 rounded font-semibold w-fit ${card}`}>
                {profileData.email}
              </p>
            </div>
          </div>

         
          <div className="mt-4 flex flex-col">
            <label className={subText}>Address</label>
            <textarea
              className={`p-2 rounded mt-2 font-semibold outline-none border ${input}`}
              rows="7"
              name="address"
              placeholder="Address"
              value={value.address}
              onChange={handleChange}
            />
          </div>

          <div className="mt-4 flex md:justify-end justify-center">
            <button
              className={`cursor-pointer font-semibold px-4 py-2 rounded transition-all duration-300 ${button}`}
              onClick={handleSubmit}
            >
              Update Address
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
