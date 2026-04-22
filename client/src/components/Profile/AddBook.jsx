import React, { useState } from "react";
import axios from "axios";

const AddBook = () => {
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
        alert("All feilds are requierd");
      } else {
        const response = await axios.post(
          "http://localhost:8080/api/books/add-book",
          data,
          { headers },
        );
        setData({
          url: "",
          title: "",
          author: "",
          price: "",
          desc: "",
          language: "",
        });
        alert(response.data.message);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <div className="h-full p-0 md:p-4">
      <h1 className="text-3xl md:text-5xl text-gray-300 mb-8 font-semibold">
        Add Book
      </h1>
      <div className="bg-gray-800 rounded p-4">
        <div>
          <label htmlFor="" className="text-gray-400">
            Image
          </label>
          <input
            type="text"
            name="url"
            className="w-full mt-2 bg-gray-900 text-gray-100 p-2 outline-none"
            placeholder="URL of image"
            required
            value={data.url}
            onChange={handleChange}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="" className="text-gray-400">
            Title
          </label>
          <input
            className="w-full mt-2 px-3 py-2 rounded-lg bg-gray-900 text-gray-100 border border-gray-700 focus:outline-none"
            type="text"
            name="title"
            placeholder="Title of book"
            required
            value={data.title}
            onChange={handleChange}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="" className="text-gray-400">
            Author
          </label>
          <input
            className="w-full mt-2 px-3 py-2 rounded-lg bg-gray-900 text-gray-100 border border-gray-700 focus:outline-none"
            type="text"
            name="author"
            placeholder="Author of book"
            required
            value={data.author}
            onChange={handleChange}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="" className="text-gray-400">
            Language
          </label>
          <input
            className="w-full mt-2 px-3 py-2 rounded-lg bg-gray-900 text-gray-100 border border-gray-700 focus:outline-none"
            type="text"
            name="language"
            placeholder="Language of book"
            required
            value={data.language}
            onChange={handleChange}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="" className="text-gray-400">
            Price
          </label>
          <input
            className="w-full mt-2 px-3 py-2 rounded-lg bg-gray-900 text-gray-100 border border-gray-700 focus:outline-none"
            type="text"
            name="price"
            placeholder="Price of book"
            required
            value={data.price}
            onChange={handleChange}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="" className="text-gray-400">
            Description
          </label>
          <textarea
            className="w-full mt-2 px-3 py-2 rounded-lg bg-gray-900 text-gray-100 border border-gray-700 focus:outline-none"
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
          className="mt-6 w-full md:w-auto px-6 py-2 rounded-lg bg-violet-500 hover:bg-violet-600 text-white font-semibold transition-all duration-300"
          onClick={handleSubmit}
        >
          Add Book
        </button>
      </div>
    </div>
  );
};

export default AddBook;
