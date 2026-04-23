import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { useDarkMode } from "../DarkMode/DarkModeContext";

const Card = ({ data, favourite }) => {
  const { isDark } = useDarkMode();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id,
  };

  const handleRemoveBook = async () => {
    const response = await axios.put(
      "https://bookify-bwff.onrender.com/api/favourite/remove-from-fav",
      {},
      { headers },
    );
    alert(response.data.message);
  };

  return (
    <div
      className={`rounded-lg p-4 flex flex-col border hover:shadow-lg transition-all duration-300 w-full
        ${
          isDark
            ? "bg-gray-700 border-gray-600 hover:shadow-gray-900"
            : "bg-slate-100 border-slate-300 hover:shadow-slate-300"
        }`}
    >
      <Link
        to={`/view-book/${data._id}`}
        className="group flex flex-col flex-1"
      >
        <div className="flex flex-col flex-1">
          <div
            className={`flex items-center justify-center rounded-xl mb-4 overflow-hidden w-full h-44 md:h-48
              ${isDark ? "bg-gray-900" : "bg-slate-200"}`}
          >
            <img
              src={data.url}
              alt="Book"
              className="h-full w-full object-cover rounded-xl transition duration-300"
            />
          </div>

          <h1
            className={`text-xl font-semibold transition line-clamp-2 min-h-14
              ${isDark ? "text-white" : "text-slate-800"}`}
          >
            {data.title}
          </h1>

          <p
            className={`mt-1 line-clamp-1 ${isDark ? "text-gray-400" : "text-slate-500"}`}
          >
            {data.author}
          </p>

          <p
            className={`font-semibold mt-2 ${isDark ? "text-gray-100" : "text-slate-700"}`}
          >
            ₹ {data.price}
          </p>
        </div>
      </Link>

      {favourite && (
        <button
          className={`mt-4 px-4 py-2 rounded-lg font-medium transition-all duration-300 shadow-md border
            ${
              isDark
                ? "bg-gray-600 text-white hover:bg-gray-800 border-gray-500"
                : "bg-slate-200 text-slate-700 hover:bg-slate-700 hover:text-white border-slate-300"
            }`}
          onClick={handleRemoveBook}
        >
          Remove from Favourites
        </button>
      )}
    </div>
  );
};

export default Card;
