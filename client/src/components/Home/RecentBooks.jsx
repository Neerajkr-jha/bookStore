import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Card from "../BookCard/Card";
import { Loader } from "../Loader/Loader";

const RecentBooks = () => {
  const [data, setData] = useState();
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:8080/api/books/get-recent-books",
      );
      setData(response.data.data);
    };
    fetch();
  }, []);

  return (
    <div className="mt-8 px-2">
      <h4 className="text-3xl text-gray-100 ">Recently Added Books</h4>
      {!data && (
        <div className="flex items-center justify-center my-6 font-serif">
          <Loader />
        </div>
      )}
      <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {data &&
          data.map((item, i) => (
            <div key={i}>
              <Card data={item} />{" "}
            </div>
          ))}
      </div>
    </div>
  );
};

export default RecentBooks;
