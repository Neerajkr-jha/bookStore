import axios from "axios";
import React, { useEffect, useState } from "react";
import { Loader } from "../Loader/Loader";
import { Link } from "react-router-dom";
import { useDarkMode } from "../DarkMode/DarkModeContext";

const UserOrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState();
  const { isDark } = useDarkMode();

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

  // 🎨 Dynamic styles
  const pageText = isDark ? "text-gray-100" : "text-gray-800";
  const subText = isDark ? "text-gray-300" : "text-gray-600";

  const card = isDark
    ? "bg-gray-800"
    : "bg-amber-100 border border-amber-200 shadow-sm";

  const rowHover = isDark ? "hover:bg-gray-900" : "hover:bg-amber-200";

  return (
    <div className={`px-0 md:px-4 ${pageText}`}>

      {!orderHistory && (
        <div className="flex items-center justify-center h-full">
          <Loader />
        </div>
      )}

  
      {orderHistory && orderHistory.length === 0 && (
        <div className="h-[80vh] p-4">
          <div className="h-full flex flex-col items-center justify-center">
            <img src="/NoOrders.png" alt="orders" className="h-[40vh] mb-4" />
            <h1 className={`font-mono text-3xl mb-8 ${subText}`}>
              No order history
            </h1>
          </div>
        </div>
      )}

     
      {orderHistory && orderHistory.length > 0 && (
        <div className="h-full">
          <h1 className={`text-3xl md:text-5xl font-semibold mb-8 ${subText}`}>
            Your Order History
          </h1>

        
          <div className={`mt-4 rounded py-2 px-4 flex gap-4 ${card}`}>
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
            <div
              key={i}
              className={`mt-2 rounded py-2 px-4 flex gap-4 transition-all duration-300 ${card} ${rowHover}`}
            >
              <div className="w-[3%]">{i + 1}</div>

              <div className="w-[22%]">
                <Link
                  to={`/view-book-details/${order.Book._id}`}
                  className="hover:text-violet-500"
                >
                  {order.Book.title}
                </Link>
              </div>

              <div className="w-[45%]">{order.Book.desc.slice(0, 50)}...</div>

              <div className="w-[9%]">{order.Book.price}</div>

             
              <div className="w-[16%]">
                {" "}
                <h2 className="text-green-500">
                  {" "}
                  {order.status === "Order Placed" ? (
                    <div className="text-blue-500">{order.status}</div>
                  ) : order.status === "canceled" ? (
                    <div className="text-red-500">{order.status}</div>
                  ) : (
                    order.status
                  )}{" "}
                </h2>{" "}
              </div>

              <div className={`md:w-[5%] hidden md:block text-sm ${subText}`}>
                COD
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrderHistory;
