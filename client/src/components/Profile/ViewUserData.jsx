import React from "react";
import { RxCrossCircled } from "react-icons/rx";

const ViewUserData = ({ userDivData, userDiv, setUserDiv }) => {
  return (
    <>
      <div
        className={`${userDiv} top-0 left-0  h-screen w-full bg-zinc-800 opacity-80`}
      ></div>{" "}
      <div
        className={`${userDiv} top-0 left-0  h-screen w-full flex items-center justify-center`}
      >
        <div className="bg-white rounded p-4 w-[80%] lg:w-[40%] text-zinc-800">
          <div className="flex items-center justify-between">
            <h1 className="font-semibold text-2xl">User Information</h1>
            <button onClick={() => setUserDiv("hidden")}>
              <RxCrossCircled />
            </button>
          </div>
          <div className="mt-2">
            <label>
              username:{" "}
              <span className="font-semibold">{userDivData.username}</span>
            </label>
          </div>
          <div className="mt-4">
            <label>
              Email:<span className="font-semibold">{userDivData.email}</span>
            </label>
          </div>
           <div className="mt-4">
            <label>
              Address:<span className="font-semibold">{userDivData.address}</span>
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewUserData;
