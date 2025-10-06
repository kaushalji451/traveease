"use client";
import React, { useState } from "react"; // ✅ added useState
import FlightDetails from "./FlightDetails";
import { useRouter } from "next/navigation";

const FlightCard = ({
  offer,
  dictionaries,
  expandedId,
  setExpandedId,
  formatTime,
}) => {
  const seg = offer.itineraries[0].segments[0];
  const router = useRouter();
  const [loading, setLoading] = useState(false); // ✅ boolean, not string

  const handleClick = async () => {
    console.log(offer);
    setLoading(true); // ✅ start loading
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_FLIGHT_URL}/price-offer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            flightOffer: offer,
          }),
        }
      );

      const data = await res.json();
      console.log(data);

      //Generate random 6-digit ID
      const randomId = Math.floor(100000 + Math.random() * 900000);
      const storageKey = `flight${randomId}`;

      //Clear previous flight data
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith("flight")) {
          localStorage.removeItem(key);
        }
      });

      //Save the offer in localStorage with the flight ID
      localStorage.setItem(storageKey, JSON.stringify(offer));

      //Redirect with ID as query param
      router.push(`/FlightCheckOut?id=${storageKey}`);
    } catch (err) {
      console.log("some error occ", err);
      setLoading(false); // ✅ reset if error occurs
    }
  };

  return (
    <div
      key={offer.id}
      className="bg-white rounded-xl shadow-lg p-6 mb-6 transition hover:shadow-2xl"
    >
      <div className="flex flex-col md:flex-row md:items-center  md:justify-between">
        {/* Airline Info */}
        <div className="flex items-center mb-4 md:mb-0 ">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-3  text-xl font-bold text-blue-700">
            {seg.carrierCode}
          </div>
          <div>
            <div className="font-bold text-lg">
              {dictionaries.carriers?.[seg.carrierCode] ?? seg.carrierCode}
            </div>
            <div className="text-sm text-gray-500">
              Flight {seg.number} ({offer.validatingAirlineCodes.join(", ")})
            </div>
            <div className="text-xs text-gray-500">
              {dictionaries.aircraft?.[seg.aircraft.code]}
            </div>
          </div>
        </div>

        {/* Depart / Duration / Arrive / Price */}
        <div className="flex md:items-center flex-1 mb-4  justify-around">
          <div>
            <div className="text-xl max-sm:text-sm  font-bold">{formatTime(seg.departure.at)}</div>
            <div className="text-sm  max-sm:text-xs text-center text-gray-500">
              {seg.departure.iataCode}
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-sm max-sm:text-xs font-bold text-gray-600">
              <p className="border-b text-center pb-1 ">
                {offer.itineraries[0].duration.replace("PT", "")}
              </p>
              <p className="text-center">
                {seg.numberOfStops === 0 ? "Non-stop" : `${seg.numberOfStops} stop(s)`}
              </p>
            </div>
          </div>
          <div>
            <div className="text-xl max-sm:text-sm text-center font-bold">{formatTime(seg.arrival.at)}</div>
            <div className="text-sm max-sm:text-xs text-center text-gray-500">
              {seg.arrival.iataCode}
            </div>
          </div>
          <div className="text-2xl hidden md:block font-bold text-black ">
            {offer.price.total} {offer.price.currency}
          </div>
        </div>

        {/* Buttons / price */}
        <div className="flex justify-around items-center">
          <div className="text-2xl font-bold text-black block md:hidden">
            {offer.price.total} {offer.price.currency}
          </div>
          <div className="flex flex-col">
            <button
              onClick={handleClick}
              disabled={loading} // ✅ disable when loading
              className={`px-4 py-2 mt-2 rounded-lg font-semibold shadow ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#6DAA5C] text-white hover:bg-[#5c954f]"
              }`}
            >
              {loading ? "Loading..." : "Book Now"} {/* ✅ show loading */}
            </button>
            <button
              className="mt-2 text-xs text-[#6DAA5C] hover:underline"
              onClick={() =>
                setExpandedId(expandedId === offer.id ? null : offer.id)
              }
            >
              {expandedId === offer.id ? "Hide Details" : "View Details"}
            </button>
          </div>
        </div>
      </div>

      {/* Expandable Details */}
      {expandedId === offer.id && (
        <FlightDetails
          offer={offer}
          dictionaries={dictionaries}
          formatTime={formatTime}
        />
      )}
    </div>
  );
};

export default FlightCard;
