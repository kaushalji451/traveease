"use client";
import React, { useState } from "react";
import { FaExchangeAlt } from "react-icons/fa";

const Busbookform = () => {
  const [formData, setFormData] = useState({
    from: "Delhi",
    to: "Jaipur",
    date: "",
    travellers: 1,
  });

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // swap from ↔ to
  const handleSwap = () => {
    setFormData({
      ...formData,
      from: formData.to,
      to: formData.from,
    });
  };

  // submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Bus booking submitted:", formData);
  };

  return (
    <div className="bg-[#2E7D32] flex justify-center items-center p-4 md:p-8">
      <form
        onSubmit={handleSubmit}
        className=" p-6 md:p-10 max-w-5xl w-full"
      >
        {/* Title */}
        <div className="flex justify-between items-center mb-6 text-[#fff] font-semibold">
          <p className="text-lg md:text-2xl font-bold w-full text-center">
            Book Your Bus Tickets
          </p>
        </div>

        {/* Main Search Box */}
        <div className="bg-[#F5F9F6] rounded-xl shadow-inner flex flex-wrap items-center justify-between p-4 gap-4">
          {/* From */}
          <div className="flex-1 min-w-[180px]">
            <p className="text-xs text-gray-500">FROM</p>
            <input
              type="text"
              name="from"
              value={formData.from}
              onChange={handleChange}
              placeholder="Enter city"
              className="w-full font-bold text-lg outline-none bg-transparent text-[#212121]"
              required
            />
          </div>

          {/* Swap */}
          <div
            onClick={handleSwap}
            className="px-2 text-gray-500 cursor-pointer hover:text-[#2E7D32]"
          >
            <FaExchangeAlt size={20} />
          </div>

          {/* To */}
          <div className="flex-1 min-w-[180px]">
            <p className="text-xs text-gray-500">TO</p>
            <input
              type="text"
              name="to"
              value={formData.to}
              onChange={handleChange}
              placeholder="Enter city"
              className="w-full font-bold text-lg outline-none bg-transparent text-[#212121]"
              required
            />
          </div>

          {/* Date */}
          <div className="flex-1 min-w-[150px]">
            <p className="text-xs text-gray-500">TRAVEL DATE</p>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full font-bold text-lg outline-none bg-transparent text-[#212121]"
              required
            />
          </div>

          {/* Travellers */}
          <div className="flex-1 min-w-[100px]">
            <p className="text-xs text-gray-500">TRAVELLERS</p>
            <input
              type="number"
              name="travellers"
              min="1"
              value={formData.travellers}
              onChange={handleChange}
              className="w-20 font-bold text-lg outline-none border rounded px-2 text-[#212121]"
              required
            />
          </div>

          {/* Search Button */}
          <div className="flex justify-center mt-4 lg:mt-0">
            <button
              type="submit"
              className="bg-[#FFD54F] hover:bg-yellow-400 text-[#212121] font-bold py-3 px-6 rounded-md shadow-md"
            >
              SEARCH
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Busbookform;
