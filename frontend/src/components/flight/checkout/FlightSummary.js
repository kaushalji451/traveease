import React from "react";
import { formatDate, formatDuration } from "@/utils/dateUtils";

export default function FlightSummary({ itinerary }) {
  if (!itinerary) return null;
  const seg = itinerary.segments[0];
  return (
    <div className="p-5 border-b border-gray-200 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="bg-[#6daa5c] rounded p-2 text-white flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 19.5 9 12l-6.5-7.5" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h13" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.5 6.5 19 12l-4.5 5.5" />
          </svg>
        </div>
        <div>
          <p className="font-semibold text-gray-900">
            {seg.departure.iataCode} → {seg.arrival.iataCode}
          </p>
          <p className="text-xs text-gray-600">
            {formatDate(seg.departure.at)} | {seg.carrierCode} · Economy · <span className="font-semibold">Non-stop</span> · {formatDuration(itinerary.duration)}
          </p>
        </div>
      </div>
    </div>
  );
}
