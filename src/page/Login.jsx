import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice.js';


const Login = () => {
  const [email, setEmail] = useState('niravparmar@gmail.com');
  const [password, setPassword] = useState('12345678');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
const handleLogin = (e)=>{
    e.preventDefault()

    const dummyEmail = "niravparmar@gmail.com"
    const dummyPassword = "12345678"
    
    if (!email || !password) {
      toast.error("All fields are required")
      return
    }

    if (email !== dummyEmail) {
      toast.error("Email not valid")
      return
    }

    if (password !== dummyPassword) {
      toast.error("Password incorrect")
      return
    }
      toast.success("Login successful")
  
dispatch(login({ user: { email, name: 'Nirav Parmar' } }));
    setTimeout(() => {
      navigate("/admin")
    }, 1000)
}
  return (
    <div className="flex h-screen w-full font-sans overflow-hidden">
      {/* LEFT SIDE - FORM */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-32 bg-white z-10">
<div className="w-full max-w-md mx-auto">
     <h2 className="text-3xl font-bold mb-10 text-gray-900 tracking-tight">Welcome to RX SETU</h2>

      <form onSubmit={handleLogin} className="space-y-5">
            
            {/* Email Input */}
            <div className="group">
                <label className="block text-xs font-semibold text-gray-500 mb-1 ml-1 uppercase tracking-wide">Email</label>
                <div className="relative">
                    <input 
                        type="email" 
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition bg-gray-50 hover:bg-white"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="niravparmar@gmail.com"
                        required
                    />
                </div>
            </div>

            {/* Password Input */}
            <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1 ml-1 uppercase tracking-wide">Password</label>
                <div className="relative">
                    <input 
                        type={showPassword ? "text" : "password"}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition bg-gray-50 hover:bg-white"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                    />
                    <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                        {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                    </button>
                </div>
            </div>
            
            {/* Remember & Forgot */}
            <div className="flex justify-between items-center text-sm mt-2">
                <label className="flex items-center text-gray-600 cursor-pointer select-none">
                    <input type="checkbox" className="mr-2 w-4 h-4 accent-teal-700 rounded border-gray-300" /> 
                    Remember Me
                </label>
                <span className="text-[#115e59] font-medium cursor-pointer hover:underline">
                    Forget Password?
                </span>
            </div>

            {/* Login Button */}
            <button 
                type="submit" 
                className="w-full mt-6 py-3.5 bg-[#115e59] text-white rounded-lg font-bold text-sm hover:bg-teal-800 transition duration-300 shadow-lg tracking-wide"
            >
                LOG IN
            </button>
            </form>
</div>
      </div> {/* LEFT SIDE - FROM DIV END */}

       {/* RIGHT SIDE */}
      <div className="hidden md:flex w-1/2 bg-[#115e59] relative items-center justify-center overflow-hidden">
        
        {/* Floating Circles images */}
        <div className="relative w-125 h-125">
            
            
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-32 rounded-full  overflow-hidden border-4 border-none shadow-2xl z-20 hover:scale-110 transition duration-500">
                <img src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&auto=format&fit=crop&q=60" alt="User" className="w-full h-full object-cover mix-blend-multiply opacity-90" />
            </div>

            
            <div className="absolute bottom-20 left-10 w-36 h-36 rounded-full  overflow-hidden border-4 border-none shadow-2xl z-10 hover:scale-110 transition duration-500">
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60" alt="User" className="w-full h-full object-cover mix-blend-multiply" />
            </div>

            
            <div className="absolute top-10 right-10 w-28 h-28 rounded-full  overflow-hidden border-4 border-none  shadow-2xl z-10 hover:scale-110 transition duration-500">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=60" alt="User" className="w-full h-full object-cover mix-blend-multiply" />
            </div>

           
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full  overflow-hidden border-4 border-none shadow-xl z-0 hover:scale-110 transition duration-500 mt-8">
                 <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=60" alt="User" className="w-full h-full object-cover mix-blend-multiply" />
            </div>

            
            <div className="absolute bottom-10 right-20 w-24 h-24 rounded-full border-none overflow-hidden border-4 shadow-xl z-20 hover:scale-110 transition duration-500">
                <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=60" alt="User" className="w-full h-full object-cover mix-blend-multiply" />
            </div>
        </div>

        {/* Bottom Text */}
        <div className="absolute bottom-10 text-teal-100/60 text-sm tracking-widest uppercase font-light">
             Lorem ipsum dolor sit amet, consectetur adipiscing
        </div>

      </div>

      <ToastContainer/>
    </div>
  )
}

export default Login
