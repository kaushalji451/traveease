"use client";
import React, { useState } from "react";
import { FaExchangeAlt, FaPlane } from "react-icons/fa";
import { useRouter } from "next/navigation";
import indianAirports from "./indiaairportdata";

const Flightbookform = () => {
  const router = useRouter();
  const [tripType, setTripType] = useState("oneway");
  const [formData, setFormData] = useState({
    from: "DEL",
    to: "BOM",
    departure: "",
    returnDate: "",
    travellers: 1,
    travelClass: "ECONOMY",
    specialFare: "",
  });

  const [fromQuery, setFromQuery] = useState("");
  const [toQuery, setToQuery] = useState("");
  const [fromResults, setFromResults] = useState([]);
  const [toResults, setToResults] = useState([]);

  const handleSwap = () => {
    setFormData({
      ...formData,
      from: formData.to,
      to: formData.from,
    });
  };

  const handleAirportSelect = (type, airport) => {
    setFormData({
      ...formData,
      [type]: airport.code,
    });
    if (type === "from") {
      setFromQuery(`${airport.city} (${airport.code})`);
      setFromResults([]);
    } else {
      setToQuery(`${airport.city} (${airport.code})`);
      setToResults([]);
    }
  };

  const searchAirports = (query, setResults) => {
    if (!query) return setResults([]);
    const results = indianAirports.filter(
      (airport) =>
        airport.city.toLowerCase().includes(query.toLowerCase()) ||
        airport.name.toLowerCase().includes(query.toLowerCase()) ||
        airport.code.toLowerCase().includes(query.toLowerCase())
    );
    setResults(results.slice(0, 8));
  };

  // ✅ Navigate to results page with query params
  const handleSubmit = (e) => {
    e.preventDefault();
    const query = new URLSearchParams({
      from: formData.from,
      to: formData.to,
      date: formData.departure,
      returnDate: formData.returnDate || "",
      adults: formData.travellers.toString(),
      class: formData.travelClass,
      specialFare: formData.specialFare || "",
      tripType: tripType,
    });

    router.push(`/FlightList?${query.toString()}`);
  };

  return (
    <div className="bg-gradient-to-b from-[#6DAA5C] via-[#7FBF6D] to-[#98D487] flex justify-center items-center p-4 md:p-8">
      <form onSubmit={handleSubmit} className="p-6 md:p-10 max-w-7xl w-full">
        {/* Trip Type & Title */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6 text-[#212121] font-semibold">
          <div className="flex gap-3 flex-wrap">
            {["oneway", "roundtrip", "multicity"].map((type) => (
              <button
                type="button"
                key={type}
                onClick={() => setTripType(type)}
                className={`px-4 py-2 rounded-full transition ${tripType !== type
                    ? "hover:bg-[#A8E6A1] text-white"
                    : "bg-[#93de8b] text-white"
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

        {/* Airports, Dates, Traveller & Class */}
        <div className="bg-[#F5F9F6] rounded-xl shadow-inner flex flex-wrap items-center justify-start gap-4 p-4">
          {/* From */}
          <div className="flex-1 min-w-[180px] relative">
            <p className="text-xs text-gray-500">FROM</p>
            <input
              type="text"
              value={fromQuery}
              onChange={(e) => {
                setFromQuery(e.target.value);
                searchAirports(e.target.value, setFromResults);
              }}
              placeholder="Enter city or airport"
              className="w-full font-bold text-lg outline-none bg-transparent text-[#212121]"
            />
            {fromResults.length > 0 && (
              <ul className="absolute bg-white border rounded w-full mt-1 max-h-60 overflow-y-auto z-10 shadow-lg">
                {fromResults.map((airport) => (
                  <li
                    key={airport.code}
                    onClick={() => handleAirportSelect("from", airport)}
                    className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-gray-100"
                  >
                    <div className="flex items-center gap-2 flex-1">
                      <FaPlane className="text-gray-400 text-xl" />
                      <div>
                        <div className="font-semibold text-md text-[#212121]">
                          {airport.city} <span className="font-bold">({airport.code})</span>
                        </div>
                        <div className="text-xs text-gray-600">{airport.name}</div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 pl-2">
                      {airport.country || "India"}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Swap */}
          <div
            onClick={handleSwap}
            className="px-2 text-gray-500 cursor-pointer hover:text-[#A8E6A1]"
          >
            <FaExchangeAlt size={20} />
          </div>

          {/* To */}
          <div className="flex-1 min-w-[180px] relative">
            <p className="text-xs text-gray-500">TO</p>
            <input
              type="text"
              value={toQuery}
              onChange={(e) => {
                setToQuery(e.target.value);
                searchAirports(e.target.value, setToResults);
              }}
              placeholder="Enter city or airport"
              className="w-full font-bold text-lg outline-none bg-transparent text-[#212121]"
            />
            {toResults.length > 0 && (
              <ul className="absolute bg-white border rounded w-full mt-1 max-h-60 overflow-y-auto z-10 shadow-lg">
                {toResults.map((airport) => (
                  <li
                    key={airport.code}
                    onClick={() => handleAirportSelect("to", airport)}
                    className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-gray-100"
                  >
                    <div className="flex items-center gap-2 flex-1">
                      <FaPlane className="text-gray-400 text-xl" />
                      <div>
                        <div className="font-semibold text-md text-[#212121]">
                          {airport.city} <span className="font-bold">({airport.code})</span>
                        </div>
                        <div className="text-xs text-gray-600">{airport.name}</div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 pl-2">
                      {airport.country || "India"}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Dates */}
          <div className="flex-1 min-w-[150px]">
            <p className="text-xs text-gray-500">DEPARTURE DATE</p>
            <input
              type="date"
              value={formData.departure}
              onChange={(e) =>
                setFormData({ ...formData, departure: e.target.value })
              }
              className="w-full font-bold text-lg outline-none bg-transparent text-[#212121]"
              required
            />
          </div>
          {tripType === "roundtrip" && (
            <div className="flex-1 min-w-[150px]">
              <p className="text-xs text-gray-500">RETURN DATE</p>
              <input
                type="date"
                value={formData.returnDate}
                onChange={(e) =>
                  setFormData({ ...formData, returnDate: e.target.value })
                }
                className="w-full font-bold text-lg outline-none bg-transparent text-[#212121]"
                required
              />
            </div>
          )}

          {/* Travellers & Class */}
          <div className="flex-1 min-w-[150px]">
            <p className="text-xs text-gray-500">TRAVELLER & CLASS</p>
            <div className="flex gap-2 flex-wrap">
              <input
                type="number"
                min="1"
                value={formData.travellers}
                onChange={(e) =>
                  setFormData({ ...formData, travellers: e.target.value })
                }
                className="w-14 font-bold text-lg outline-none border rounded px-2 text-[#212121]"
              />
              <select
                value={formData.travelClass}
                onChange={(e) =>
                  setFormData({ ...formData, travelClass: e.target.value })
                }
                className="border rounded px-2 bg-white text-[#212121]"
              >
                <option value="ECONOMY">Economy</option>
                <option value="BUSINESS">Business</option>
                <option value="FIRST">First Class</option>
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
      </form>
    </div>
  );
};

export default Flightbookform;
