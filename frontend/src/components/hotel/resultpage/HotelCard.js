"use client";
import React from "react";
import Image from "next/image";

function HotelCard({ hotel, minRate, discount }) {
  const EUR_TO_INR = 90;
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-md flex flex-col md:flex-row overflow-hidden mb-8">
      <div className="relative w-full md:w-[380px] flex-shrink-0">
        <Image
          src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-eqZdkMRPvLClkY8RNVbbd557C1e9GWEQ6A&s"}
          alt="Hotel"
          width={100}
          height={100}
          className="w-full h-full object-cover rounded-t-xl md:rounded-l-xl md:rounded-tr-none"
        />
      </div>

      <div className="flex flex-col flex-1 p-6 justify-between">
        <div>
          <h3 className="text-xl font-semibold mb-1">{hotel.name}</h3>
          <div className="mb-2 text-[#6DAA5C] font-medium text-sm">
            {hotel.categoryName}
          </div>
          <p className="bg-slate-200 w-fit p-1 rounded-sm px-3 text-sm">
            Couple Friendly
          </p>
          <div className="mb-3 text-gray-600 text-sm flex flex-wrap gap-x-3 gap-y-1">
            {(hotel.amenities || []).join(" • ")}
          </div>
        </div>

        <div className="flex justify-between items-center mt-4 md:mt-0">
          <div className="ml-auto text-right">
            <div className="text-red-600 font-bold text-2xl">
              ₹{Math.round(minRate) * EUR_TO_INR}{" "}
              <span className="line-through text-gray-400 text-base ml-2">
                ₹{Math.round(minRate + discount)*EUR_TO_INR}
              </span>
            </div>
            <div className="text-xs text-gray-600 mt-1">
              + taxes & fees / night
            </div>
            <button className="mt-2 bg-[#FFD54F] text-white px-6 py-2 rounded-full font-bold">
              View Rooms
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelCard;
