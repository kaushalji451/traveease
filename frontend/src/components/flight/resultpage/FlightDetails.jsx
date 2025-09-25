"use client";
import React from "react";

const FlightDetails = ({ offer, dictionaries, formatTime }) => {
  return (
    <div className="mt-4 border-t pt-4 space-y-4 bg-gray-50 rounded">
      {/* Itineraries */}
      <div>
        <div className="font-semibold text-gray-700 mb-2">Itinerary Details</div>
        {offer.itineraries.map((itin, i) => (
          <div key={i} className="p-3 mb-2 bg-white rounded border">
            <div className="text-sm mb-1">
              <strong>Duration:</strong> {itin.duration.replace("PT", "")}
            </div>
            {itin.segments.map((s, j) => (
              <div key={j} className="mb-2 p-2 rounded bg-gray-50 border">
                <div className="text-sm">
                  <strong>Flight No:</strong> {s.number}
                </div>
                <div className="text-sm">
                  <strong>Carrier:</strong>{" "}
                  {dictionaries.carriers?.[s.carrierCode] ?? s.carrierCode}
                </div>
                <div className="text-sm">
                  <strong>Departure:</strong> {formatTime(s.departure.at)}{" "}
                  {s.departure.iataCode} Terminal {s.departure.terminal}
                </div>
                <div className="text-sm">
                  <strong>Arrival:</strong> {formatTime(s.arrival.at)}{" "}
                  {s.arrival.iataCode} Terminal {s.arrival.terminal}
                </div>
                <div className="text-xs text-gray-500">
                  <strong>Aircraft:</strong>{" "}
                  {dictionaries.aircraft?.[s.aircraft.code]}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Pricing */}
      <div>
        <div className="font-semibold text-gray-700 mb-2">Pricing</div>
        <div className="text-sm">
          Base fare: {offer.price.base} {offer.price.currency}
        </div>
        <div className="text-sm">
          Total: {offer.price.total} {offer.price.currency}
        </div>
        <div className="text-sm">
          Grand Total: {offer.price.grandTotal} {offer.price.currency}
        </div>
        {offer.price.fees?.length > 0 && (
          <ul className="text-xs mt-1">
            {offer.price.fees.map((fee, idx) => (
              <li key={idx}>
                {fee.type}: {fee.amount} {offer.price.currency}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Traveler Pricing */}
      <div>
        <div className="font-semibold text-gray-700 mb-2">Traveler Pricing</div>
        {offer.travelerPricings.map((trav, tIdx) => (
          <div
            key={tIdx}
            className="border p-2 rounded bg-white mb-2"
          >
            <div className="text-sm">
              <strong>Type:</strong> {trav.travelerType}
            </div>
            <div className="text-xs">
              <strong>Class:</strong> {trav.cabin} ({trav.class})
            </div>
            <div className="text-xs">
              <strong>Branded Fare:</strong> {trav.brandedFareLabel}
            </div>
            <div className="text-xs">
              <strong>Checked Bags:</strong>{" "}
              {trav.fareDetailsBySegment[0].includedCheckedBags.weight}{" "}
              {trav.fareDetailsBySegment[0].includedCheckedBags.weightUnit}
            </div>
            <div className="text-xs">
              <strong>Amenities:</strong>{" "}
              {trav.fareDetailsBySegment[0].amenities.map((a) => (
                <span key={a.description} className="mr-2">
                  {a.description}
                  {a.isChargeable ? " (Paid)" : ""}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlightDetails;
