import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

const Card = ({ data, favourite }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id,
  };

  const handleRemoveBook = async () => {
    const response = await axios.put(
      "http://localhost:8080/api/favourite/remove-from-fav",
      {},
      { headers },
    );
    alert(response.data.message);
  };

  return (
    <div
      className="bg-gray-800 rounded-lg p-4 flex flex-col border border-gray-700 hover:shadow-lg transition-all duration-300"
    >
      <Link to={`/view-book/${data._id}`} className="group">
        <div>
          <div
            className="bg-gray-900 flex items-center justify-center rounded-xl mb-4 overflow-hidden"
          >
            <img
              src={data.url}
              alt="Book"
              className="h-[45vh] w-full object-fill rounded-xl transition duration-300"/>
          </div>

          <h1 className="text-xl font-semibold text-white transition">
            {data.title}
          </h1>

          <p className="text-gray-400 mt-1">{data.author}</p>

          <p className="text-gray-100 font-semibold mt-2">₹ {data.price}</p>
        </div>
      </Link>

      {favourite && (
        <button
          className="mt-4 px-4 py-2 rounded-lg bg-gray-600 text-white font-medium hover:bg-gray-700 transition-all duration-300 shadow-md "
          onClick={handleRemoveBook}
        >
          Remove from Favourites
        </button>
      )}
    </div>
  );
};

export default Card;
