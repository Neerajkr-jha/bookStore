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

  const navigate=useNavigate();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid:id,
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
  const handleFav=async ()=>{
    const response=await axios.put("http://localhost:8080/api/favourite/add-to-fav",{},{headers});
    toast.success(response.data.message)
  }
  const handleCart=async ()=>{
    const response=await axios.put("http://localhost:8080/api/cart/add-to-cart",{},{headers});
    toast.success(response.data.message)
  }

  const handleDelete=async ()=>{
    const response=await axios.delete("http://localhost:8080/api/books/delete-book",{headers});
    toast.success(response.data.message)
    setTimeout(() => {
       navigate("/all-books")
    }, 500);
  }

  return (
    <>
      {data && (
        <div className="px-4 md:px-12 py-8 bg-zinc-900 flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-3/6">
            {" "}
            <div className="bg-zinc-800 rounded px-8 md:px-14 py-12 flex md:flex-row flex-col justify-around">
              <img
                src={data.url}
                alt="thumbnail"
                className="h-[50vh] md:h-[70vh] lg:h-[70vh] rounded"
              />
              {isLoggedIn === true && role === "user" && 
                <div className="flex lg:flex-col md:flex-col md:justify-start justify-center flex-row md:gap-0 gap-4 lg:mt-0 mt-6">
                  <button className="cursor-pointer bg-white p-4 md:p-2 text-4xl md:text-3xl rounded-full text-red-500" onClick={handleFav}>
                    <FaHeart />{" "}
                  </button>
                  <button className="cursor-pointer bg-white p-4 md:p-2 text-4xl md:text-3xl rounded-full md:mt-4 text-cyan-700" onClick={handleCart}>
                    <FaShoppingCart />
                  </button>
                </div>
              }
               {isLoggedIn === true && role === "admin" && 
                <div className="cursor-pointer flex lg:flex-col md:flex-col md:justify-start justify-center flex-row md:gap-0 gap-4 lg:mt-0 mt-6">
                  <Link to={`/update-book/${id}`} className="bg-white p-4 md:p-2 text-4xl md:text-3xl rounded-full text-red-500">
                    <FaRegEdit />{" "}
                  </Link>
                  <button className="cursor-pointer bg-white p-4 md:p-2 text-4xl md:text-3xl rounded-full md:mt-4 text-cyan-700"
                  onClick={handleDelete}>
                    <MdDelete />
                  </button>
                </div>
              }
            </div>
          </div>
          <div className="p-4 w-full md:w-3/6">
            <h1 className="text-zinc-400 text-4xl font-semibold">
              {data.title}
            </h1>
            <p className="text-zinc-400 mt-1">Author : {data.author}</p>
            <p className="text-zinc-500 font-mono mt-4 text-xl">{data.desc}</p>
            <p className="flex mt-4 items-center justify-start text-zinc-400">
              <LuLanguages className="me-3" /> {data.language}
            </p>
            <p className="mt-4 text-zinc-400 text-3xl">
              Price : Rs {data.price}
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
