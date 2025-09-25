"use client";
import React from "react";
import FlightDetails from "./FlightDetails";

const FlightCard = ({
  offer,
  dictionaries,
  expandedId,
  setExpandedId,
  formatTime,
}) => {
  const seg = offer.itineraries[0].segments[0];

  return (
    <div
      key={offer.id}
      className="bg-white rounded-xl shadow-lg p-6 mb-6 transition hover:shadow-2xl"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        {/* Airline Info */}
        <div className="flex items-center mb-4 md:mb-0">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-3 text-xl font-bold text-blue-700">
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

        {/* Depart / Duration / Arrive */}
        <div className="flex flex-col md:flex-row md:items-center flex-1 gap-6 justify-center md:justify-start">
          <div>
            <div className="text-xl font-bold">{formatTime(seg.departure.at)}</div>
            <div className="text-sm text-gray-500">
              {seg.departure.iataCode} Terminal {seg.departure.terminal}
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-sm font-bold text-gray-600">
              {offer.itineraries[0].duration.replace("PT", "")} <span className="mx-1">&middot;</span>{" "}
              {seg.numberOfStops === 0 ? "Non-stop" : `${seg.numberOfStops} stop(s)`}
            </div>
          </div>
          <div>
            <div className="text-xl font-bold">{formatTime(seg.arrival.at)}</div>
            <div className="text-sm text-gray-500">
              {seg.arrival.iataCode} Terminal {seg.arrival.terminal}
            </div>
          </div>
        </div>

        {/* Price & Buttons */}
        <div className="flex flex-col items-end">
          <div className="text-2xl font-bold text-blue-700">
            {offer.price.total} {offer.price.currency}
          </div>
          <button className="px-4 py-2 mt-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700">
            Book Now
          </button>
          <button
            className="mt-2 text-xs text-blue-600 hover:underline"
            onClick={() => setExpandedId(expandedId === offer.id ? null : offer.id)}
          >
            {expandedId === offer.id ? "Hide Details" : "View Details"}
          </button>
        </div>
      </div>

      {/* Expandable Details */}
      {expandedId === offer.id && (
        <FlightDetails offer={offer} dictionaries={dictionaries} formatTime={formatTime} />
      )}
    </div>
  );
};

export default FlightCard;
