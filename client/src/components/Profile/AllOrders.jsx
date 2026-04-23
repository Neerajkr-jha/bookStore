import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader } from "../Loader/Loader";
import { FaCheck, FaUserLarge } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { IoOpenOutline } from "react-icons/io5";
import ViewUserData from "./ViewUserData";
import { useDarkMode } from "../DarkMode/DarkModeContext";

const AllOrders = () => {
  const { isDark } = useDarkMode();
  const [allOrders, setAllOrders] = useState();
  const [options, setOptions] = useState();
  const [values, setValues] = useState({ status: "Order Placed" });
  const [userDiv, setUserDiv] = useState("hidden");
  const [userDivData, setUserDivData] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "https://bookify-bwff.onrender.com/api/order/get-all-orders",
        { headers },
      );
      setAllOrders(response.data.data);
    };
    fetch();
  }, [allOrders]);

  const handleChange = (e) => {
    const { value } = e.target;
    setValues({ status: value });
  };

  const submitChnages = async (i) => {
    const id = allOrders[i]._id;
    const response = await axios.put(
      `http://localhost:8080/api/order/update-status/${id}`,
      values,
      { headers },
    );
    alert(response.data.message);
  };

  return (
    <>
      {!allOrders && (
        <div className="w-full flex items-center justify-center">
          <Loader />
        </div>
      )}

      {allOrders && allOrders.length > 0 && (
        <div
          className={`h-full p-0 md:px-4 ${isDark ? "text-gray-100" : "text-slate-800"}`}
        >
          <h1
            className={`text-3xl text-center md:text-start md:text-5xl font-semibold mb-8
              ${isDark ? "text-gray-100" : "text-slate-800"}`}
          >
            Orders
          </h1>

          {/* Header Row */}
          <div
            className={`mt-4 rounded py-2 px-4 flex gap-2
              ${isDark ? "bg-gray-800 text-gray-100" : "bg-slate-200 text-slate-700"}`}
          >
            <div className="w-[3%]">
              <h1 className="text-center">Sr.</h1>
            </div>
            <div className="md:w-[22%] w-[40%]">
              <h2>Books</h2>
            </div>
            <div className="w-0 md:w-[45%] hidden md:block">
              <h2>Desc</h2>
            </div>
            <div className="w-[17%] md:w-[9%]">
              <h2>Price</h2>
            </div>
            <div className="w-[30%] md:w-[16%]">
              <h2>Status</h2>
            </div>
            <div className="w-[10%] md:w-[5%] flex items-center">
              <FaUserLarge />
            </div>
          </div>


          {allOrders.map((item, i) => (
            <div
              key={i}
              className={`w-full rounded flex gap-2 py-2 px-4 hover:cursor-pointer transition-all duration-300
                ${
                  isDark
                    ? "bg-gray-800 hover:bg-gray-900"
                    : "bg-white hover:bg-slate-200"
                }`}
            >
              <div className="w-[3%]">
                <h1 className="text-center">{i + 1}</h1>
              </div>

              <div className="md:w-[22%] w-[40%]">
                <Link
                  to={`/view-book/${item.Book._id}`}
                  className="hover:text-purple-500 transition-colors duration-200"
                >
                  {item.Book.title}
                </Link>
              </div>

              <div className="w-0 md:w-[45%] hidden md:block">
                <h2 className={isDark ? "text-gray-400" : "text-slate-500"}>
                  {item.Book.desc.slice(0, 50)}...
                </h2>
              </div>

              <div className="w-[17%] md:w-[9%]">
                <h3>₹ {item.Book.price}</h3>
              </div>

              <div className="w-[30%] md:w-[16%]">
                <h1 className="font-semibold">
                  <button
                    className="hover:scale-105 transition-all"
                    onClick={() => setOptions(i)}
                  >
                    {item.status === "Order Placed" ? (
                      <div className="text-yellow-500">{item.status}</div>
                    ) : item.status === "canceled" ? (
                      <div className="text-red-500">{item.status}</div>
                    ) : (
                      <div className="text-green-500">{item.status}</div>
                    )}
                  </button>

                  <div className={`${options === i ? "flex" : "hidden"} mt-4`}>
                    <select
                      name="status"
                      className={`rounded px-1 py-0.5 border focus:outline-none
                        ${
                          isDark
                            ? "bg-gray-800 text-gray-100 border-gray-600"
                            : "bg-white text-slate-700 border-slate-300"
                        }`}
                      onChange={handleChange}
                      value={values.status}
                    >
                      {[
                        "Order Placed",
                        "Out for delivery",
                        "Delivered",
                        "canceled",
                      ].map((item, i) => (
                        <option value={item} key={i}>
                          {item}
                        </option>
                      ))}
                    </select>
                    <button
                      className="text-green-500 hover:text-pink-600 mx-2"
                      onClick={() => {
                        setOptions(-1);
                        submitChnages(i);
                      }}
                    >
                      <FaCheck />
                    </button>
                  </div>
                </h1>
              </div>

              <div className="w-[10%] md:w-[5%]">
                <button
                  className={`text-xl transition-colors duration-200 hover:text-orange-500
                    ${isDark ? "text-gray-400" : "text-slate-500"}`}
                  onClick={() => {
                    setUserDiv("fixed");
                    setUserDivData(item.user);
                  }}
                >
                  <IoOpenOutline />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {userDivData && (
        <ViewUserData
          userDivData={userDivData}
          userDiv={userDiv}
          setUserDiv={setUserDiv}
        />
      )}
    </>
  );
};

export default AllOrders;
