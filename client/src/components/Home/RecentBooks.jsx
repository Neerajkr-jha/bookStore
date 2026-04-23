import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Card from "../BookCard/Card";
import { Loader } from "../Loader/Loader";
import { useDarkMode } from "../DarkMode/DarkModeContext";

const RecentBooks = () => {
  const [data, setData] = useState();
  const { isDark } = useDarkMode();

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "https://bookify-bwff.onrender.com/api/books/get-recent-books",
      );
      setData(response.data.data);
    };
    fetch();
  }, []);

  return (
    <div className="mt-8 md:px-2 px-0">
      <h4 className={`text-3xl ${isDark ? "text-gray-100" : "text-slate-800"}`}>
        Recently Added Books
      </h4>
      {!data && (
        <div className="flex items-center justify-center my-6 font-serif">
          <Loader />
        </div>
      )}
      <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-6">
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

export default RecentBooks;