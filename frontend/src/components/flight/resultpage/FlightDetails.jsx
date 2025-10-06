"use client";
import React, { useState } from "react";

const FlightDetailsTabs = ({ offer, dictionaries, formatTime }) => {
  const [activeTab, setActiveTab] = useState("flightInfo");

  // Extract first itinerary & segment for Flight Information demo
  const firstItin = offer.itineraries[0];
  const firstSegment = firstItin.segments[0];

  // Pricing from props
  const fareDetails = {
    passengers: offer.travelerPricings.map((t) => t.travelerType).join(", "),
    baseFare: offer.price.base,
    tax: offer.price.total - offer.price.base, // or offer.price.tax if available
    total: offer.price.total,
  };

  // Baggage info from first traveler (you can adjust for multiple travelers)
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
    notes: [
      "Baggage information is obtained from airline's reservation system; accuracy not guaranteed.",
    ],
  };

  // Fare rules example: You can customize this based on offer.fareRules if available
  const fareRules = {
    refundable: offer.price.refundable ?? true,
    cancel: {
      desc: "Check airline policy for cancellation fees",
      airlineFee: "Varies",
      emtFee: "Varies",
    },
    reschedule: {
      desc: "Check airline policy for reschedule fees",
      airlineFee: "Varies",
      emtFee: "Varies",
    },
    terms: ["Check airline terms and conditions."],
  };

  return (
    <div className="max-w-7xl mt-4 mx-auto bg-white rounded-xl shadow  border border-slate-300 ">
      {/* Tabs */}
      <div className="flex border-b bg-gray-100  border-slate-400 rounded-xl mx-4">
        {[
          { id: "flightInfo", label: "Flight Information" },
          { id: "fareDetails", label: "Fare Details & Rules" },
          { id: "baggageInfo", label: "Baggage Information" },
          { id: "cancellation", label: "Cancellation & Change Rule" },
        ].map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex-1 py-3 text-center font-semibold  last:border-r-0 transition-colors ${activeTab === id
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
        {/* Flight Information Tab */}
        {activeTab === "flightInfo" && (
          <div className="space-y-3 text-gray-700">
            <div className="text-sm font-semibold mb-2">
              {firstSegment.departure.iataCode} &rarr; {firstSegment.arrival.iataCode}
            </div>

            <div className="flex items-center space-x-6">
              <img
                src={"https://images.unsplash.com/photo-1468530986413-2c93495ed020?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"}
                alt="Airline logo"
                className="w-15 h-15 rounded-full "
              />
              <div>
                <div className="font-semibold text-lg">{baggageInfo.airline.name}</div>
                <div className="text-sm text-gray-500">
                  {firstSegment.number} ({firstSegment.cabin || "Economy"})
                </div>
              </div>

              <div className="flex-1 grid grid-cols-3 text-sm text-center text-gray-700">
                <div>
                  <div className="font-semibold text-lg">{formatTime(firstSegment.departure.at)}</div>
                  <div className="font-semibold">{firstSegment.departure.iataCode}</div>
                  <div className="text-gray-500">{firstSegment.departure.at.split("T")[0]}</div>
                </div>
                <div className="flex flex-col justify-center items-center space-y-1 text-gray-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3" />
                  </svg>
                  <div className="text-xs">{firstItin.duration.replace("PT", "")}</div>
                </div>
                <div>
                  <div className="font-semibold text-lg">{formatTime(firstSegment.arrival.at)}</div>
                  <div className="font-semibold">{firstSegment.arrival.iataCode}</div>
                  <div className="text-gray-500">
                    {firstSegment.arrival.at.split("T")[0]} <br />
                    Terminal - {firstSegment.arrival.terminal || "—"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Fare Details & Rules Tab */}
        {activeTab === "fareDetails" && (
          <div className="flex space-x-6 text-gray-700">
            <div className="w-1/3 border-r pr-4 text-sm">
              <div className="mb-2 font-semibold">{fareDetails.passengers}</div>
              <div className="flex justify-between mb-1">
                <span className="font-semibold">Total (Base Fare)</span>
                <span>{fareDetails.baseFare}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>Total Tax</span>
                <span>{fareDetails.tax}</span>
              </div>
              <div className="flex justify-between font-semibold border-t pt-1">
                <span>Total (Fee & Surcharge)</span>
                <span>{fareDetails.total}</span>
              </div>
            </div>

            <div className="flex-1 text-sm border rounded p-4 bg-white">
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

        {/* Baggage Information Tab */}
        {activeTab === "baggageInfo" && (
          <div className="text-gray-700 text-sm">
            <table className="w-full table-fixed border border-gray-300 text-left text-sm">
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
                    <img
                      src={baggageInfo.airline.logo}
                      alt="Airline Logo"
                      className="w-10 h-10 object-contain"
                    />
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

        {/* Cancellation & Change Rule Tab */}
        {activeTab === "cancellation" && (
          <div className="text-gray-700 text-sm">
            <h3 className="font-semibold mb-3">Cancellation & Change Rules</h3>
            <div className="text-xs">{fareRules.cancel.desc}</div>
            <div className="text-xs">{fareRules.reschedule.desc}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightDetailsTabs;
