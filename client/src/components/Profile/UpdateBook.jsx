import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateBook = () => {
  const { id } = useParams();
  const navigate=useNavigate();
  const [data, setData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
  });

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `http://localhost:8080/api/books/get-book-by-id/${id}`,
      );
      setData(response.data.data); // data.data because inside data(dom) the array is named as data
    };
    fetch();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid:id,
  };

  const handleUpdate = async () => {
    try {
      if (
        data.url === "" ||
        data.title === "" ||
        data.author === "" ||
        data.price === "" ||
        data.desc === "" ||
        data.language === ""
      ) {
        alert("All feilds are requierd");
      } else {
        const response = await axios.put(
          "http://localhost:8080/api/books/update-book",
          data,
          { headers },
        );
        alert(response.data.message);
        setTimeout(() => {
            navigate(`/view-book/${id}`)
        }, 500);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <div className=" bg-zinc-900 h-full p-0 md:p-4">
      <h1 className="text-3xl md:text-5xl text-zinc-300 mb-8 font-semibold">
        Update Book
      </h1>
      <div className="bg-zinc-800 rounded p-4">
        <div>
          <label htmlFor="" className="text-zinc-400">
            Image
          </label>
          <input
            type="text"
            name="url"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="URL of image"
            required
            value={data.url}
            onChange={handleChange}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="" className="text-zinc-400">
            Title
          </label>
          <input
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            type="text"
            name="title"
            placeholder="Title of book"
            required
            value={data.title}
            onChange={handleChange}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="" className="text-zinc-400">
            Author
          </label>
          <input
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            type="text"
            name="author"
            placeholder="Author of book"
            required
            value={data.author}
            onChange={handleChange}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="" className="text-zinc-400">
            Language
          </label>
          <input
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            type="text"
            name="language"
            placeholder="Language of book"
            required
            value={data.language}
            onChange={handleChange}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="" className="text-zinc-400">
            Price
          </label>
          <input
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            type="text"
            name="price"
            placeholder="Price of book"
            required
            value={data.price}
            onChange={handleChange}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="" className="text-zinc-400">
            Description
          </label>
          <textarea
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            type="text"
            name="desc"
            rows="5"
            placeholder="Description of book"
            required
            value={data.desc}
            onChange={handleChange}
          />
        </div>

        <button
          className=" mt-4 px-3 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all"
          onClick={handleUpdate}
        >
           Update Book
        </button>
      </div>
    </div>
  );
};

export default UpdateBook;
