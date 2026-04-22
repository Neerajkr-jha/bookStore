import axios from 'axios';
import React, { useState } from 'react'
import toast, { Toaster } from "react-hot-toast"; 
import {Link, Navigate, useNavigate} from 'react-router-dom'

const SignUp = () => {
  const navigate=useNavigate();
  const [Values, setValues] = useState({
    username:"",
    email:"",
    password:"",
    address:""
  });

  const handleChnage=(e)=>{
    const {name,value}=e.target;
    setValues({...Values,[name]:value})
  }

  const handleSubmit=async()=>{
    try {
      if(Values.username===""|| Values.email==="" || Values.address==="" || Values.password===""){
         toast.error("All fields are required");
      }else{
        const response=await axios.post("http://localhost:8080/api/users/sign-up",Values);
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/login")
        }, 1000);
      }
    } catch (error) {
     toast.error(error.response.data.message || "Something went wrong");
    }
  }
  return (
    <div className='min-h-screen bg-gray-900 flex items-center justify-center px-4'>
      <div className='bg-gray-800 rounded border-gray-700 px-8 py-5 w-full md:w-3/6 lg:w-2/6'>
        <p className='text-gray-400 text-2xl text-center'>Sign Up</p>
        <div className='mt-4'>
          <div>
            <label htmlFor="username" className='text-gray-400'>Username</label>
            <input value={Values.username} onChange={handleChnage} type="text" name="username" placeholder="Username" className="w-full mt-2 px-3 py-2 rounded-lg bg-gray-900 text-gray-100 border border-gray-700 focus:outline-none" required/>
          </div>
          <div className='mt-4'>
            <label htmlFor="email" className='text-gray-400'>Emial</label>
            <input value={Values.email} onChange={handleChnage} type="email" name="email" placeholder="Email" className='w-full mt-2 px-3 py-2 rounded-lg bg-gray-900 text-gray-100 border border-gray-700 focus:outline-none' required/>
          </div>
          <div className='mt-4'>
            <label htmlFor="password" className='text-gray-400'>Password</label>
            <input value={Values.password} onChange={handleChnage} type="password" name="password" placeholder="Password" className='w-full mt-2 px-3 py-2 rounded-lg bg-gray-900 text-gray-100 border border-gray-700 focus:outline-none'required />
          </div>
          <div className='mt-4'>
            <label htmlFor="address" className='text-gray-400'>Address</label>
            <textarea value={Values.address} onChange={handleChnage} rows={5} name="address" className='w-full mt-2 px-3 py-2 rounded-lg bg-gray-900 text-gray-100 border border-gray-700 focus:outline-none' required></textarea>
          </div>
          <div className='mt-4'>
            <button className="w-full py-2 rounded-lg font-semibold text-white bg-gray-500 hover:cursor-pointer transition-all duration-300" onClick={handleSubmit}>
              Sign Up
            </button>
          </div>
          <p className='text-center text-gray-500 mt-4'>
            or
          </p>
          <p className='text-center text-gray-400 text-sm mt-4'>
            Already have an account ? &nbsp;
            <Link className='text-purple-400 hover:text-purple-300 transition' to="/login">
            <u>Login</u>
            </Link>
          </p>
        </div>
      </div>
      <Toaster position="top-center" />
    </div>
    
  )
}

export default SignUp