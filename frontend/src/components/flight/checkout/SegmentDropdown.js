import React, { useState } from "react";
import { formatDate, formatTime, formatDuration } from "@/utils/dateUtils";

export default function SegmentDropdown({ label, segments, duration, refundable }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-4">
      <button
        className="w-full flex justify-between items-center text-sm font-semibold bg-white border border-gray-200 py-2 px-4 rounded shadow-sm hover:bg-[#6daa5c]/20 focus:outline-none transition"
        onClick={() => setOpen((o) => !o)}
      >
        <span>
          {label}{" "}
          <span className="text-xs font-normal text-gray-500">
            ({segments[0].departure.iataCode} → {segments[0].arrival.iataCode}, {formatDuration(duration)})
          </span>
        </span>
        <span className="ml-2 text-xs text-[#6daa5c]">
          {open ? "▲ Hide Details" : "▼ View Details"}
        </span>
      </button>
      {open && (
        <div className="p-4 border border-t-0 border-gray-200 rounded-b-md bg-gray-50 mt-0.5">
          {segments.map((seg) => (
            <div
              key={seg.id}
              className="mb-4 last:mb-0 rounded-md border border-gray-100 bg-white px-4 py-3 hover:shadow transition-shadow flex flex-col md:flex-row items-center justify-between"
            >
              {/* Left: Airline and Flight Info */}
              <div className="flex flex-col justify-center md:justify-start min-w-[120px] mb-3 md:mb-0">
                <div className="text-xs text-gray-500">{seg.carrierName ?? seg.carrierCode}</div>
                <div className="font-bold text-[#6daa5c] text-lg">
                  {seg.carrierCode} - {seg.number}
                </div>
                <span className="text-xs mt-1 px-2 py-0.5 rounded bg-gray-100 border text-gray-600 w-max">
                  {seg.aircraft?.code ? "Airbus " + seg.aircraft.code : ""}
                </span>
              </div>

              {/* Middle Left: Departure */}
              <div className="text-center flex-1 min-w-[140px]">
                <div className="text-2xl font-bold tracking-tight">{formatTime(seg.departure.at)}</div>
                <div className="text-gray-700 text-sm font-semibold">{seg.departure.cityName} ({seg.departure.iataCode})</div>
                <div className="text-xs text-gray-500">{formatDate(seg.departure.at)}</div>
                <div className="text-xs text-gray-400">Terminal - {seg.departure.terminal ?? "-"}</div>
              </div>

              {/* Center: Duration and refundable */}
              <div className="flex flex-col items-center min-w-[120px] mx-6">
                <svg
                  className="w-8 h-8 text-[#6daa5c] mb-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 19l18-7-18-7v6l14 1-14 1z"></path>
                </svg>
                <div className="text-gray-500 text-sm">{formatDuration(duration)}</div>
                {refundable && (
                  <div className="mt-1 text-xs font-semibold text-[#6daa5c] border border-[#6daa5c] rounded px-3 py-0.5">
                    REFUNDABLE
                  </div>
                )}
              </div>

              {/* Middle Right: Arrival */}
              <div className="text-center flex-1 min-w-[140px]">
                <div className="text-2xl font-bold tracking-tight">{formatTime(seg.arrival.at)}</div>
                <div className="text-gray-700 text-sm font-semibold">{seg.arrival.cityName} ({seg.arrival.iataCode})</div>
                <div className="text-xs text-gray-500">{formatDate(seg.arrival.at)}</div>
                <div className="text-xs text-gray-400">Terminal - {seg.arrival.terminal ?? "-"}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
