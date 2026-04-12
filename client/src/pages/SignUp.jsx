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
    <div className='h-screen bg-zinc-900 px-12 py-8 flex items-center justify-center'>
      <div className='bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6'>
        <p className='text-zinc-200 text-xl'>Sign Up</p>
        <div className='mt-4'>
          <div>
            <label htmlFor="username" className='text-zinc-400'>Username</label>
            <input value={Values.username} onChange={handleChnage} type="text" name="username" placeholder="Username" className='w-full mt-2 outline-none bg-zinc-900 text-zinc-100 p-2' required/>
          </div>
          <div className='mt-4'>
            <label htmlFor="email" className='text-zinc-400'>Emial</label>
            <input value={Values.email} onChange={handleChnage} type="email" name="email" placeholder="Email" className='w-full mt-2 outline-none bg-zinc-900 text-zinc-100 p-2' required/>
          </div>
          <div className='mt-4'>
            <label htmlFor="password" className='text-zinc-400'>Password</label>
            <input value={Values.password} onChange={handleChnage} type="password" name="password" placeholder="password" className='w-full mt-2 outline-none bg-zinc-900 text-zinc-100 p-2'required />
          </div>
          <div className='mt-4'>
            <label htmlFor="address" className='text-zinc-400'>Address</label>
            <textarea value={Values.address} onChange={handleChnage} rows={5} name="address" className='w-full mt-2 outline-none bg-zinc-900 text-zinc-100 p-2' required></textarea>
          </div>
          <div className='mt-4'>
            <button className='py-2 w-full bg-blue-500 text-white font-semibold rounded hover:bg-blue-600' onClick={handleSubmit}>
              Sign Up
            </button>
          </div>
          <p className='text-center text-zinc-200 font-medium text-2xl mt-4'>
            or
          </p>
          <p className='text-center text-zinc-200 font-light mt-4'>
            Already have an account ? &nbsp;
            <Link className='hover:text-blue-500' to="/login">
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