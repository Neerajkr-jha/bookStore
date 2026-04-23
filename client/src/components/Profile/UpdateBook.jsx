import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDarkMode } from "../DarkMode/DarkModeContext";

const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDark } = useDarkMode();

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
        `https://bookify-bwff.onrender.com/api/books/get-book-by-id/${id}`
      );
      setData(response.data.data);
    };
    fetch();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };

  const handleUpdate = async () => {
    try {
      if (
        !data.url ||
        !data.title ||
        !data.author ||
        !data.price ||
        !data.desc ||
        !data.language
      ) {
        alert("All fields are required");
      } else {
        const response = await axios.put(
          "http://localhost:8080/api/books/update-book",
          data,
          { headers }
        );
        alert(response.data.message);
        setTimeout(() => navigate(`/view-book/${id}`), 500);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Error updating book");
    }
  };

  // 🎨 Theme classes
  const pageBg = isDark ? "bg-gray-900" : "bg-amber-50";
  const pageText = isDark ? "text-white" : "text-gray-800";

  const card = isDark
    ? "bg-gray-800 border-gray-700"
    : "bg-amber-100 border-amber-200 shadow-sm";

  const input = isDark
    ? "bg-gray-900 text-white border-gray-700"
    : "bg-amber-50 text-gray-800 border-amber-200";

  const label = isDark ? "text-gray-400" : "text-gray-600";

  const button = isDark
    ? "bg-violet-500 hover:bg-violet-600 text-white"
    : "bg-amber-200 hover:bg-amber-300 text-gray-800";

  return (
    <div className={`min-h-screen px-4 md:px-12 py-8 ${pageBg}`}>
      <h1 className={`text-3xl md:text-5xl mb-8 font-semibold ${pageText}`}>
        Update Book
      </h1>

      <div
        className={`backdrop-blur border rounded p-6 md:p-8 max-w-full transition-all ${card}`}
      >
     
        <div>
          <label className={`text-sm ${label}`}>Image</label>
          <input
            type="text"
            name="url"
            className={`w-full mt-2 px-3 py-2 rounded-lg border outline-none ${input}`}
            placeholder="URL of image"
            value={data.url}
            onChange={handleChange}
          />
        </div>

     
        <div className="mt-4">
          <label className={`text-sm ${label}`}>Title</label>
          <input
            type="text"
            name="title"
            className={`w-full mt-2 px-3 py-2 rounded-lg border outline-none ${input}`}
            placeholder="Title of book"
            value={data.title}
            onChange={handleChange}
          />
        </div>

   
        <div className="mt-4">
          <label className={`text-sm ${label}`}>Author</label>
          <input
            type="text"
            name="author"
            className={`w-full mt-2 px-3 py-2 rounded-lg border outline-none ${input}`}
            placeholder="Author"
            value={data.author}
            onChange={handleChange}
          />
        </div>

       
        <div className="mt-4">
          <label className={`text-sm ${label}`}>Language</label>
          <input
            type="text"
            name="language"
            className={`w-full mt-2 px-3 py-2 rounded-lg border outline-none ${input}`}
            placeholder="Language"
            value={data.language}
            onChange={handleChange}
          />
        </div>

        
        <div className="mt-4">
          <label className={`text-sm ${label}`}>Price</label>
          <input
            type="text"
            name="price"
            className={`w-full mt-2 px-3 py-2 rounded-lg border outline-none ${input}`}
            placeholder="Price"
            value={data.price}
            onChange={handleChange}
          />
        </div>

        
        <div className="mt-4">
          <label className={`text-sm ${label}`}>Description</label>
          <textarea
            name="desc"
            rows="5"
            className={`w-full mt-2 px-3 py-2 rounded-lg border outline-none ${input}`}
            placeholder="Description"
            value={data.desc}
            onChange={handleChange}
          />
        </div>

        
        <button
          className={`mt-6 px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${button}`}
          onClick={handleUpdate}
        >
          Update Book
        </button>
      </div>
    </div>
  );
};

export default UpdateBook;