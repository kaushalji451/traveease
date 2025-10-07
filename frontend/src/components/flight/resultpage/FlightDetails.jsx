"use client";
import React, { useState } from "react";
import Image from "next/image";
const FlightDetailsTabs = ({ offer, dictionaries, formatTime }) => {
  const [activeTab, setActiveTab] = useState("flightInfo");

  const firstItin = offer.itineraries[0];
  const firstSegment = firstItin.segments[0];

  const fareDetails = {
    passengers: offer.travelerPricings.map((t) => t.travelerType).join(", "),
    baseFare: offer.price.base,
    tax: offer.price.total - offer.price.base,
    total: offer.price.total,
  };

  const baggageInfo = {
    airline: {
      name: dictionaries.carriers?.[firstSegment.carrierCode] || firstSegment.carrierCode,
      logo: dictionaries.carrierLogos?.[firstSegment.carrierCode] || "",
      flightNumber: firstSegment.number,
    },
    checkIn: firstSegment.includedCheckedBags
      ? `${firstSegment.includedCheckedBags.weight}${firstSegment.includedCheckedBags.weightUnit}`
      : "N/A",
    cabin: firstSegment.cabin || "N/A",
    notes: ["Baggage info may vary; check airline."],
  };

  const fareRules = {
    refundable: offer.price.refundable ?? true,
    cancel: { desc: "Check airline policy for cancellation fees" },
    reschedule: { desc: "Check airline policy for reschedule fees" },
    terms: ["Check airline terms and conditions."],
  };

  let uro_to_inr = 104;

  return (
    <div className="max-w-7xl mt-4 mx-auto bg-white rounded-xl shadow border border-slate-300">
      {/* Tabs */}
      <div className="flex overflow-x-auto border-b bg-gray-100 border-slate-400 rounded-xl">
        {[
          { id: "flightInfo", label: "Flight Information" },
          { id: "fareDetails", label: "Fare Details & Rules" },
          { id: "baggageInfo", label: "Baggage Information" },
          { id: "cancellation", label: "Cancellation & Change Rule" },
        ].map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex-shrink-0 py-3 px-4 font-semibold text-center transition-colors ${activeTab === id
                ? "bg-[#6daa5c] text-white rounded-xl"
                : "text-gray-700 hover:bg-gray-200 rounded-xl"
              }`}
            type="button"
          >
            {label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Flight Info */}
        {activeTab === "flightInfo" && (

          <div className="space-y-3 text-gray-700">
            <div className="text-sm font-semibold mb-2">
              {firstSegment.departure.iataCode} &rarr; {firstSegment.arrival.iataCode}
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex  max-md:flex-col min-md:gap-5">
                <Image
                  src={"https://images.unsplash.com/photo-1468530986413-2c93495ed020?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"}
                  alt="Airline logo"
                  width={100}
                  height={100}
                  className="w-15 h-15 rounded-full "
                />
                <div>
                  <div className="font-semibold text-lg">{baggageInfo.airline.name}</div>
                  <div className="text-sm text-gray-500">
                    {firstSegment.number} ({firstSegment.cabin || "Economy"})
                  </div>
                </div>
              </div>

              <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4 text-gray-700 text-sm items-center">
                {/* Departure */}
                <div className="flex flex-col items-center sm:items-start">
                  <div className="font-semibold text-lg">{formatTime(firstSegment.departure.at)}</div>
                  <div className="font-semibold">{firstSegment.departure.iataCode}</div>
                  <div className="text-gray-500 text-xs">{firstSegment.departure.at.split("T")[0]}</div>
                </div>

                {/* Duration */}
                <div className="flex flex-row items-center justify-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3" />
                  </svg>
                  <span className="text-xs text-gray-600">{firstItin.duration.replace("PT", "")}</span>
                </div>

                {/* Arrival */}
                <div className="flex flex-col items-center sm:items-end">
                  <div className="font-semibold text-lg">{formatTime(firstSegment.arrival.at)}</div>
                  <div className="font-semibold">{firstSegment.arrival.iataCode}</div>
                  <div className="text-gray-500 text-xs">
                    {firstSegment.arrival.at.split("T")[0]} <br />
                    Terminal - {firstSegment.arrival.terminal || "—"}
                  </div>
                </div>
              </div>

            </div>
          </div>

        )}

        {/* Fare Details & Rules */}
        {activeTab === "fareDetails" && (
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 text-gray-700">
            <div className="w-full md:w-1/3 border md:border-r p-2 border-slate-300 rounded-2xl pr-4 text-sm">
              <div className="mb-2 font-semibold">{fareDetails.passengers}</div>
              <div className="flex justify-between mb-1">
                <span className="font-semibold">Total (Base Fare)</span>
                <span>{fareDetails.baseFare * uro_to_inr}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>Total Tax</span>
                <span>{Math.floor(fareDetails.tax * uro_to_inr)}</span>
              </div>
              <div className="flex justify-between font-semibold border-t pt-1">
                <span>Total (Fee & Surcharge)</span>
                <span>{fareDetails.total * uro_to_inr}</span>
              </div>
            </div>

            <div className="flex-1 text-sm border  p-4 bg-white  border-slate-300 rounded-2xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">Fare Rules</h3>
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-semibold ${fareRules.refundable ? "text-green-600 border-green-600" : "text-red-600 border-red-600"
                    }`}
                >
                  {fareRules.refundable ? "Refundable" : "Non-Refundable"}
                </span>
              </div>

              <div className="mt-4 text-xs">
                <span className="font-semibold">Terms & Conditions</span>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  {fareRules.terms.map((term, idx) => (
                    <li key={idx}>{term}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Baggage Info */}
        {activeTab === "baggageInfo" && (
          <div className="text-gray-700 text-sm overflow-x-auto">
            <table className="w-full table-auto border border-gray-300 text-left text-sm">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-3 font-semibold w-1/3">Airline</th>
                  <th className="p-3 font-semibold w-1/3">Check-in Baggage</th>
                  <th className="p-3 font-semibold w-1/3">Cabin Baggage</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-300">
                  <td className="p-3 flex items-center space-x-3">
                    <div>
                      <div>{baggageInfo.airline.name}</div>
                      <div className="text-xs text-gray-500">{baggageInfo.airline.flightNumber}</div>
                    </div>
                  </td>
                  <td className="p-3 font-semibold">{baggageInfo.checkIn}</td>
                  <td className="p-3 font-semibold">{baggageInfo.cabin}</td>
                </tr>
              </tbody>
            </table>

            <ul className="text-xs mt-3 space-y-1 list-disc list-inside">
              {baggageInfo.notes.map((note, idx) => (
                <li key={idx}>{note}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Cancellation */}
        {activeTab === "cancellation" && (
          <div className="text-gray-700 text-sm space-y-2">
            <h3 className="font-semibold mb-1">Cancellation & Change Rules</h3>
            <div className="text-xs">{fareRules.cancel.desc}</div>
            <div className="text-xs">{fareRules.reschedule.desc}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightDetailsTabs;
