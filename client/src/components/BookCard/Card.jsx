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

  const renderStars = (rating = 4) => {
    return Array.from({ length: 5 }, (_, i) =>
      i < Math.round(rating) ? "★" : "☆"
    ).join("");
  };

  return (
    <div
      className={`rounded overflow-hidden flex flex-col border transition-all duration-300 w-full
        hover:-translate-y-1 hover:shadow-xl
        ${
          isDark
            ? "bg-[#1e2024] border-[#2d3138] hover:shadow-black/40"
            : "bg-white border-[#e8e4de] hover:shadow-slate-200"
        }`}
    >
      <Link to={`/view-book/${data._id}`} className="flex flex-col flex-1">
        
        <div className="w-full overflow-hidden" style={{ height: "300px" }}>
          <img
            src={data.url}
            alt={data.title}
            className="w-full h-full object-center transition-transform duration-500"
          />
        </div>

       
        <div className="px-4 pt-3 pb-4 flex flex-col gap-1 flex-1 items-center">
          <h1
            className={`font-serif text-center font-medium leading-snug line-clamp-2 min-h-[2.8rem]
              ${isDark ? "text-[#f0ede8]" : "text-[#1a1814]"}`}
            style={{ fontFamily: "'Georgia', serif" }}
          >
            {data.title}
          </h1>

          <p
            className={`text-sm truncate ${isDark ? "text-gray-500" : "text-gray-900"}`}
          >
            {data.author}
          </p>

          <p
            className={`text-base font-semibold mt-1
              ${isDark ? "text-red-400" : "text-red-600"}`}
          >
            ₹ {data.price}
          </p>
        </div>
      </Link>

      {favourite && (
        <div className="px-4 pb-4">
          <button
            className={`w-full px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 border
              ${
                isDark
                  ? "bg-[#2d3138] text-white hover:bg-gray-700 border-gray-600"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-700 hover:text-white border-slate-200"
              }`}
            onClick={handleRemoveBook}
          >
            Remove from Favourites
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;