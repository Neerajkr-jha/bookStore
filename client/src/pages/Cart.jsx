import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { Loader } from "../components/Loader/Loader.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
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
        { headers }
      );
      setCart(response.data.data);
    };
    fetch();
  }, [cart]);

  const handleDelete = async (bookid) => {
    const response = await axios.put(
      `http://localhost:8080/api/cart/remove-from-cart/${bookid}`,
      {},
      { headers }
    );
    alert(response.data.message);
  };

  const placeOrder = async () => {
    try {
      if (!cart || cart.length === 0) return;
      const response = await axios.post(
        "http://localhost:8080/api/order/place-order",
        { order: cart },
        { headers }
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
      total = 0;
    }
  }, [cart]);

  return (
    <div className="min-h-screen bg-gray-900  px-4 md:px-12 py-8">
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
          <h1 className="text-4xl md:text-6xl font-semibold text-gray-200">
            Empty Cart
          </h1>
        </div>
      )}

      {cart && cart.length > 0 && (
        <>
          <h1 className="text-3xl md:text-4xl font-semibold text-white mb-6">
            Your Cart
          </h1>

          {cart.map((item, i) => (
            <div
              key={i}
              className="w-full mb-6 rounded bg-gray-800 border border-gray-700 flex flex-col md:flex-row items-center justify-between p-4 gap-4 transition"
            >
              <img
                src={item.url}
                alt="/"
                className="w-full md:w-40 h-[25vh] md:h-48 object-contain rounded-lg"
              />

              <div className="flex-1 w-full">
                <h1 className="text-xl md:text-2xl text-white font-semibold">
                  {item.title}
                </h1>

                <p className="text-gray-400 mt-2 hidden lg:block">
                  {item.desc.slice(0, 100)}...
                </p>

                <p className="text-gray-400 mt-2 hidden md:block lg:hidden">
                  {item.desc.slice(0, 70)}...
                </p>

                <p className="text-gray-400 mt-2 md:hidden">
                  {item.desc.slice(0, 50)}...
                </p>
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-center">
                <h2 className="text-gray-100 text-2xl md:text-3xl font-semibold">
                  ₹ {item.price}
                </h2>

                <button
                  className="p-2 rounded-full bg-gray-700 hover:bg-red-600 text-red-400 hover:text-white    transition shadow-md"
                >
                  <MdDelete
                    size={22}
                    onClick={() => handleDelete(item._id)}
                  />
                </button>
              </div>
            </div>
          ))}
        </>
      )}

      {cart && cart.length > 0 && (
        <div className="mt-8 w-full flex justify-end">
          <div className="w-full md:w-87.5 bg-gray-800/80 backdrop-blur border border-gray-700 rounded p-6 shadow-lg">

            <h1 className="text-2xl font-semibold text-white">
              Total Amount
            </h1>

            <div className="mt-4 flex items-center justify-between text-gray-300">
              <h2>{cart.length} Books</h2>
              <h2 className="text-purple-400 font-semibold">₹ {total}</h2>
            </div>

            <button
              onClick={placeOrder}
              className="mt-6 w-full py-2 rounded-lg font-semibold text-white bg-violet-500 hover:bg-violet-600 transition-all duration-300 "
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