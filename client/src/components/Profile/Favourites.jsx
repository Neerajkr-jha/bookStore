import React, { useEffect, useState } from "react";
import { Loader } from "../Loader/Loader";
import Card from "../BookCard/Card";
import axios from "axios";

const Favourites = () => {
  const [favouriteBook, setFavouriteBook] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:8080/api/favourite/get-fav",{headers}
      );
      setFavouriteBook(response.data.data);
    };
    fetch();
  });
  return (
      <div className="grid grid-cols-3 gap-4 px-4">
        {favouriteBook &&
          favouriteBook.map((item, i) => (
            <div key={i}>
              <Card data={item} />
            </div>
          ))}
      </div>
  );
};

export default Favourites;
