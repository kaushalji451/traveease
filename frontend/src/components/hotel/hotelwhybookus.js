import React from 'react'
import Image from 'next/image';

const Hotelwhybookus = () => {
    return (
        <div className="bg-white min-h-screen flex flex-col items-center py-10">
            <div className="max-w-5xl w-full bg-white rounded-xl shadow-md p-8 mb-8 flex flex-col md:flex-row gap-8 items-center">
                {/* Left Section */}
                <div className="flex-1">
                    <h1 className="text-xl font-bold mb-2 ">
                        Cheapest Deals on Budget & Luxury Hotels are Available at RudrabhishekTravels
                    </h1>
                    <p className="text-gray-700 mb-6">
                        Due to the huge influx of tourists in India, RudrabhishekTravels offers a wide range of luxury, deluxe and budget hotels to them. Choose to stay in luxury and comfort with the greatest discounts available on hotel bookings. We list the classiest budget hotels on our site along with some of the prominent international hotel chains of India including Oberoi Group, ITC Group, Taj Group, Le Meridian Group and many others. Ranging from class hotels to luxury beach resorts, each hotel on our site gives you a memorable staying experience. Along with deluxe, budget and luxury hotels, RudrabhishekTravels also displays a number of heritage hotels that offer you a royal stay. Enjoy cheap hotel deals for any destination with great savings.
                    </p>
                    <button className="px-6 py-2 border-2 border-[#A8E6A1] text-[#A8E6A1] rounded-full font-medium hover:bg-blue-50 transition">
                        Read More
                    </button>
                </div>
                {/* Right Section */}
                <div className="flex-shrink-0">
                    <Image
                        src={"/hotelscroll.jpg"}
                        alt="Hotel"
                        className="rounded-2xl w-80 h-56 object-cover"
                        width={320}
                        height={224}
                    />
                </div>
            </div>

            <div className="max-w-5xl w-full">
                <h2 className="text-2xl font-bold mb-4 max-sm:text-center">
                    Why Book Hotels with <span className="font-black">RudrabhishekTravels.com?</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                    <div className="bg-white shadow rounded-xl p-6 flex flex-col items-center">
                        <div className="bg-blue-100 p-3 rounded-full mb-4">
                            <svg className="w-8 h-8 text-[#A8E6A1]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                {/* Hotel icon */}
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 17v2a1 1 0 001 1h14a1 1 0 001-1v-2M21 17V8a2 2 0 00-2-2H5a2 2 0 00-2 2v9m18 0H3" />
                            </svg>
                        </div>
                        <h3 className="font-bold mb-2 text-center">Extensive Hotel Options</h3>
                        <p className="text-gray-600 text-center text-sm">
                            Best hotels available for different destinations to offer you the stay of a lifetime.
                        </p>
                    </div>
                    <div className="bg-white shadow rounded-xl p-6 flex flex-col items-center">
                        <div className="bg-yellow-100 p-3 rounded-full mb-4">
                            <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                {/* Savings/discount icon */}
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 0V4m0 12v4m8-8h-4m-8 0H4" />
                            </svg>
                        </div>
                        <h3 className="font-bold mb-2 text-center">Savings on Hotel Booking</h3>
                        <p className="text-gray-600 text-center text-sm">
                            Enjoy hotel bookings with the best offers and discounts and make your stay unforgettable.
                        </p>
                    </div>
                    <div className="bg-white shadow rounded-xl p-6 flex flex-col items-center">
                        <div className="bg-blue-100 p-3 rounded-full mb-4">
                            <svg className="w-8 h-8 text-[#A8E6A1]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                {/* Star/rating icon */}
                                <polygon points="12 2 15 8.5 22 9.3 17 14.1 18.2 21 12 17.8 5.8 21 7 14.1 2 9.3 9 8.5" />
                            </svg>
                        </div>
                        <h3 className="font-bold mb-2 text-center">Hotel Ratings</h3>
                        <p className="text-gray-600 text-center text-sm">
                            All our hotels have good ratings on Trip Advisor and are recommended by users.
                        </p>
                    </div>
                    <div className="bg-white shadow rounded-xl p-6 flex flex-col items-center">
                        <div className="bg-blue-100 p-3 rounded-full mb-4">
                            <svg className="w-8 h-8 text-[#A8E6A1]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                {/* Best price tag icon */}
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17l5-5 5 5M12 12v9" />
                            </svg>
                        </div>
                        <h3 className="font-bold mb-2 text-center">Best Price</h3>
                        <p className="text-gray-600 text-center text-sm">
                            Get excellent hotels/resorts at the best prices to pamper your desires.
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
                        <div className="font-semibold text-gray-800 text-sm mb-1">The most amazing prices on ...</div>
                        <div className="text-gray-500 text-xs">
                            The most amazing prices on flight tickets, has been my go-to website for all my india...
                        </div>
                        <div className="text-xs text-gray-400 mt-2">Ravi, September 11</div>
                    </div>
                    <div className="bg-white shadow p-4 rounded-xl">
                        <div className="flex items-center space-x-2 mb-1">
                            <span className="text-[#A8E6A1]">⭐⭐⭐⭐⭐</span>
                            <span className="text-xs text-gray-400">Verified</span>
                        </div>
                        <div className="font-semibold text-gray-800 text-sm mb-1">Very Good platform for ticket...</div>
                        <div className="text-gray-500 text-xs">
                            Very Good platform for ticket booking
                        </div>
                        <div className="text-xs text-gray-400 mt-2">Jagadeesh Bhaskar, September 10</div>
                    </div>
                    <div className="bg-white shadow p-4 rounded-xl">
                        <div className="flex items-center space-x-2 mb-1">
                            <span className="text-[#A8E6A1]">⭐⭐⭐⭐⭐</span>
                            <span className="text-xs text-gray-400"> </span>
                        </div>
                        <div className="font-semibold text-gray-800 text-sm mb-1">Very nice</div>
                        <div className="text-gray-500 text-xs">
                            Very good dealings
                        </div>
                        <div className="text-xs text-gray-400 mt-2">KartikChandra Das, September 10</div>
                    </div>
                    <div className="bg-white shadow p-4 rounded-xl">
                        <div className="flex items-center space-x-2 mb-1">
                            <span className="text-[#A8E6A1]">⭐⭐⭐⭐⭐</span>
                            <span className="text-xs text-gray-400">Verified</span>
                        </div>
                        <div className="font-semibold text-gray-800 text-sm mb-1">My query where solved withi...</div>
                        <div className="text-gray-500 text-xs">
                            My query where solved within very short period. Thank you RudrabhishekTravels..
                        </div>
                        <div className="text-xs text-gray-400 mt-2">customer, September 8</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hotelwhybookus
