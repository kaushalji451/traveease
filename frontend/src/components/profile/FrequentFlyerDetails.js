"use client";
import React, { useState } from 'react';

const FrequentFlyerDetails = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [airline, setAirline] = useState('');
  const [ffNumber, setFfNumber] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!airline) newErrors.airline = 'Required';
    if (!ffNumber) newErrors.ffNumber = 'Required';
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert(`Frequent Flyer Details Submitted!\nAirline: ${airline}\nNumber: ${ffNumber}`);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-lg my-6 max-w-5xl mx-auto">
      {/* Collapse Header */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between cursor-pointer border-b border-slate-300 pb-2 mb-3"
      >
        <h2 className="text-lg font-semibold">Frequent Flyer Details</h2>
        <span
          className="text-xl transform transition-transform"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          ⌄
        </span>
      </div>

      {/* Collapsible Form */}
      {isOpen && (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium">Airline Name</label>
            <input
              type="text"
              value={airline}
              onChange={(e) => setAirline(e.target.value)}
              className="w-full border border-slate-300 rounded px-3 py-2 mt-1 focus:outline-none"
              placeholder="Enter Airline Name"
            />
            {errors.airline && <div className="text-red-500 text-xs">{errors.airline}</div>}
          </div>

          <div>
            <label className="block text-sm font-medium">Frequent Flyer No</label>
            <input
              type="text"
              value={ffNumber}
              onChange={(e) => setFfNumber(e.target.value)}
              className="w-full border border-slate-300 rounded px-3 py-2 mt-1 focus:outline-none"
              placeholder="Enter Frequent Flyer No"
            />
            {errors.ffNumber && <div className="text-red-500 text-xs">{errors.ffNumber}</div>}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#A8E6A1] text-white py-2 px-8 rounded hover:bg-[#A8E6A1]"
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default FrequentFlyerDetails;
