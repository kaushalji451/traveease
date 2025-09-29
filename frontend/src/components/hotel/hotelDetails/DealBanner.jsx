"use client";
import React from "react";
import Image from "next/image";

function DealBanner() {
  return (
    <div className="bg-[#6daa5c] text-white rounded-lg font-semibold p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
      {/* Left section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-2">
        <div className="flex-shrink-0">
          <Image
            src="https://cdn-icons-png.flaticon.com/512/833/833472.png"
            alt="Cashback"
            width={40}
            height={40}
            className="w-10 h-10"
          />
        </div>
        <div className="flex flex-wrap gap-2 text-sm sm:gap-6">
          <span>Instant ₹500* Cashback</span>
          <span>Up to 60% OFF*</span>
          <span>Breakfast Upgrade</span>
          <span>F&B Discounts</span>
          <span>Special Coupon Offers</span>
        </div>
      </div>

      {/* Button */}
      <div className="flex-shrink-0">
        <button className="bg-[#ffd54f] hover:bg-[#f7c41f] rounded px-6 py-2 font-bold transition w-full sm:w-auto">
          Know More
        </button>
      </div>
    </div>
  );
}

export default DealBanner;
