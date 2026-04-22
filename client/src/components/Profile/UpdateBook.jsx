import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
    bookid: id,
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
          navigate(`/view-book/${id}`);
        }, 500);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <div className="min-h-screen b-gray-900 px-4 md:px-12 py-8">
      <h1 className="text-3xl md:text-5xl text-white mb-8 font-semibold">
        Update Book
      </h1>

      <div
        className="bg-gray-800/80 backdrop-blur border border-gray-700 rounded p-6 md:p-8 shadow-lg max-w-full"
      >
        <div>
          <label className="text-gray-400 text-sm">Image</label>
          <input
            type="text"
            name="url"
            className="w-full mt-2 px-3 py-2 rounded-lg bg-gray-900 text-gray-100 border border-gray-700 focus:outline-none"
            placeholder="URL of image"
            required
            value={data.url}
            onChange={handleChange}
          />
        </div>

        <div className="mt-4">
          <label className="text-gray-400 text-sm">Title</label>
          <input
            className="outline-none w-full mt-2 px-3 py-2 rounded-lg bg-gray-900 text-gray-100 border border-gray-700"
            type="text"
            name="title"
            placeholder="Title of book"
            required
            value={data.title}
            onChange={handleChange}
          />
        </div>

        <div className="mt-4">
          <label className="text-gray-400 text-sm">Author</label>
          <input
            className="w-full mt-2 px-3 py-2 rounded-lg bg-gray-900 text-gray-100 border border-gray-700 outline-none"
            type="text"
            name="author"
            placeholder="Author of book"
            required
            value={data.author}
            onChange={handleChange}
          />
        </div>

        <div className="mt-4">
          <label className="text-gray-400 text-sm">Language</label>
          <input
            className="w-full mt-2 px-3 py-2 rounded-lg bg-gray-900 text-gray-100 border border-gray-700 outline-none"
            type="text"
            name="language"
            placeholder="Language of book"
            required
            value={data.language}
            onChange={handleChange}
          />
        </div>

        <div className="mt-4">
          <label className="text-gray-400 text-sm">Price</label>
          <input
            className="w-full mt-2 px-3 py-2 rounded-lg bg-gray-900 text-gray-100 border border-gray-700 outline-none"
            type="text"
            name="price"
            placeholder="Price of book"
            required
            value={data.price}
            onChange={handleChange}
          />
        </div>

        <div className="mt-4">
          <label className="text-gray-400 text-sm">Description</label>
          <textarea
            className="w-full mt-2 px-3 py-2 rounded-lg bg-gray-900 text-gray-100 border border-gray-700 outline-none"
            name="desc"
            rows="5"
            placeholder="Description of book"
            required
            value={data.desc}
            onChange={handleChange}
          />
        </div>

        <button
          className="mt-6 w-full md:w-auto px-6 py-2 rounded-lg bg-violet-500 hover:bg-violet-600 text-white font-semibold transition-all duration-300"
          onClick={handleUpdate}
        >
          Update Book
        </button>
      </div>
    </div>
  );
};

export default UpdateBook;
