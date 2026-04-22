import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { Loader } from "../components/Loader/Loader.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../components/DarkMode/DarkModeContext";

const Cart = () => {
  const { isDark } = useDarkMode();
  const [cart, setCart] = useState();
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:8080/api/cart/get-cart",
        { headers },
      );
      setCart(response.data.data);
    };
    fetch();
  }, [cart]);

  const handleDelete = async (bookid) => {
    const response = await axios.put(
      `http://localhost:8080/api/cart/remove-from-cart/${bookid}`,
      {},
      { headers },
    );
    alert(response.data.message);
  };

  const placeOrder = async () => {
    try {
      if (!cart || cart.length === 0) return;
      const response = await axios.post(
        "http://localhost:8080/api/order/place-order",
        { order: cart },
        { headers },
      );
      alert(response.data.message);
      navigate("/profile/orderHistory");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (cart && cart.length > 0) {
      let total = 0;
      cart.map((items) => {
        total += items.price;
      });
      setTotal(total);
    }
  }, [cart]);

  return (
    <div
      className={`min-h-screen px-4 md:px-12 py-8 ${isDark ? "bg-gray-900" : "bg-slate-50"}`}
    >
      {!cart && (
        <div className="w-full h-full flex items-center justify-center">
          <Loader />
        </div>
      )}

      {cart && cart.length === 0 && (
        <div className="h-screen flex items-center justify-center flex-col gap-6">
          <img
            src="./EmptyCart.png"
            alt="emptyCart"
            className="h-[40vh] md:h-[50vh] object-contain"
          />
          <h1
            className={`text-4xl md:text-6xl font-semibold ${isDark ? "text-gray-200" : "text-slate-700"}`}
          >
            Empty Cart
          </h1>
        </div>
      )}

      {cart && cart.length > 0 && (
        <>
          <h1
            className={`text-3xl md:text-4xl font-semibold mb-6 ${isDark ? "text-white" : "text-slate-800"}`}
          >
            Your Cart
          </h1>

          {cart.map((item, i) => (
            <div
              key={i}
              className={`w-full mb-6 rounded border flex flex-col md:flex-row items-center justify-between p-4 gap-4 transition
                ${
                  isDark
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-slate-200 shadow-sm"
                }`}
            >
              <img
                src={item.url}
                alt="/"
                className="w-full md:w-40 h-[25vh] md:h-48 object-contain rounded-lg"
              />
              <div className="flex-1 w-full">
                <h1
                  className={`text-xl md:text-2xl font-semibold ${isDark ? "text-white" : "text-slate-800"}`}
                >
                  {item.title}
                </h1>
                <p
                  className={`mt-2 hidden lg:block ${isDark ? "text-gray-400" : "text-slate-500"}`}
                >
                  {item.desc.slice(0, 100)}...
                </p>
                <p
                  className={`mt-2 hidden md:block lg:hidden ${isDark ? "text-gray-400" : "text-slate-500"}`}
                >
                  {item.desc.slice(0, 70)}...
                </p>
                <p
                  className={`mt-2 md:hidden ${isDark ? "text-gray-400" : "text-slate-500"}`}
                >
                  {item.desc.slice(0, 50)}...
                </p>
              </div>
              <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-center">
                <h2
                  className={`text-2xl md:text-3xl font-semibold ${isDark ? "text-gray-100" : "text-slate-700"}`}
                >
                  ₹ {item.price}
                </h2>
                <button
                  className={`p-2 rounded-full transition shadow-md hover:bg-red-600 hover:text-white
                  ${isDark ? "bg-gray-700 text-red-400" : "bg-slate-100 text-red-500"}`}
                >
                  <MdDelete size={22} onClick={() => handleDelete(item._id)} />
                </button>
              </div>
            </div>
          ))}
        </>
      )}

      {cart && cart.length > 0 && (
        <div className="mt-8 w-full flex justify-end">
          <div
            className={`w-full md:w-87.5 backdrop-blur border rounded p-6 shadow-lg
            ${
              isDark
                ? "bg-gray-800/80 border-gray-700"
                : "bg-white border-slate-200"
            }`}
          >
            <h1
              className={`text-2xl font-semibold ${isDark ? "text-white" : "text-slate-800"}`}
            >
              Total Amount
            </h1>
            <div
              className={`mt-4 flex items-center justify-between ${isDark ? "text-gray-300" : "text-slate-600"}`}
            >
              <h2>{cart.length} Books</h2>
              <h2 className="text-purple-500 font-semibold">₹ {total}</h2>
            </div>
            <button
              onClick={placeOrder}
              className="mt-6 w-full py-2 rounded-lg font-semibold text-white bg-violet-500 hover:bg-violet-600 transition-all duration-300"
            >
              Place your order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
