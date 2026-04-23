import React, { useState } from "react";
import axios from "axios";
import { useDarkMode } from "../DarkMode/DarkModeContext";

const AddBook = () => {
  const { isDark } = useDarkMode();
  const [data, setData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const handleSubmit = async () => {
    try {
      if (
        data.url === "" ||
        data.title === "" ||
        data.author === "" ||
        data.price === "" ||
        data.desc === "" ||
        data.language === ""
      ) {
        alert("All fields are required");
      } else {
        const response = await axios.post(
          "https://bookify-bwff.onrender.com/api/books/add-book",
          data,
          { headers },
        );
        setData({ url: "", title: "", author: "", price: "", desc: "", language: "" });
        alert(response.data.message);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const inputClass = `w-full mt-2 px-3 py-2 rounded-lg border focus:outline-none transition-colors duration-200
    ${isDark
      ? "bg-gray-900 text-gray-100 border-gray-700 placeholder-gray-500"
      : "bg-slate-50 text-slate-800 border-slate-300 placeholder-slate-400"
    }`;

  const labelClass = `${isDark ? "text-gray-400" : "text-slate-600"}`;

  return (
    <div className="h-full p-0 md:p-4">
      <h1
        className={`text-3xl md:text-5xl mb-8 font-semibold
          ${isDark ? "text-gray-300" : "text-slate-800"}`}
      >
        Add Book
      </h1>

      <div
        className={`rounded p-4
          ${isDark ? "bg-gray-800" : "bg-white border border-slate-200 shadow-sm"}`}
      >
        <div>
          <label className={labelClass}>Image</label>
          <input
            type="text"
            name="url"
            className={inputClass}
            placeholder="URL of image"
            required
            value={data.url}
            onChange={handleChange}
          />
        </div>

        <div className="mt-4">
          <label className={labelClass}>Title</label>
          <input
            type="text"
            name="title"
            className={inputClass}
            placeholder="Title of book"
            required
            value={data.title}
            onChange={handleChange}
          />
        </div>

        <div className="mt-4">
          <label className={labelClass}>Author</label>
          <input
            type="text"
            name="author"
            className={inputClass}
            placeholder="Author of book"
            required
            value={data.author}
            onChange={handleChange}
          />
        </div>

        <div className="mt-4">
          <label className={labelClass}>Language</label>
          <input
            type="text"
            name="language"
            className={inputClass}
            placeholder="Language of book"
            required
            value={data.language}
            onChange={handleChange}
          />
        </div>

        <div className="mt-4">
          <label className={labelClass}>Price</label>
          <input
            type="text"
            name="price"
            className={inputClass}
            placeholder="Price of book"
            required
            value={data.price}
            onChange={handleChange}
          />
        </div>

        <div className="mt-4">
          <label className={labelClass}>Description</label>
          <textarea
            name="desc"
            rows="5"
            className={inputClass}
            placeholder="Description of book"
            required
            value={data.desc}
            onChange={handleChange}
          />
        </div>

        <button
          className={`mt-6 w-full md:w-auto px-6 py-2 rounded ${isDark ? "bg-violet-500 hover:bg-violet-600" :"bg-amber-300 hover:bg-amber-400"} text-white font-semibold transition-all duration-300`}
          onClick={handleSubmit}
        >
          Add Book
        </button>
      </div>
    </div>
  );
};

export default AddBook;