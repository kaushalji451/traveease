"use client";
import React from 'react'
import Image from 'next/image';

const Buswhybookus = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col items-center py-10">
      {/* Intro Section */}
      <div className="max-w-5xl w-full bg-white rounded-xl shadow-md p-8 mb-8 flex flex-col md:flex-row gap-8 items-center">
        {/* Left Section */}
        <div className="flex-1">
          <h1 className="text-xl font-bold mb-2">
            Affordable & Reliable Bus Booking with RudrabhishekTravels
          </h1>
          <p className="text-gray-700 mb-6">
            RudrabhishekTravels brings you the easiest way to book bus tickets online. 
            With access to thousands of bus operators across India, we ensure 
            smooth, affordable, and safe journeys. From luxury AC buses to 
            budget-friendly sleeper coaches, choose the perfect ride that suits 
            your travel needs. Enjoy hassle-free booking, secure payments, and 
            24/7 customer support.
          </p>
          <button className="px-6 py-2 border-2 border-[#66BB6A] text-[#66BB6A] rounded-full font-medium hover:bg-blue-50 transition">
            Read More
          </button>
        </div>

        {/* Right Section */}
        <div className="flex-shrink-0">
          <Image
            src={"/busscroll.jpg"}
            width={320}
            height={224}
            alt="Bus"
            className="rounded-2xl w-80 h-56 object-cover"
          />
        </div>
      </div>

      {/* Why Book With Us */}
      <div className="max-w-5xl w-full">
        <h2 className="text-2xl font-bold mb-4 max-sm:text-center">
          Why Book Buses with <span className="font-black">RudrabhishekTravels.com?</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          {/* Extensive Bus Options */}
          <div className="bg-white shadow rounded-xl p-6 flex flex-col items-center">
            <div className="bg-blue-100 p-3 rounded-full mb-4">
              <svg
                className="w-8 h-8 text-[#A8E6A1]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 17V7a2 2 0 012-2h12a2 2 0 012 2v10M3 17h18M6 20h2m8 0h2"
                />
              </svg>
            </div>
            <h3 className="font-bold mb-2 text-center">Wide Bus Options</h3>
            <p className="text-gray-600 text-center text-sm">
              Choose from Sleeper, Seater, AC, Non-AC, and Luxury buses across
              India.
            </p>
          </div>

          {/* Affordable Pricing */}
          <div className="bg-white shadow rounded-xl p-6 flex flex-col items-center">
            <div className="bg-yellow-100 p-3 rounded-full mb-4">
              <svg
                className="w-8 h-8 text-yellow-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8c-1.1 0-2 .9-2 2s.9 2 2 2
                   2-.9 2-2-.9-2-2-2zm0 0V4m0 12v4m8-8h-4m-8 0H4"
                />
              </svg>
            </div>
            <h3 className="font-bold mb-2 text-center">Lowest Fares</h3>
            <p className="text-gray-600 text-center text-sm">
              Get the cheapest bus tickets with exclusive discounts and offers.
            </p>
          </div>

          {/* Safety & Comfort */}
          <div className="bg-white shadow rounded-xl p-6 flex flex-col items-center">
            <div className="bg-blue-100 p-3 rounded-full mb-4">
              <svg
                className="w-8 h-8 text-[#A8E6A1]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 11c0-1.1-.9-2-2-2s-2 .9-2 2
                   .9 2 2 2 2-.9 2-2zm0 0v-4m0 8v2m6-2v2m-6-2H6"
                />
              </svg>
            </div>
            <h3 className="font-bold mb-2 text-center">Safe & Comfortable</h3>
            <p className="text-gray-600 text-center text-sm">
              Travel with verified operators offering punctual and safe services.
            </p>
          </div>

          {/* Easy Booking */}
          <div className="bg-white shadow rounded-xl p-6 flex flex-col items-center">
            <div className="bg-green-100 p-3 rounded-full mb-4">
              <svg
                className="w-8 h-8 text-[#A8E6A1]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="font-bold mb-2 text-center">Easy Booking</h3>
            <p className="text-gray-600 text-center text-sm">
              Simple search, quick booking, and secure payment options for your
              trip.
            </p>
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="bg-white shadow p-4 rounded-xl">
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-[#A8E6A1]">⭐⭐⭐⭐⭐</span>
              <span className="text-xs text-gray-400">Verified</span>
            </div>
            <div className="font-semibold text-gray-800 text-sm mb-1">
              Super affordable bus tickets
            </div>
            <div className="text-gray-500 text-xs">
              RudrabhishekTravels always gives me the cheapest fares. I saved a lot on my
              trips.
            </div>
            <div className="text-xs text-gray-400 mt-2">Ravi, September 11</div>
          </div>

          <div className="bg-white shadow p-4 rounded-xl">
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-[#A8E6A1]">⭐⭐⭐⭐⭐</span>
              <span className="text-xs text-gray-400">Verified</span>
            </div>
            <div className="font-semibold text-gray-800 text-sm mb-1">
              Hassle-free booking
            </div>
            <div className="text-gray-500 text-xs">
              Very good platform for booking bus tickets, easy and smooth.
            </div>
            <div className="text-xs text-gray-400 mt-2">
              Anjali, September 10
            </div>
          </div>

          <div className="bg-white shadow p-4 rounded-xl">
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-[#A8E6A1]">⭐⭐⭐⭐⭐</span>
            </div>
            <div className="font-semibold text-gray-800 text-sm mb-1">
              Comfortable travel
            </div>
            <div className="text-gray-500 text-xs">
              The bus was clean and on time, very happy with the service.
            </div>
            <div className="text-xs text-gray-400 mt-2">
              Suresh, September 9
            </div>
          </div>

          <div className="bg-white shadow p-4 rounded-xl">
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-[#A8E6A1]">⭐⭐⭐⭐⭐</span>
              <span className="text-xs text-gray-400">Verified</span>
            </div>
            <div className="font-semibold text-gray-800 text-sm mb-1">
              Quick support team
            </div>
            <div className="text-gray-500 text-xs">
              My query was solved quickly by the RudrabhishekTravels team. Great
              service!
            </div>
            <div className="text-xs text-gray-400 mt-2">
              Meena, September 8
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buswhybookus;
