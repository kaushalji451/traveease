"use client";
import React from "react";

const DateSelector = ({ dates, selectedDate, onDateSelect }) => {
  return (
    <div className="flex gap-2 overflow-x-auto mb-6   justify-center rounded-lg shadow px-2 py-2">
      {dates.map((dateStr) => (
        <button
          key={dateStr}
          className={`px-3 py-1 rounded font-semibold border ${
            selectedDate === dateStr
              ? "bg-[#6DAA5C]/50 text-[#fff] border-[#6DAA5C]/80"
              : "bg-white border-gray-400 text-gray-700 hover:bg-blue-50"
          }`}
          onClick={() => onDateSelect(dateStr)}
        >
          {dateStr}
        </button>
      ))}
    </div>
  );
};

export default DateSelector;
