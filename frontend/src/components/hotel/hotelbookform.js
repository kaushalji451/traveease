"use client";
import React, { useState } from "react";
import { FaHotel, FaRegCalendarAlt, FaAngleDown } from "react-icons/fa";

const HotelBookingForm = () => {
  const [formData, setFormData] = useState({
    location: "Bangalore",
    country: "India",
    checkInDate: "2025-09-23",
    checkOutDate: "2025-09-24",
    rooms: 1,
    travellers: 2,
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? e.target.checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Hotel Booking Form Submitted:", formData);
  };

  return (
    <div className="w-full min-h-[240px] flex flex-col items-center justify-center bg-[#2E7D32] py-10">
      <div className="w-full max-w-7xl flex flex-col md:flex-row justify-end pt-8 pb-4 px-4 md:px-0">
        <span className="text-white text-lg md:text-2xl font-bold text-center md:text-right">
          Same hotel, Cheapest price. Guaranteed!
        </span>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row items-stretch bg-white rounded-lg shadow-lg w-full max-w-7xl overflow-hidden mx-4 md:mx-0"
      >
        {/* Location */}
        <div className="px-4 py-4 flex flex-col border-b md:border-b-0 md:border-r border-gray-200 min-w-[220px] md:flex-grow">
          <label className="text-xs text-gray-500 font-semibold mb-1 flex items-center gap-1">
            <FaHotel className="text-base text-gray-400" />
            Enter City Name, Location, or Specific hotel
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="font-bold text-xl text-[#212121] outline-none py-1"
            required
          />
          <span className="text-sm text-gray-500">{formData.country}</span>
        </div>

        {/* Check-In */}
        <div className="px-4 py-4 flex flex-col border-b md:border-b-0 md:border-r border-gray-200 min-w-[120px] md:flex-grow">
          <label className="text-xs text-gray-500 font-semibold mb-1 flex items-center gap-1">
            <FaRegCalendarAlt className="text-base text-gray-400" />
            Check-In
          </label>
          <input
            type="date"
            name="checkInDate"
            value={formData.checkInDate}
            onChange={handleChange}
            className="font-bold text-lg text-[#212121] outline-none border-b border-gray-300 py-1"
            required
          />
        </div>

        {/* Check-Out */}
        <div className="px-4 py-4 flex flex-col border-b md:border-b-0 md:border-r border-gray-200 min-w-[120px] md:flex-grow">
          <label className="text-xs text-gray-500 font-semibold mb-1 flex items-center gap-1">
            <FaRegCalendarAlt className="text-base text-gray-400" />
            Check-Out
          </label>
          <input
            type="date"
            name="checkOutDate"
            value={formData.checkOutDate}
            onChange={handleChange}
            className="font-bold text-lg text-[#212121] outline-none border-b border-gray-300 py-1"
            required
          />
        </div>

        {/* Rooms & Guests */}
        <div className="px-4 py-4 flex flex-col justify-center border-b md:border-b-0 md:border-r border-gray-200 min-w-[170px] md:flex-grow">
          <label className="text-xs text-gray-500 font-semibold mb-2">
            Rooms & Guests
          </label>
          <div className="flex items-center gap-3 flex-wrap">
            <input
              type="number"
              name="rooms"
              min={1}
              value={formData.rooms}
              onChange={handleChange}
              className="w-14 font-bold text-lg text-[#212121] border-b border-gray-300 text-center outline-none"
              required
            />
            <span className="text-xs select-none">Room</span>
            <input
              type="number"
              name="travellers"
              min={1}
              value={formData.travellers}
              onChange={handleChange}
              className="w-14 font-bold text-lg text-[#212121] border-b border-gray-300 text-center outline-none"
              required
            />
            <span className="text-xs select-none">Guests</span>
            <FaAngleDown className="text-gray-500" />
          </div>
        </div>

        {/* Search Button */}
        <div className="flex items-center justify-end px-4 py-4 md:py-0 md:flex-shrink-0">
          <button
            type="submit"
            className="w-full md:w-auto bg-[#FFD54F] hover:bg-yellow-400 text-white uppercase font-bold text-lg py-4 rounded-md shadow-md transition-all"
            style={{ minWidth: 150 }}
          >
            SEARCH
          </button>
        </div>
      </form>

      <div className="w-full max-w-7xl flex justify-start px-4 md:px-0 mt-2">
        <h1 className="text-white text-lg md:text-2xl font-bold">
          List Your Hotel For Free
        </h1>
      </div>
    </div>
  );
};

export default HotelBookingForm;
