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
        "https://bookify-bwff.onrender.com/api/favourite/get-fav",
        { headers },
      );
      setFavouriteBook(response.data.data);
    };
    fetch();
  }, [favouriteBook]);
  return (
    <>
      {favouriteBook && favouriteBook.length === 0 && (
        <div className="flex items-center justify-center text-xl md:text-3xl font-semibold h-full flex-col gap-7">
          <img src="./NotFound.png" alt="empty" className="h-[40vh] rounded-lg" />
          No Favourite book Found
        </div>
      )}
      <div className="grid giid-col-1 md:grid-cols-3 gap-4 md:px-4 px-1 md:mt-0 mt-6">
        {favouriteBook &&
          favouriteBook.map((item, i) => (
            <div key={i}>
              <Card data={item} favourite={true} />
            </div>
          ))}
      </div>
    </>
  );
};

export default Favourites;
