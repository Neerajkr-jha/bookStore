import React, { useEffect, useState } from "react";
import { Loader } from "../components/Loader/Loader";
import axios from "axios";
import Card from "../components/BookCard/Card";

const AllBooks = () => {
  const [data, setData] = useState();
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
    <div className="bg-gray-900 px-12 py-8 h-auto">
      <h1 className="text-5xl text-gray-400 font-serif italic text-center py-4 mb-4">Explore Books</h1>
      {!data && (
        <div>
          <Loader />
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 text-white gap-4">
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

export default AllBooks;
