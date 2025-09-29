"use client";
import React from "react";

function HotelHeader({ destination, checkIn, checkOut }) {
  return (
    <div className="text-sm text-gray-600 mb-4 select-none">
      <span className="underline cursor-pointer px-4 text-blue-700">
        {destination}
      </span>{" "}
      <strong>
        {checkIn}, {checkOut}
      </strong>
    </div>
  );
}

export default HotelHeader;
