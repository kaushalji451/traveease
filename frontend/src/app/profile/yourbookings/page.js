"use client";
import React, { useState, useEffect } from "react";
import FlightOrders from "@/app/profile/FlightOrder";
import HotelOrder from "@/app/profile/HotelOrder";
import Link from "next/link";
import { useRouter } from "next/navigation";

const YourBookingsPage = () => {
  const router = useRouter();
  const [bookingType, setBookingType] = useState("flight");
  useEffect(() => {
    // Check window width on mount
    if (window.innerWidth >= 768) { // md breakpoint
      router.replace('/profile');
    }
  }, [router]);
  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <Link href="/profile" className="text-[#66BB6A] text-sm mb-4 inline-block">
        &larr; Back
      </Link>

      {/* Booking type toggle */}
      <div className="flex gap-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${bookingType === "flight" ? "bg-[#6daa5c] text-white" : "bg-gray-200"}`}
          onClick={() => setBookingType("flight")}
        >
          Flight Orders
        </button>
        <button
          className={`px-4 py-2 rounded ${bookingType === "hotel" ? "bg-[#6daa5c] text-white" : "bg-gray-200"}`}
          onClick={() => setBookingType("hotel")}
        >
          Hotel Orders
        </button>
      </div>

      {bookingType === "flight" && <FlightOrders />}
      {bookingType === "hotel" && <HotelOrder />}
    </div>
  );
};

export default YourBookingsPage;
