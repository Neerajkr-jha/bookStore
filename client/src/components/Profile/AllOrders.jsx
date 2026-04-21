import React, { useEffect, useState } from "react";
import axios, { all } from "axios";
import { Loader } from "../Loader/Loader";
import { FaCheck, FaUserLarge } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { IoOpenOutline } from "react-icons/io5";
import ViewUserData from "./ViewUserData";

const AllOrders = () => {
  const [allOrders, setAllOrders] = useState();
  const [options, setOptions] = useState();
  const [values, setValues] = useState({ status: "Order Placed" });
  const [userDiv, setUserDiv] = useState('hidden')
  const [userDivData, setUserDivData] = useState()
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:8080/api/order/get-all-orders",
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
  // allOrders && allOrders.splice(allOrders.length - 1, 1);
  return (
    <>
      {!allOrders && (
        <div className="w-full flex items-center justify-center">
          <Loader />
        </div>
      )}
      {allOrders && allOrders.length > 0 && (
        <div className="h-full p-0 md:p-0 md:px-4 text-zinc-100">
          <h1 className="text-3xl text-center md:text-start md:text-5xl font-semibold text-zinc-100 mb-8">
            Orders
          </h1>
          <div className="mt-4 bg-zinc-800 rounded py-2 px-4 flex gap-2">
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
              <h1>
                <FaUserLarge />
              </h1>
            </div>
          </div>
          {allOrders &&
            allOrders.map((item, i) => (
              <div className="bg-zinc-800 w-full rounded flex gap-2 py-2 px-4 hover:bg-zinc-900 hover:cursor-pointer transition-all">
                <div className="w-[3%]">
                  <h1 className="text-center">{i + 1}</h1>
                </div>
                <div className="md:w-[22%] w-[40%]">
                  <Link
                    to={`/view-book/${item.Book._id}`}
                    className="hover:text-blue-400"
                  >
                    {item.Book.title}
                  </Link>
                </div>
                <div className="w-0 md:w-[45%] hidden md:block">
                  <h2>{item.Book.desc.slice(0, 50)}...</h2>
                </div>
                <div className="w-[17%] md:w-[9%]">
                  <h3>{item.Book.price}</h3>
                </div>
                <div className="w-[30%] md:w-[16%]">
                  <h1 className="font-semibold">
                    <button
                      className="hover:scale-105 transition-all divide-red-300"
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
                    <div className={`${options === i ? "flex" : "hidden"} flex mt-4`}>
                      <select
                        name="status"
                        className="bg-gray-800"
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
                    className="text-xl hover:text-orange-500"
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
        <ViewUserData userDivData={userDivData} userDiv={userDiv} setUserDiv={setUserDiv}/>
      )}
    </>
  );
};

export default AllOrders;
