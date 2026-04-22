import React, { useEffect, useState } from "react";
import { Loader } from "../components/Loader/Loader";
import axios from "axios";
import Card from "../components/BookCard/Card";
import { useDarkMode } from "../components/DarkMode/DarkModeContext";

const AllBooks = () => {
  const [data, setData] = useState();
  const { isDark } = useDarkMode();

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:8080/api/books/get-all-books",
      );
      setData(response.data.data);
    };
    fetch();
  }, []);

  return (
    <div
      className={`px-12 py-8 min-h-screen
        ${isDark ? "bg-gray-900" : "bg-amber-50"} transition-all duration-500`}
    >
      <h1
        className={`text-5xl font-serif italic text-left py-4 mb-6
          ${isDark ? "text-gray-200" : "text-slate-800"}`}
      >
        Explore Books
      </h1>

      {!data && (
        <div className="flex items-center justify-center w-full h-screen">
          <Loader />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {data &&
          data.map((item, i) => (
            <div key={i}>
              <Card data={item} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllBooks;