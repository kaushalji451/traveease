"use client";
import React, { useState } from "react";
import { FaExchangeAlt } from "react-icons/fa";

const TravelBookingForm = () => {
  const [formData, setFormData] = useState({
    from: "",
    to: "Delhi- All Stations (NDLS)",
    departureDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSwap = () => {
    setFormData({
      ...formData,
      from: formData.to,
      to: formData.from,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Travel Booking Form Submitted:", formData);
  };

  return (
    <div className="w-full flex flex-col items-center bg-[#2E7D32] py-6 px-2 md:px-0">
      {/* Top Options */}
      <div className="w-full max-w-7xl flex flex-wrap justify-between items-center text-white mb-4 gap-2 md:gap-4">
        <div className="flex flex-wrap gap-2 md:gap-4">
          {["Search Trains", "Search by Train Name or Number", "Check PNR Status", "Train Live Status", "Live Station"].map(
            (item, idx) => (
              <button
                key={idx}
                className="hover:bg-[#66bb6a]/70 rounded-full px-3 py-1 text-sm md:text-base"
              >
                {item}
              </button>
            )
          )}
        </div>
        <h1 className="text-xl md:text-2xl font-semibold mt-2 md:mt-0">Book Your Tickets</h1>
      </div>

      {/* Main Booking Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row items-center w-full max-w-7xl bg-white rounded-lg shadow-lg overflow-hidden"
      >
        {/* From */}
        <div className="flex-1 px-4 py-3 md:py-4 flex flex-col border-b md:border-b-0 md:border-r border-gray-200">
          <label className="text-xs text-gray-500 font-semibold mb-1">From</label>
          <input
            type="text"
            name="from"
            value={formData.from}
            onChange={handleChange}
            placeholder="Choose Source station"
            className="font-bold text-lg outline-none bg-transparent"
            required
          />
        </div>

        {/* Swap */}
        <button
          type="button"
          className="text-xl text-gray-400 hover:text-[#2196f3] p-2 md:mx-2 mt-2 md:mt-0 self-center"
          onClick={handleSwap}
          aria-label="Swap stations"
        >
          <FaExchangeAlt />
        </button>

        {/* To */}
        <div className="flex-1 px-4 py-3 md:py-4 flex flex-col border-b md:border-b-0 md:border-r border-gray-200">
          <label className="text-xs text-gray-500 font-semibold mb-1">To</label>
          <select
            name="to"
            value={formData.to}
            onChange={handleChange}
            className="font-bold text-lg outline-none bg-transparent"
            required
          >
            <option>Delhi- All Stations NDLS</option>
          </select>
        </div>

        {/* Departure Date */}
        <div className="flex-1 px-4 py-3 md:py-4 flex flex-col border-b md:border-b-0 md:border-r border-gray-200">
          <label className="text-xs text-gray-500 font-semibold mb-1">Departure Date</label>
          <input
            type="date"
            name="departureDate"
            value={formData.departureDate}
            onChange={handleChange}
            className="font-bold text-lg outline-none bg-transparent"
            required
          />
        </div>

        {/* SEARCH Button */}
        <div className="px-4 py-3 w-full md:w-auto mt-2 md:mt-0 flex justify-end">
          <button
            type="submit"
            className="bg-[#ffd54f] hover:bg-yellow-400 text-white font-bold py-3 px-6 rounded-md shadow-md w-full md:w-auto transition-all"
          >
            SEARCH
          </button>
        </div>
      </form>
    </div>
  );
};

export default TravelBookingForm;
