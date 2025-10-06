"use client";
import React, { useState } from "react";
import Cursole from "@/components/profile/cursole";
import Sidebar from "@/components/profile/sidebar";
import Passangeform from "@/components/profile/passangeform";
import PassangerContact from "@/components/profile/passangercontact";
import FlightOrders from "./FlightOrder";
import HotelOrder from "./HotelOrder";
import { useAuth } from "@/hooks/useAuth";

const Page = () => {
  const { loading } = useAuth();
  const [activeTab, setActiveTab] = useState("Account Information"); // default
  const [bookingType, setBookingType] = useState("flight"); // sub-tab: flight or hotel

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto min-h-screen mt-10 flex flex-col md:flex-row gap-10">
      {/* Sidebar */}
      <div className="order-2 md:order-1 w-full md:w-1/4 ">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Main Content */}
      <div className="order-1 md:order-2 w-full md:w-3/4 ">
        {activeTab === "Account Information" && (
          <>
            <Cursole />
            <div className="hidden md:block mt-6">
              <Passangeform />
              <PassangerContact />
            </div>
          </>
        )}

        {activeTab === "Your Bookings" && (
          <>
            {/* Booking type toggle */}
            <div className="flex gap-4 mb-4">
              <button
                className={`px-4 py-2 rounded ${
                  bookingType === "flight" ? "bg-[#6daa5c] text-white" : "bg-gray-200"
                }`}
                onClick={() => setBookingType("flight")}
              >
                Flight Orders
              </button>
              <button
                className={`px-4 py-2 rounded ${
                  bookingType === "hotel" ? "bg-[#6daa5c] text-white" : "bg-gray-200"
                }`}
                onClick={() => setBookingType("hotel")}
              >
                Hotel Orders
              </button>
            </div>

            {/* Conditional rendering */}
            {bookingType === "flight" && <FlightOrders />}
            {bookingType === "hotel" && <HotelOrder />}
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
