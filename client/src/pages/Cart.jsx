import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { Loader } from "../components/Loader/Loader.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const [cart, setCart] = useState();
  const [total, setTotal] = useState(0);

  const navigate=useNavigate();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  //get cart items
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:8080/api/cart/get-cart",
        { headers },
      );
      setCart(response.data.data);
    };
    fetch();
  }, [cart]);

  // delete from cart
  const handleDelete = async (bookid) => {
    const response = await axios.put(
      `http://localhost:8080/api/cart/remove-from-cart/${bookid}`,{},
      {headers},
    );
    alert(response.data.message);
  };

  const placeOrder = async () => {
    try {
       if (!cart || cart.length === 0) return;
      const response = await axios.post(
      "http://localhost:8080/api/order/place-order",{order:cart},
      {headers},
    );
    alert(response.data.message);
    navigate("/profile/orderHistory")
    } catch (error) {
      console.log(error)
    }
  };

  // total cart price

  useEffect(() => {
    if(cart && cart.length > 0){
      let total=0;
      cart.map((items)=>{
        total+=items.price
    })
      setTotal(total);
      total=0;
    }
  }, [cart])
  
  return (
    <div className="bg-zinc-900 min-h-screen px-12 py-8">
      {!cart && <div className="w-full h-full flex items-center justify-center"><Loader /></div>}
      {cart && cart.length === 0 && (
        <div className="h-screen">
          <div className="h-full flex items-center justify-center flex-col gap-6">
            <img
              src="./EmptyCart.png"
              alt="emptyCart"
              className="lg:h-[50vh]"
            />
            <h1 className="text-5xl lg:text-6xl font-semibold text-zinc-100">
              Empty Cart
            </h1>
          </div>
        </div>
      )}
      {cart && cart.length > 0 && (
        <>
          <h1 className="text-4xl font-semibold text-zinc-100 mb-4 px-4 py-4">
            Your Cart
          </h1>
          {cart.map((item, i) => (
            <div
              className="w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center"
              key={i}
            >
              <img
                src={item.url}
                alt="/"
                className="w-full md:w-48 h-[20vh] md:h-52 object-cover rounded p-4"
              />
              <div className="w-full md:w-auto">
                <h1 className="text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0">
                  {item.title}
                </h1>
                <p className="text-normal text-zinc-300 mt-2 lg:block hidden">
                  {item.desc.slice(0, 100)}...
                </p>
                <p className="text-normal text-zinc-300 mt-2 lg:hidden md:block hidden">
                  {item.desc.slice(0, 65)}...
                </p>
                <p className="text-normal text-zinc-300 mt-2 lg:hidden md:block hidden">
                  {item.desc.slice(0, 100)}...
                </p>
              </div>
              <div className="flex mt-4 w-full md:w-auto items-center justify-center">
                <h2 className="text-zinc-100 text-3xl font-semibold flex">
                  Rs {item.price}
                </h2>
                <button className="cursor-pointer bg-red-100 border-2 border-red-500 text-red-700 rounded p-2 ms-12 mr-2">
                  <MdDelete size={24} onClick={() => handleDelete(item._id)} />
                </button>
              </div>
            </div>
          ))}
        </>
      )}
      {cart && cart.length > 0 && (
        <div className="mt-4 w-full flex items-center justify-end">
          <div className="p-4 bg-zinc-800 rounded">
            <h1 className="text-3xl font-semibold text-zinc-200">
              Total Amount
            </h1>
            <div className="mt-3 flex items-center justify-between text-xl text-zinc-200">
              <h2>{cart.length} Books</h2> <h2>Rs {total}</h2>
            </div>
            <div className="w-full mt-3">
              <button onClick={placeOrder} className="cursor-pointer bg-zinc-100 rounded px-4 py-2 flex justify-center w-full font-semibold hover:bg-zinc-200">
                Place your order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
