"use client";
import React, { useState } from "react";

const TravelBookingForm = () => {
  const [formData, setFormData] = useState({
    departure: "",
    departureCode: "",
    destination: "",
    destinationCode: "",
    travelDate: "",
    returnTrip: false,
    nights: 1,
    rooms: 1,
    travellers: 1,
    travelClass: "Economy",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking Form Submitted:", formData);
  };

  return (
    <div className="bg-[#F5F9F6] flex justify-center items-center p-4 md:p-8 ">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 md:p-10 rounded-lg shadow-lg max-w-4xl w-full  space-y-6"
      >
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-center text-[#212121]">
          Plan Your Journey & Stay Together
        </h2>

        {/* Departure & Destination */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-xs text-gray-500">DEPARTURE AIRPORT</p>
            <input
              type="text"
              name="departure"
              value={formData.departure}
              onChange={handleChange}
              placeholder="Delhi"
              className="w-full font-bold text-lg outline-none border-b border-gray-300 text-[#212121]"
              required
            />
            <p className="text-sm text-gray-500">
              [{formData.departureCode || "DEL"}] Indira Gandhi International Airport
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500">DESTINATION AIRPORT</p>
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              placeholder="Mumbai"
              className="w-full font-bold text-lg outline-none border-b border-gray-300 text-[#212121]"
              required
            />
            <p className="text-sm text-gray-500">
              [{formData.destinationCode || "BOM"}] Chhatrapati Shivaji International Airport
            </p>
          </div>
        </div>

        {/* Travel Date */}
        <div>
          <p className="text-xs text-gray-500">TRAVEL DATE</p>
          <input
            type="date"
            name="travelDate"
            value={formData.travelDate}
            onChange={handleChange}
            className="w-full font-bold text-lg outline-none border-b border-gray-300 text-[#212121]"
            required
          />
          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              name="returnTrip"
              checked={formData.returnTrip}
              onChange={handleChange}
              className="accent-[#2E7D32] size-4"
            />
            <span className="text-sm text-gray-600">
              Book a round trip to save more
            </span>
          </div>
        </div>

        {/* Rooms & Nights */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-xs text-gray-500">ROOMS & NIGHTS</p>
            <div className="flex gap-2">
              <input
                type="number"
                name="nights"
                min="1"
                value={formData.nights}
                onChange={handleChange}
                className="w-20 font-bold text-lg outline-none border rounded px-2 text-[#212121]"
              />
              <input
                type="number"
                name="rooms"
                min="1"
                value={formData.rooms}
                onChange={handleChange}
                className="w-20 font-bold text-lg outline-none border rounded px-2 text-[#212121]"
              />
            </div>
            <p className="text-sm text-gray-500">
              {formData.nights} Nights, {formData.rooms} Rooms
            </p>
          </div>

          {/* Guests & Class */}
          <div>
            <p className="text-xs text-gray-500">GUESTS & CLASS</p>
            <div className="flex gap-2">
              <input
                type="number"
                name="travellers"
                min="1"
                value={formData.travellers}
                onChange={handleChange}
                className="w-20 font-bold text-lg outline-none border rounded px-2 text-[#212121]"
              />
              <select
                name="travelClass"
                value={formData.travelClass}
                onChange={handleChange}
                className="font-bold text-lg outline-none border rounded px-2 text-[#212121] bg-white"
              >
                <option value="Economy">Economy</option>
                <option value="Premium Economy">Premium Economy</option>
                <option value="Business">Business</option>
                <option value="First Class">First Class</option>
              </select>
            </div>
            <p className="text-sm text-gray-500">
              {formData.travellers} Traveller(s), {formData.travelClass}
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-[#FFD54F] hover:bg-yellow-400 text-[#212121] font-bold py-3 px-8 rounded-md shadow-md"
          >
            SEARCH
          </button>
        </div>
      </form>
    </div>
  );
};

export default TravelBookingForm;
