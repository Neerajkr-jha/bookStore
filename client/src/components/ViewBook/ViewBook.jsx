import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Loader } from "../Loader/Loader";
import { LuLanguages } from "react-icons/lu";
import { FaHeart, FaShoppingCart, FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { useDarkMode } from "../DarkMode/DarkModeContext";

const ViewBook = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDark } = useDarkMode();

  const [data, setData] = useState(null);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `http://localhost:8080/api/books/get-book-by-id/${id}`
      );
      setData(response.data.data);
    };
    fetch();
  }, [id]);

  const handleFav = async () => {
    const response = await axios.put(
      "http://localhost:8080/api/favourite/add-to-fav",
      {},
      { headers }
    );
    toast.success(response.data.message);
  };

  const handleCart = async () => {
    const response = await axios.put(
      "http://localhost:8080/api/cart/add-to-cart",
      {},
      { headers }
    );
    toast.success(response.data.message);
  };

  const handleDelete = async () => {
    const response = await axios.delete(
      "http://localhost:8080/api/books/delete-book",
      { headers }
    );
    toast.success(response.data.message);
    setTimeout(() => navigate("/all-books"), 500);
  };

  
  const pageBg = isDark ? "bg-gray-900" : "bg-amber-50";
  const card = isDark
    ? "bg-gray-800 border-gray-700"
    : "bg-amber-100 border-amber-200 shadow-sm";

  const textPrimary = isDark ? "text-white" : "text-gray-800";
  const textSecondary = isDark ? "text-gray-400" : "text-gray-600";

  const iconBtn = isDark
    ? "bg-gray-700 hover:bg-purple-600 text-white"
    : "bg-amber-200 hover:bg-amber-300 text-gray-800";

  return (
    <>
      {data && (
        <div className={`px-4 md:px-12 py-8 flex flex-col lg:flex-row gap-8 min-h-screen ${pageBg}`}>
          
        
          <div className="w-full lg:w-3/6">
            <div className={`rounded px-6 md:px-10 py-10 flex flex-col items-center border ${card}`}>
              
              <img
                src={data.url}
                alt="thumbnail"
                className="max-h-[60vh] w-auto object-contain rounded-xl shadow-md"
              />

          
              {isLoggedIn && role === "user" && (
                <div className="flex gap-4 mt-6">
                  <button
                    className={`p-3 rounded-full transition-all duration-300 ${iconBtn}`}
                    onClick={handleFav}
                  >
                    <FaHeart />
                  </button>

                  <button
                    className={`p-3 rounded-full transition-all duration-300 ${iconBtn}`}
                    onClick={handleCart}
                  >
                    <FaShoppingCart />
                  </button>
                </div>
              )}

             
              {isLoggedIn && role === "admin" && (
                <div className="flex gap-4 mt-6">
                  <Link
                    to={`/update-book/${id}`}
                    className={`p-3 rounded-full transition-all duration-300 ${iconBtn}`}
                  >
                    <FaRegEdit />
                  </Link>

                  <button
                    className="p-3 rounded-full bg-red-400 hover:bg-red-500 text-white transition"
                    onClick={handleDelete}
                  >
                    <MdDelete />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="w-full lg:w-3/6 flex flex-col">
            <h1 className={`text-3xl md:text-4xl font-bold ${textPrimary}`}>
              {data.title}
            </h1>

            <p className={`mt-2 italic ${textSecondary}`}>
              Author: {data.author}
            </p>

            <p className={`mt-6 text-lg leading-relaxed ${textSecondary}`}>
              {data.desc}
            </p>

            <p className={`flex mt-6 items-center ${textSecondary}`}>
              <LuLanguages className="me-3" /> {data.language}
            </p>

            <p className={`mt-6 text-2xl font-semibold ${textPrimary}`}>
              ₹ {data.price}
            </p>
          </div>
        </div>
      )}

      {!data && (
        <div className={`h-screen flex items-center justify-center ${isDark ? "bg-gray-900" : "bg-amber-50"}`}>
          <Loader />
        </div>
      )}

      <Toaster position="top-center" />
    </>
  );
};

export default ViewBook;