"use client";
import React, { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ToastContainer, Bounce, toast } from 'react-toastify';
import GoogleLogin from '@/components/GoogleLogin';

const SignUp = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false); // ✅ Loading state

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // ✅ Disable button and show loading

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_AUTH_URL}/auth/signup`, formData);
      if (res.status === 201) {
        const token = res.data.token;
        localStorage.removeItem("token");
        localStorage.setItem("token", token);
        toast('Signup Successful. Redirected to profile');

        setTimeout(() => {
          router.push("/profile");
        }, 2000); // ✅ shorter delay for better UX
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false); // ✅ Re-enable button after request
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
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center blur-sm opacity-50"></div>

        <div className="relative z-10 w-full max-w-md mx-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Welcome to RudrabhishekTravels
              </h2>
              <p className="text-gray-600">
                Please Signup to Explore your next journey.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
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

              {/* Sign Up Button */}
              <button
                type="submit"
                disabled={loading} // ✅ Disable during signup
                className={`w-full py-3 rounded-lg font-medium transition shadow-md ${loading
                    ? "bg-gray-400 cursor-not-allowed opacity-60"
                    : "bg-[#6daa5c] text-white hover:bg-[#6cbb56]"
                  }`}
              >
                {loading ? "Signing up..." : "Continue with Email"} {/* ✅ Show loading text */}
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase text-gray-500">
                  Or continue with
                </div>
              </div>

              <GoogleLogin />
            </form>

            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Already have an account?
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
