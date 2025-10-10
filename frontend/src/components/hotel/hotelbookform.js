"use client";
import React, { useState } from "react";
import { FaHotel, FaRegCalendarAlt, FaAngleDown } from "react-icons/fa";
import IndianCityData from "./indiancitydata";
import { useRouter } from "next/navigation";

const HotelBookingForm = () => {
  const router = useRouter();
  const today = new Date().toISOString().split("T")[0];
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    location: "",
    code: "BLR",
    checkIn: today,
    checkOut: "",
    adults: 2,
    children: 0,
  });

  const [locationQuery, setLocationQuery] = useState(formData.location);
  const [locationResults, setLocationResults] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // City search
  const searchCities = (query) => {
    if (!query) {
      setLocationResults([]);
      return;
    }
    const results = IndianCityData.filter((item) =>
      item.city.toLowerCase().includes(query.toLowerCase())
    );
    setLocationResults(results.slice(0, 8));
  };

  const handleCitySelect = (cityObj) => {
    setFormData({
      ...formData,
      location: cityObj.city,
      code: cityObj.code,
    });
    setLocationQuery(`${cityObj.city} (${cityObj.code})`);
    setLocationResults([]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGuests = (type, delta) => {
    setFormData((prev) => {
      let newValue = prev[type] + delta;
      if (type === "adults" && newValue < 1) newValue = 1;
      if (type === "children" && newValue < 0) newValue = 0;
      return { ...prev, [type]: newValue };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const occupancy = JSON.stringify([
      { rooms: 1, adults: formData.adults, children: formData.children },
    ]);
    const query = new URLSearchParams({
      destinationCode: formData.code,
      checkIn: formData.checkIn,
      checkOut: formData.checkOut,
      occupancy,
    });
    setLoading(false);
    router.push(`/HotelList?${query.toString()}`);
  };

  const roomsLabel = `1 Room, ${formData.adults + formData.children} Guests`;

  return (
    <div className="w-full min-h-[240px] flex flex-col items-center justify-center bg-gradient-to-b from-[#6DAA5C] via-[#7FBF6D] to-[#98D487] py-10">
      {/* Header */}
      <div className="w-full max-w-7xl flex flex-col md:flex-row justify-end pt-8 pb-4 px-4 md:px-0">
        <span className="text-white text-lg md:text-2xl font-bold text-center md:text-right">
          Same hotel, Cheapest price. Guaranteed!
        </span>
      </div>

      {/* Main Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row items-stretch bg-white rounded-lg shadow-lg w-full max-w-7xl mx-4 md:mx-0"
      >
        {/* Location */}
        <div className="flex-1 min-w-[220px] relative px-4 py-4 border-b md:border-b-0 md:border-r border-gray-200">
          <p className="text-xs text-gray-500 flex items-center gap-1 mb-1">
            <FaHotel className="text-base text-gray-400" />
            Enter City Name
          </p>
          <input
            type="text"
            name="location"
            value={locationQuery}
            onChange={(e) => {
              setLocationQuery(e.target.value);
              searchCities(e.target.value);
            }}
            placeholder="Enter city"
            className="w-full font-bold text-lg outline-none bg-transparent text-[#212121] py-1"
            required
          />

          {locationResults.length > 0 && (
            <ul className="absolute bg-white border rounded w-full mt-1 max-h-60 overflow-y-auto z-10 shadow-lg">
              {locationResults.map((city) => (
                <li
                  key={city.code}
                  onClick={() => handleCitySelect(city)}
                  className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-gray-100"
                >
                  <div className="flex items-center gap-2 flex-1">
                    <FaHotel className="text-gray-400 text-lg" />
                    <div>
                      <div className="font-semibold text-md text-[#212121]">
                        {city.city} <span className="font-bold">({city.code})</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 pl-2">India</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Check-In */}
        <div className="px-4 py-4 flex flex-col border-b md:border-b-0 md:border-r border-gray-200 min-w-[120px] md:flex-grow">
          <label className="text-xs text-gray-500 font-semibold mb-1 flex items-center gap-1">
            <FaRegCalendarAlt className="text-base text-gray-400" />
            Check-In
          </label>
          <input
            type="date"
            name="checkIn"
            value={formData.checkIn}
            onChange={handleChange}
            min={today}
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
            name="checkOut"
            value={formData.checkOut}
            onChange={handleChange}
            min={formData.checkIn}
            className="font-bold text-lg text-[#212121] outline-none border-b border-gray-300 py-1"
            required
          />
        </div>

        {/* Guests */}
        <div className="px-4 py-4 flex flex-col justify-center border-b md:border-b-0 md:border-r border-gray-200 min-w-[170px] md:flex-grow relative">
          <label className="text-xs text-gray-500 font-semibold mb-2">
            Rooms & Guests
          </label>
          <div
            className="flex items-center gap-3 flex-wrap p-2 pl-3 bg-gray-50 rounded border border-gray-300 min-w-[140px] cursor-pointer"
            onClick={() => setDropdownOpen((open) => !open)}
          >
            <span className="font-bold select-none">{roomsLabel}</span>
            <FaAngleDown className="text-gray-500" />
          </div>

          {dropdownOpen && (
            <div className="absolute z-[999] left-0 mt-2 bg-white border border-gray-300 shadow-2xl rounded-lg p-4 min-w-[250px] w-[320px] top-[100%]"
            >
              <div className="flex items-center justify-between mb-2">
                <span>
                  Adult <br />
                  <span className="text-xs text-gray-400">(Above 12 years)</span>
                </span>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => handleGuests("adults", -1)}
                    className="px-2 py-1 border border-slate-300 text-lg rounded-l text-gray-700 bg-gray-100"
                    disabled={formData.adults <= 1}
                  >
                    -
                  </button>
                  <span className="px-4">{formData.adults}</span>
                  <button
                    type="button"
                    onClick={() => handleGuests("adults", 1)}
                    className="px-2 py-1 border border-slate-300 text-lg rounded-r text-gray-700 bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span>
                  Child <br />
                  <span className="text-xs text-gray-400">(Below 12 years)</span>
                </span>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => handleGuests("children", -1)}
                    className="px-2 py-1 border border-slate-300 text-lg rounded-l text-gray-700 bg-gray-100"
                    disabled={formData.children <= 0}
                  >
                    -
                  </button>
                  <span className="px-4">{formData.children}</span>
                  <button
                    type="button"
                    onClick={() => handleGuests("children", 1)}
                    className="px-2 py-1 border border-slate-300 text-lg rounded-r text-gray-700 bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex justify-end mt-2">
                <button
                  type="button"
                  onClick={() => setDropdownOpen(false)}
                  className="bg-[#FFD54F] hover:bg-yellow-400 text-white rounded px-6 py-1"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Search Button */}
        <div className="flex items-center justify-end px-4 py-4 md:py-0 md:flex-shrink-0">
          <button
            type="submit"
            disabled={loading}
            className="w-full md:w-auto bg-[#6daa5c] hover:bg-[#66c44b] text-white uppercase font-bold text-lg py-4 rounded-md shadow-md transition-all"
            style={{ minWidth: 150 }}
          >
            {loading ? "Loading..." : "Search"}
          </button>
        </div>
      </form>

      {/* Footer */}
      <div className="w-full max-w-7xl flex justify-start px-4 md:px-0 mt-2">
        <h1 className="text-white text-lg md:text-2xl font-bold">
          List Your Hotel For Free
        </h1>
      </div>
    </div>
  );
};

export default HotelBookingForm;
