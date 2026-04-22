import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Loader } from "../Loader/Loader";
import { LuLanguages } from "react-icons/lu";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";

const ViewBook = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const { id } = useParams();
  const [data, setData] = useState(null);

  const navigate = useNavigate();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `http://localhost:8080/api/books/get-book-by-id/${id}`,
      );
      setData(response.data.data); // data.data because inside data(dom) the array is named as data
    };
    fetch();
  }, []);
  const handleFav = async () => {
    const response = await axios.put(
      "http://localhost:8080/api/favourite/add-to-fav",
      {},
      { headers },
    );
    toast.success(response.data.message);
  };
  const handleCart = async () => {
    const response = await axios.put(
      "http://localhost:8080/api/cart/add-to-cart",
      {},
      { headers },
    );
    toast.success(response.data.message);
  };

  const handleDelete = async () => {
    const response = await axios.delete(
      "http://localhost:8080/api/books/delete-book",
      { headers },
    );
    toast.success(response.data.message);
    setTimeout(() => {
      navigate("/all-books");
    }, 500);
  };

  return (
    <>
      {data && (
        <div
          className="px-4 md:px-12 py-8 bg-gray-900 flex flex-col lg:flex-row gap-8 min-h-screen"
        >
          <div className="w-full lg:w-3/6">
            <div
              className="bg-gray-800 backdrop-blur rounded px-6 md:px-10 py-10 flex flex-col items-center justify-center relative border border-gray-900"
            >
             
              <div className="w-full flex items-center justify-center">
                <img
                  src={data.url}
                  alt="thumbnail"
                  className="max-h-[60vh] w-auto object-contain rounded-xl shadow-lg"
                />
              </div>

              {isLoggedIn === true && role === "user" && (
                <div className="flex gap-4 mt-6">
                  <button
                    className="cursor-pointer bg-gray-700 hover:bg-purple-600 p-3 rounded-full text-red-400 hover:text-white transition-all duration-300 shadow-md"
                    onClick={handleFav}
                  >
                    <FaHeart className="text-xl" />
                  </button>

                  <button
                    className="cursor-pointer bg-gray-700 hover:bg-purple-600 p-3 rounded-full text-cyan-400 hover:text-white transition-all duration-300 shadow-md"
                    onClick={handleCart}
                  >
                    <FaShoppingCart className="text-xl" />
                  </button>
                </div>
              )}

              {/* Admin  */}
              {isLoggedIn === true && role === "admin" && (
                <div className="flex gap-4 mt-6">
                  <Link
                    to={`/update-book/${id}`}
                    className="bg-gray-700 hover:bg-purple-600 
                       p-3 rounded-full text-yellow-400 hover:text-white 
                       transition-all duration-300 shadow-md"
                  >
                    <FaRegEdit className="text-xl" />
                  </Link>

                  <button
                    className="cursor-pointer bg-gray-700 hover:bg-red-600 
                       p-3 rounded-full text-red-400 hover:text-white 
                       transition-all duration-300 shadow-md"
                    onClick={handleDelete}
                  >
                    <MdDelete className="text-xl" />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="p-0 w-full lg:w-3/6 flex flex-col justify-start">
            <h1 className="text-white text-3xl md:text-4xl font-bold leading-tight">
              {data.title}
            </h1>

            <p className="text-gray-400 mt-2 italic">Author : {data.author}</p>

            <p className="text-gray-300 mt-6 text-lg leading-relaxed">
              {data.desc}
            </p>

            <p className="flex mt-6 items-center text-gray-400">
              <LuLanguages className="me-3" /> {data.language}
            </p>

            <p className="mt-6 text-gray-50 text-2xl font-semibold">
              ₹ {data.price}
            </p>
          </div>
        </div>
      )}
      {!data && (
        <div className="h-screen bg-zinc-900 flex items-center justify-center">
          <Loader />{" "}
        </div>
      )}
      <Toaster position="top-center" />
    </>
  );
};

export default ViewBook;
