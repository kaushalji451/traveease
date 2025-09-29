"use client";
import React, { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ToastContainer, Bounce, toast } from 'react-toastify';


const SignUp = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send signup request to backend
      const res = await axios.post(`${process.env.NEXT_PUBLIC_AUTH_URL}/auth/signup`, formData);
      if (res.status === 201) {
        const token = res.data.token;
        // Remove old token (if any)
        localStorage.removeItem("token");
        // Save new token
        localStorage.setItem("token", token);
        toast('Signup Successful. Redirected to profile');
        setTimeout(() => {
          router.push("/profile"); // redirect after login
        }, 5000);
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast(err.response?.data?.message || "Signup failed");
    }
  };


  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-teal-50 to-orange-50 relative overflow-hidden">
        {/* Blurred background image */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center blur-sm opacity-50"></div>

        <div className="relative z-10 w-full max-w-md mx-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            {/* Title and Subtitle */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Welcome to RudrabhishekTravels
              </h2>
              <p className="text-gray-600">
                Please Signup to Explore your next journey.
              </p>
            </div>

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email ID
                </label>
                <input
                  type="email"
                  id="email"
                  name='email'
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition duration-200"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name='password'
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition duration-200"
                  placeholder="Enter your Password"
                  value={formData.password}
                  onChange={handleChange}
                  minLength={6}
                  required
                />
              </div>

              {/* Continue with Email Button */}
              <button
                className="w-full bg-[#6daa5c] text-white py-3 rounded-lg font-medium hover:bg-[#6cbb56] transition duration-200 shadow-md"
              >
                Continue with Email
              </button>

              {/* Social Buttons */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase text-gray-500">
                  Or continue with
                </div>
              </div>

              {/* Google Button */}
              <div
                className="flex items-center justify-center w-full border border-gray-300 bg-white rounded-lg px-4 py-3 text-gray-700 cursor-pointer hover:bg-green-100 transition duration-200 shadow-sm"
                onClick={() => { }}
              >
                <span className="mr-3 text-3xl"><FcGoogle /></span>
                Continue with Google
              </div>
            </form>
            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Allredy have an account?
                <Link
                  href={'/auth/login'}
                  className="font-medium text-teal-500 cursor-pointer hover:text-teal-600 ml-1"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
