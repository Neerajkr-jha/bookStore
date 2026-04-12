import React from "react";
import {Link} from "react-router-dom";

const Card = ({ data }) => {
  return (
    <>
      <Link to={`/view-book/${data._id}`}>
        <div className="bg-zinc-800 rounded-xl p-4 flex flex-col ">
            <div className="bg-zinc-900 flex items-center justify-center rounded-xl mb-3 overflow-hidden">
                <img src={data.url} alt="Book" className="h-[50vh] w-full rounded-xl"/>
            </div>
            <h1 className="font-mono text-2xl">{data.title}</h1>
            <p>{data.author}</p>
            <p>Rs {data.price}</p>
            <p></p>
        </div> 
      </Link>
    </>
  );
};

export default Card;
