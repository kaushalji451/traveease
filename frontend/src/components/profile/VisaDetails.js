"use client";
import React, { useState } from 'react';

const VisaDetails = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [visaNumber, setVisaNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!visaNumber) newErrors.visaNumber = 'Required';
    if (!expiryDate) newErrors.expiryDate = 'Required';
    if (!file) newErrors.file = 'Please upload visa copy';
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert(
        `Visa Details Submitted!\nNumber: ${visaNumber}\nExpiry: ${expiryDate}\nFile: ${file.name}`
      );
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-lg my-6 max-w-5xl mx-auto">
      {/* Collapse Header */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between cursor-pointer border-b border-slate-300 pb-2 mb-3"
      >
        <h2 className="text-lg font-semibold">Visa Details</h2>
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
            <label className="block text-sm font-medium">Visa Number*</label>
            <input
              type="text"
              value={visaNumber}
              onChange={(e) => setVisaNumber(e.target.value)}
              className="w-full border border-slate-300 rounded px-3 py-2 mt-1 focus:outline-none"
            />
            {errors.visaNumber && (
              <div className="text-red-500 text-xs">{errors.visaNumber}</div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Visa Expiry Date*</label>
            <input
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="w-full border border-slate-300 rounded px-3 py-2 mt-1 focus:outline-none"
            />
            {errors.expiryDate && (
              <div className="text-red-500 text-xs">{errors.expiryDate}</div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Upload Visa Copy</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="mt-1"
            />
            {errors.file && <div className="text-red-500 text-xs">{errors.file}</div>}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#A8E6A1] text-white py-2 px-8 rounded hover:bg-[#A8E6A1]"
            >
              Update
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default VisaDetails;
