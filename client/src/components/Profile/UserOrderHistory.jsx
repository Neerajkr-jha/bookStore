import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Loader } from "../Loader/Loader";
import { Link } from "react-router-dom";

const UserOrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:8080/api/order/get-order-history",
        { headers },
      );
      setOrderHistory(response.data.data);
    };
    fetch();
  }, []);
  return (
    <div className="px-0 md:px-4">
      {!orderHistory && (
        <div className="flex items-center justify-center h-full">
          <Loader />
        </div>
      )}
      {orderHistory && orderHistory.length === 0 && (
        <div className="h-[80vh] p-4 text-gray-100">
          <div className="h-full flex flex-col items-center justify-center">
            <img src="/NoOrders.png" alt="orders" className="h-[40vh] mb-4" />
            <h1 className="font-mono text-3xl mb-8 text-gray-200">
              No order history
            </h1>
          </div>
        </div>
      )}
      {orderHistory && orderHistory.length > 0 && (
        <div className="h-full p-0 md:p-0 text-gray-100">
          <h1 className="text-3xl text-center md:text-start md:text-5xl font-semibold text-gray-300 mb-8">
            Your Order History
          </h1>
          <div className="mt-4 bg-gray-800 rounded py-2 px-4 flex gap-4">
            <div className="w-[3%]">
              <h1>Sr.</h1>
            </div>
            <div className="w-[22%]">
              <h2>Books</h2>
            </div>
            <div className="w-[45%]">
              <h2>Desc</h2>
            </div>
            <div className="w-[9%]">
              <h2>Price</h2>
            </div>
            <div className="w-[16%]">
              <h2>Status</h2>
            </div>
            <div className="md:w-[5%] hidden md:block w-0">
              <h2>Mode</h2>
            </div>
          </div>
          {orderHistory.map((order, i) => (
            <div className="bg-gray-800 rounded py-2 px-4 flex gap-4 hover:bg-gray-900 hover:cursor-pointer">
              <div className="w-[3%]">
                <h1>{i + 1}</h1>
              </div>
              <div className="w-[22%]">
                <Link
                  to={`/view-book-details/${order.Book._id}`}
                  className="hover:text-violet-300"
                >
                  {order.Book.title}
                </Link>
              </div>
              <div className="w-[45%]">
                <h2>{order.Book.desc.slice(0,50)}...</h2>
              </div>
              <div className="w-[9%]">
                <h2>{order.Book.price}</h2>
              </div>
              <div className="w-[16%]">
                <h2 className="text-green-500">
                  {order.status === "order place" ? (
                    <div className="bg-yellow-500">{order.status}</div>
                  ): order.status === "order place" ? (
                    <div className="bg-red-500">{order.status}</div>
                  ):(
                    order.status
                  )}
                </h2>
              </div>
              <div className="md:w-[5%] hidden md:block w-0">
                <h2 className="text-sm text-gray-400">COD</h2>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrderHistory;
