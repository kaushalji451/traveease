import React from 'react'
import Image from 'next/image';

// Replace with your desired image URL or import statement
const TRAIN_IMAGE_URL =
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80";

const Trainwhybookus = () => {
    return (
        <div className="bg-white min-h-screen flex flex-col items-center py-10">
            {/* Hero Section */}
            <div className="max-w-5xl w-full bg-white rounded-xl shadow-md p-8 mb-8 flex flex-col md:flex-row gap-8 items-center">
                {/* Left Section */}
                <div className="flex-1">
                    <h1 className="text-xl font-bold mb-2 ">
                        Book Trains Easily and Securely with TravelEase
                    </h1>
                    <p className="text-gray-700 mb-6">
                        TravelEase helps you find the best train tickets across India. Compare fares, choose your seat preference, and enjoy hassle-free bookings. Whether it&apos;s short-distance travel or long journeys, TravelEase ensures the cheapest fares, verified trains, and a smooth booking experience. Plan your trip with comfort and convenience, all in one place.
                    </p>
                    <button className="px-6 py-2 border-2 border-[#66BB6A] text-[#66BB6A] rounded-full font-medium hover:bg-blue-50 transition">
                        Read More
                    </button>
                </div>

                {/* Right Section */}
                <div className="flex-shrink-0">
                    <Image
                        src={TRAIN_IMAGE_URL}
                        alt="Train"
                        className="rounded-2xl w-80 h-56 object-cover"
                        width={320}
                        height={224}
                    />
                </div>
            </div>

            {/* Why Book Us Section */}
            <div className="max-w-5xl w-full">
                <h2 className="text-2xl font-bold mb-4 max-sm:text-center">
                    Why Book Trains with <span className="font-black">TravelEase.com?</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                    {/* Wide Train Options */}
                    <div className="bg-white shadow rounded-xl p-6 flex flex-col items-center">
                        <div className="bg-blue-100 p-3 rounded-full mb-4">
                            <svg className="w-8 h-8 text-[#66BB6A]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l2 7h7l-5.5 4 2 7-6-4-6 4 2-7L3 9h7l2-7z" />
                            </svg>
                        </div>
                        <h3 className="font-bold mb-2 text-center">Extensive Train Options</h3>
                        <p className="text-gray-600 text-center text-sm">
                            Access a wide range of trains covering all major routes in India.
                        </p>
                    </div>

                    {/* Savings */}
                    <div className="bg-white shadow rounded-xl p-6 flex flex-col items-center">
                        <div className="bg-yellow-100 p-3 rounded-full mb-4">
                            <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 0V4m0 12v4m8-8h-4m-8 0H4" />
                            </svg>
                        </div>
                        <h3 className="font-bold mb-2 text-center">Best Train Fares</h3>
                        <p className="text-gray-600 text-center text-sm">
                            Compare fares and get the best deals for your train journey.
                        </p>
                    </div>

                    {/* Verified Trains */}
                    <div className="bg-white shadow rounded-xl p-6 flex flex-col items-center">
                        <div className="bg-blue-100 p-3 rounded-full mb-4">
                            <svg className="w-8 h-8 text-[#66BB6A]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <polygon points="12 2 15 8.5 22 9.3 17 14.1 18.2 21 12 17.8 5.8 21 7 14.1 2 9.3 9 8.5" />
                            </svg>
                        </div>
                        <h3 className="font-bold mb-2 text-center">Verified Trains</h3>
                        <p className="text-gray-600 text-center text-sm">
                            All trains are verified and recommended by users for a safe journey.
                        </p>
                    </div>

                    {/* On-time & Reliability */}
                    <div className="bg-white shadow rounded-xl p-6 flex flex-col items-center">
                        <div className="bg-blue-100 p-3 rounded-full mb-4">
                            <svg className="w-8 h-8 text-[#66BB6A]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17l5-5 5 5M12 12v9" />
                            </svg>
                        </div>
                        <h3 className="font-bold mb-2 text-center">On-time & Reliable</h3>
                        <p className="text-gray-600 text-center text-sm">
                            TravelEase ensures accurate train schedules for a smooth journey.
                        </p>
                    </div>
                </div>

                {/* Testimonials */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div className="bg-white shadow p-4 rounded-xl">
                        <div className="flex items-center space-x-2 mb-1">
                            <span className="text-green-500">⭐⭐⭐⭐⭐</span>
                            <span className="text-xs text-gray-400">Verified</span>
                        </div>
                        <div className="font-semibold text-gray-800 text-sm mb-1">Smooth and easy booking</div>
                        <div className="text-gray-500 text-xs">
                            Booking train tickets through TravelEase has been so convenient and fast.
                        </div>
                        <div className="text-xs text-gray-400 mt-2">Ravi, September 11</div>
                    </div>
                    <div className="bg-white shadow p-4 rounded-xl">
                        <div className="flex items-center space-x-2 mb-1">
                            <span className="text-green-500">⭐⭐⭐⭐⭐</span>
                            <span className="text-xs text-gray-400">Verified</span>
                        </div>
                        <div className="font-semibold text-gray-800 text-sm mb-1">Best fares and support</div>
                        <div className="text-gray-500 text-xs">
                            Very good platform for booking train tickets with excellent customer support.
                        </div>
                        <div className="text-xs text-gray-400 mt-2">Jagadeesh Bhaskar, September 10</div>
                    </div>
                    <div className="bg-white shadow p-4 rounded-xl">
                        <div className="flex items-center space-x-2 mb-1">
                            <span className="text-green-500">⭐⭐⭐⭐⭐</span>
                            <span className="text-xs text-gray-400"> </span>
                        </div>
                        <div className="font-semibold text-gray-800 text-sm mb-1">Convenient & reliable</div>
                        <div className="text-gray-500 text-xs">
                            TravelEase makes train ticket booking very simple and reliable.
                        </div>
                        <div className="text-xs text-gray-400 mt-2">KartikChandra Das, September 10</div>
                    </div>
                    <div className="bg-white shadow p-4 rounded-xl">
                        <div className="flex items-center space-x-2 mb-1">
                            <span className="text-green-500">⭐⭐⭐⭐⭐</span>
                            <span className="text-xs text-gray-400">Verified</span>
                        </div>
                        <div className="font-semibold text-gray-800 text-sm mb-1">Quick support</div>
                        <div className="text-gray-500 text-xs">
                            My queries were resolved quickly, and booking was seamless.
                        </div>
                        <div className="text-xs text-gray-400 mt-2">Customer, September 8</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Trainwhybookus;
