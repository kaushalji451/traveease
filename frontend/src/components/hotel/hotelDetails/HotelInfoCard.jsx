"use client";
import Image from "next/image";
import React from "react";

function HotelInfoCard({ hotel, minRate, discount }) {
  const EUR_TO_INR = 90;
  const roomImages = [
    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?fm=jpg&q=60&w=3000",
    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?fm=jpg&q=60&w=3000",
    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?fm=jpg&q=60&w=3000",
    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?fm=jpg&q=60&w=3000",
  ];

  return (
    <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden mb-6 border border-gray-200">
      {/* Image Carousel */}
      <div className="flex-shrink-0 md:w-2/3">
        <div className="relative h-64 md:h-full overflow-hidden">
          <Image
            src={roomImages[0]}
            alt={`${hotel.name} main`}
            width={800}
            height={600}
            className="object-cover w-full h-full"
          />
        </div>
        {/* Thumbnails */}
        <div className="flex space-x-2 p-2 overflow-x-auto bg-gray-50 border-t border-gray-200">
          {roomImages.slice(1).map((img, i) => (
            <Image
              key={i}
              src={img}
              alt={`Thumbnail ${i + 1}`}
              width={120}
              height={80}
              className="w-24 h-16 object-cover rounded cursor-pointer hover:ring-2 hover:ring-orange-500 transition"
            />
          ))}
        </div>
      </div>

      {/* Info & Pricing */}
      <div className="p-6 flex flex-col justify-between w-full md:w-1/3">
        <div>
          <h2 className="text-2xl font-bold mb-1">{hotel.name}</h2>

          {/* Star Rating + Tag */}
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center bg-yellow-400 rounded px-2 py-0.5">
              {[...Array(3)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927C9.349 2.07 10.65 2.07 10.951 2.927l1.286 3.994a1 1 0 00.95.69h4.21c.969 0 1.371 1.24.588 1.81l-3.404 2.476a1 1 0 00-.364 1.118l1.285 3.995c.3.857-.755 1.57-1.54 1.06l-3.403-2.475a1 1 0 00-1.175 0l-3.403 2.475c-.785.51-1.84-.203-1.54-1.06l1.285-3.995a1 1 0 00-.364-1.118L2.035 9.42c-.783-.57-.38-1.81.588-1.81h4.21a1 1 0 00.95-.69l1.286-3.994z" />
                </svg>
              ))}
            </span>
            <span className="text-sm text-gray-600 bg-blue-100 rounded px-2 py-0.5">
              Hotel
            </span>
          </div>

          {/* Location */}
          <div className="text-sm text-gray-500 mb-4">{hotel.destinationName}</div>

          {/* Room description */}
          <p className="text-base mb-4 leading-relaxed">
            Day Use Room 6Hrs (Check In 9am - Check Out 3pm) <br />
            <span className="text-sm text-gray-600">2 x Guest | 1 x Room</span>
          </p>

          {/* Amenities */}
          <div className="flex flex-wrap gap-2 text-sm mb-6 text-gray-700">
            {["Restaurant", "Free Wi-Fi", "24-hour Room Service", "Gym", "Free toiletries"].map(
              (amenity, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center bg-green-100 text-green-700 rounded px-3 py-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {amenity}
                </span>
              )
            )}
          </div>
        </div>

        {/* Pricing & Buttons */}
        <div className="space-y-3">
          <div className="flex items-end justify-end gap-4 text-right">
            <div className="line-through text-gray-500 text-sm mt-0.5">
              ₹{Math.floor(discount * EUR_TO_INR)}
            </div>
            <div className="text-3xl font-bold text-black">
              ₹{Math.floor(minRate * EUR_TO_INR)}
            </div>
          </div>

          <div className="text-xs text-gray-600 text-right -mt-2">
            ₹100 Taxes & fees <br /> Base price (Per Night)
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-4">
            <button className="flex-1 border-2 border-[#6daa5c] text-[#6daa5c] rounded py-2 hover:bg-orange-50 font-semibold transition">
              Select Rooms
            </button>
            <button className="flex-1 bg-[#6daa5c] text-white rounded py-2 hover:bg-[#67ad53] font-semibold transition shadow">
              Book Now
            </button>
          </div>

          {/* Cashback Banner */}
          <div className="bg-[#6daa5c]/20 border border-[#6daa5c] text-yellow-800 text-sm px-3 py-2 rounded mt-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="inline-block h-5 w-5 mr-1 align-middle"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 12V8m0 0L9 11" />
            </svg>
            Flat ₹500 Cashback on booking above ₹5,000
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelInfoCard;
