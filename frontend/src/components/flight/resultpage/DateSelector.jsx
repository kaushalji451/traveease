"use client";
import React from "react";

const DateSelector = ({ dates, selectedDate, onDateSelect }) => {
  return (
    <div className="flex flex-wrap sm:flex-nowrap gap-2 overflow-x-auto sm:overflow-x-visible mb-6 justify-center rounded-lg shadow px-3 py-3">
      {dates.map((dateStr) => (
        <button
          key={dateStr}
          className={`whitespace-nowrap px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-semibold border transition-all duration-200 ${
            selectedDate === dateStr
              ? "bg-[#6DAA5C] text-white border-[#6DAA5C]"
              : "bg-white border-gray-300 text-gray-700 hover:bg-[#6DAA5C]/10"
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
