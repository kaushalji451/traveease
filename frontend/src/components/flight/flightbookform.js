"use client";
import React, { useState } from "react";
import { FaExchangeAlt } from "react-icons/fa";

const Flightbookform = () => {
  const [tripType, setTripType] = useState("oneway");
  const [formData, setFormData] = useState({
    from: "Delhi",
    to: "Mumbai",
    departure: "",
    returnDate: "",
    travellers: 1,
    travelClass: "Economy",
    specialFare: "",
    hotelOffer: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
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
    console.log("Form submitted:", formData);
  };

  return (
    <div className="bg-[#2E7D32] flex justify-center items-center p-4 md:p-8">
      <form
        onSubmit={handleSubmit}
        className="p-6 md:p-10 max-w-7xl w-full"
      >
        {/* Trip Type Selection */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6 text-[#212121] font-semibold">
          <div className="flex gap-3 flex-wrap">
            {["oneway", "roundtrip", "multicity"].map((type) => (
              <button
                type="button"
                key={type}
                onClick={() => setTripType(type)}
                className={`px-4 py-2 rounded-full transition ${
                  tripType === type
                    ? "bg-[#2E7D32] text-white"
                    : "bg-[#66BB6A] text-white hover:bg-[#2E7D32]"
                }`}
              >
                {type === "oneway"
                  ? "One Way"
                  : type === "roundtrip"
                  ? "Round Trip"
                  : "Multicity"}
              </button>
            ))}
          </div>
          <p className="text-lg text-white md:text-2xl font-bold mt-2 md:mt-0">
            Search Lowest Price
          </p>
        </div>

        {/* Main Search Box */}
        <div className="bg-[#F5F9F6] rounded-xl shadow-inner flex flex-wrap items-center justify-start gap-4 p-4">
          {/* From */}
          <div className="flex-1 min-w-[180px] w-full sm:w-auto">
            <p className="text-xs text-gray-500">FROM</p>
            <input
              type="text"
              name="from"
              value={formData.from}
              onChange={handleChange}
              placeholder="Enter city"
              className="w-full font-bold text-lg outline-none bg-transparent text-[#212121]"
            />
          </div>

          {/* Swap Icon */}
          <div
            onClick={handleSwap}
            className="px-2 text-gray-500 cursor-pointer hover:text-[#2E7D32]"
          >
            <FaExchangeAlt size={20} />
          </div>

          {/* To */}
          <div className="flex-1 min-w-[180px] w-full sm:w-auto">
            <p className="text-xs text-gray-500">TO</p>
            <input
              type="text"
              name="to"
              value={formData.to}
              onChange={handleChange}
              placeholder="Enter city"
              className="w-full font-bold text-lg outline-none bg-transparent text-[#212121]"
            />
          </div>

          {/* Departure Date */}
          <div className="flex-1 min-w-[150px] w-full sm:w-auto">
            <p className="text-xs text-gray-500">DEPARTURE DATE</p>
            <input
              type="date"
              name="departure"
              value={formData.departure}
              onChange={handleChange}
              className="w-full font-bold text-lg outline-none bg-transparent text-[#212121]"
              required
            />
          </div>

          {/* Return Date */}
          {tripType === "roundtrip" && (
            <div className="flex-1 min-w-[150px] w-full sm:w-auto">
              <p className="text-xs text-gray-500">RETURN DATE</p>
              <input
                type="date"
                name="returnDate"
                value={formData.returnDate}
                onChange={handleChange}
                className="w-full font-bold text-lg outline-none bg-transparent text-[#212121]"
                required
              />
            </div>
          )}

          {/* Traveller & Class */}
          <div className="flex-1 min-w-[150px] w-full sm:w-auto">
            <p className="text-xs text-gray-500">TRAVELLER & CLASS</p>
            <div className="flex gap-2 flex-wrap">
              <input
                type="number"
                name="travellers"
                min="1"
                value={formData.travellers}
                onChange={handleChange}
                className="w-14 font-bold text-lg outline-none border rounded px-2 text-[#212121]"
              />
              <select
                name="travelClass"
                value={formData.travelClass}
                onChange={handleChange}
                className="border rounded px-2 bg-white text-[#212121]"
              >
                <option>Economy</option>
                <option>Premium Economy</option>
                <option>Business</option>
                <option>First Class</option>
              </select>
            </div>
          </div>

          {/* Search Button */}
          <div className="w-full sm:w-auto flex justify-end mt-2 sm:mt-0">
            <button
              type="submit"
              className="bg-[#FFD54F] hover:bg-yellow-400 text-[#212121] font-bold py-3 px-6 rounded-md shadow-md"
            >
              SEARCH
            </button>
          </div>
        </div>

        {/* Special Fares */}
        <div className="flex flex-col lg:flex-row flex-wrap gap-6 mt-6 text-[#fff]">
          <p className="font-semibold text-lg">Special Fares (Optional):</p>
          {["Defence Forces", "Students", "Senior Citizens", "Doctors Nurses"].map(
            (fare, idx) => (
              <label key={idx} className="flex items-center gap-2 text-md">
                <input
                  type="radio"
                  name="specialFare"
                  value={fare}
                  checked={formData.specialFare === fare}
                  onChange={handleChange}
                  className="accent-[#2E7D32] size-4"
                />
                {fare}
              </label>
            )
          )}
        </div>

        {/* Hotel Offer */}
        <div className="flex items-center gap-2 mt-4 text-[#fff]">
          <input
            type="checkbox"
            name="hotelOffer"
            checked={formData.hotelOffer}
            onChange={handleChange}
            className="accent-[#2E7D32] size-4"
          />
          <span className="text-md">
            Book Hotel & Get up to <strong>45% OFF*</strong>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Flightbookform;
