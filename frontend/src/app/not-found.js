"use client";
import React from 'react'
import { useRouter } from 'next/navigation';
const NotFound = () => {
    const router = useRouter();
    return (
        <>

            <section className="py-10">
                <div className="container mx-auto px-4">
                    <div className="flex justify-center">
                        <div className="w-full  flex flex-col items-center text-center">
                            <div
                                className="bg-cover bg-center mt-10 w-1/2 h-130 flex items-center justify-center"
                                style={{ backgroundImage: "url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')" }}
                            >
                                <h1 className="text-8xl font-bold text-black drop-shadow-lg absolute top-20">404</h1>
                            </div>
                            <div className="mt-[-50px]">
                                <h3 className="text-2xl font-semibold mt-4">Look like youre lost</h3>
                                <p className="text-gray-600 mt-2">The page you are looking for is not available.</p>
                                <button
                                    onClick={() => router.push("/")}
                                >
                                    <button type="button" className="mt-4 text-white bg-[#6daa5c] hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-[#6daa5c] cursor-pointer dark:focus:ring-[#6daa5c] font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Go to Home</button>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default NotFound