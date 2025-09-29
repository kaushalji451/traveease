"use client";
import React,{useEffect} from 'react'
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";


const GOOGLE_AUTH_URL = `${process.env.NEXT_PUBLIC_AUTH_URL}/auth/google`;

const GoogleLogin = () => {
    const router = useRouter();

    useEffect(() => {
        // Check if token exists in query params after redirect
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        console.log(token);
        if (token) {
            localStorage.setItem("token", token); // Store JWT
            router.replace("/"); // remove token from URL
        }
    }, [router]);

    const handleLogin = () => {
        // Redirect user to Google OAuth login
        window.location.href = GOOGLE_AUTH_URL;
    };
    return (
        <button
            className="flex items-center justify-center w-full border border-gray-300 bg-white rounded-lg px-4 py-3 text-gray-700 cursor-pointer hover:bg-green-100 transition duration-200 shadow-sm"
            onClick={handleLogin}
        >
            <span className="mr-3 text-3xl"><FcGoogle /></span>
            Continue with Google
        </button>
    )
}

export default GoogleLogin
