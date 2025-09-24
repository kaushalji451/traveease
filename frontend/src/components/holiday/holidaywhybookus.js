import React from 'react'
import Image from 'next/image';

const Holidaywhybookus = () => {
    return (
        <div className="bg-white min-h-screen flex flex-col items-center py-10">
            <div className="max-w-5xl w-full bg-white rounded-xl shadow-md p-8 mb-8 flex flex-col md:flex-row gap-8 items-center">
                {/* Left Section */}
                <div className="flex-1">
                    <h1 className="text-xl font-bold mb-2 ">
                        Unforgettable Holiday Packages at Best Prices with RudrabhishekTravels
                    </h1>
                    <p className="text-gray-700 mb-6">
                        RudrabhishekTravels offers a wide variety of holiday packages to suit every type of traveler. Whether you’re looking for a relaxing beach holiday, an adventurous trek, or a cultural city tour, we have it all. Enjoy the best deals, carefully curated itineraries, and hassle-free bookings that make your holiday experience unforgettable.
                    </p>
                    <button className="px-6 py-2 border-2 border-green-400 text-green-500 rounded-full font-medium hover:bg-green-50 transition">
                        Read More
                    </button>
                </div>
                {/* Right Section */}
                <div className="flex-shrink-0">
                    <Image

                        src={"/europe.jpg"}
                        alt="Holiday"
                        className="rounded-2xl w-80 h-56 object-cover"
                        width={320}
                        height={224}
                    />
                </div>
            </div>

            <div className="max-w-5xl w-full">
                <h2 className="text-2xl font-bold mb-4 max-sm:text-center">
                    Why Book Holidays with <span className="font-black">RudrabhishekTravels.com?</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                    <div className="bg-white shadow rounded-xl p-6 flex flex-col items-center">
                        <div className="bg-green-100 p-3 rounded-full mb-4">
                            <svg className="w-8 h-8 text-[#A8E6A1]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                {/* Package icon */}
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18" />
                            </svg>
                        </div>
                        <h3 className="font-bold mb-2 text-center">Variety of Packages</h3>
                        <p className="text-gray-600 text-center text-sm">
                            From adventure trips to relaxing holidays, we have packages for every taste.
                        </p>
                    </div>
                    <div className="bg-white shadow rounded-xl p-6 flex flex-col items-center">
                        <div className="bg-yellow-100 p-3 rounded-full mb-4">
                            <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                {/* Savings icon */}
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 0V4m0 12v4m8-8h-4m-8 0H4" />
                            </svg>
                        </div>
                        <h3 className="font-bold mb-2 text-center">Best Holiday Deals</h3>
                        <p className="text-gray-600 text-center text-sm">
                            Get amazing discounts on packages and enjoy your holidays without breaking your budget.
                        </p>
                    </div>
                    <div className="bg-white shadow rounded-xl p-6 flex flex-col items-center">
                        <div className="bg-green-100 p-3 rounded-full mb-4">
                            <svg className="w-8 h-8 text-[#A8E6A1]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                {/* Star/quality icon */}
                                <polygon points="12 2 15 8.5 22 9.3 17 14.1 18.2 21 12 17.8 5.8 21 7 14.1 2 9.3 9 8.5" />
                            </svg>
                        </div>
                        <h3 className="font-bold mb-2 text-center">Trusted Experiences</h3>
                        <p className="text-gray-600 text-center text-sm">
                            All packages are tried and tested to ensure memorable and safe experiences.
                        </p>
                    </div>
                    <div className="bg-white shadow rounded-xl p-6 flex flex-col items-center">
                        <div className="bg-green-100 p-3 rounded-full mb-4">
                            <svg className="w-8 h-8 text-[#A8E6A1]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                {/* Price tag icon */}
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17l5-5 5 5M12 12v9" />
                            </svg>
                        </div>
                        <h3 className="font-bold mb-2 text-center">Value for Money</h3>
                        <p className="text-gray-600 text-center text-sm">
                            Enjoy premium holiday experiences at competitive prices.
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
                        <div className="font-semibold text-gray-800 text-sm mb-1">Amazing holiday experience!</div>
                        <div className="text-gray-500 text-xs">
                            The holiday package was well-planned, smooth, and truly unforgettable.
                        </div>
                        <div className="text-xs text-gray-400 mt-2">Anita, August 15</div>
                    </div>
                    <div className="bg-white shadow p-4 rounded-xl">
                        <div className="flex items-center space-x-2 mb-1">
                            <span className="text-[#A8E6A1]">⭐⭐⭐⭐⭐</span>
                            <span className="text-xs text-gray-400">Verified</span>
                        </div>
                        <div className="font-semibold text-gray-800 text-sm mb-1">Best deals and service</div>
                        <div className="text-gray-500 text-xs">
                            RudrabhishekTravels made our vacation planning easy and affordable.
                        </div>
                        <div className="text-xs text-gray-400 mt-2">Rahul, August 12</div>
                    </div>
                    <div className="bg-white shadow p-4 rounded-xl">
                        <div className="flex items-center space-x-2 mb-1">
                            <span className="text-[#A8E6A1]">⭐⭐⭐⭐⭐</span>
                            <span className="text-xs text-gray-400"> </span>
                        </div>
                        <div className="font-semibold text-gray-800 text-sm mb-1">Excellent packages</div>
                        <div className="text-gray-500 text-xs">
                            The holiday packages were diverse and very well organized.
                        </div>
                        <div className="text-xs text-gray-400 mt-2">Sneha, August 10</div>
                    </div>
                    <div className="bg-white shadow p-4 rounded-xl">
                        <div className="flex items-center space-x-2 mb-1">
                            <span className="text-[#A8E6A1]">⭐⭐⭐⭐⭐</span>
                            <span className="text-xs text-gray-400">Verified</span>
                        </div>
                        <div className="font-semibold text-gray-800 text-sm mb-1">Smooth booking experience</div>
                        <div className="text-gray-500 text-xs">
                            All our queries were answered promptly, and booking was hassle-free.
                        </div>
                        <div className="text-xs text-gray-400 mt-2">Vikram, August 8</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Holidaywhybookus
