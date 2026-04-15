import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
// import toast, { Toaster } from "react-hot-toast"; 

const Card = ({ data, favourite }) => {
   const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid:data._id
  };
  const handleRemoveBook = async () => {
    const response = await axios.put(
      "http://localhost:8080/api/favourite/remove-from-fav",{},{ headers },
    );
    alert(response.data.message)
  };
  return (
    <div className="bg-zinc-800 rounded-xl p-4 flex flex-col ">
      <Link to={`/view-book/${data._id}`}>
        <div>
          <div className="bg-zinc-900 flex items-center justify-center rounded-xl mb-3 overflow-hidden">
            <img
              src={data.url}
              alt="Book"
              className="h-[50vh] w-full rounded-xl"
            />
          </div>
          <h1 className="font-mono text-2xl">{data.title}</h1>
          <p>{data.author}</p>
          <p>Rs {data.price}</p>
          <p></p>
        </div>
      </Link>
      {favourite && (
        <button
          className="bg-yellow-50 px-4 py-2 mt-4 rounded border border-yellow-500 text-amber-700 font-semibold cursor-pointer"
          onClick={handleRemoveBook}
        >
          Remove from Favourites
        </button>
      )}
      {/* <Toaster position="top-center" /> */}
    </div>
  );
};

export default Card;
