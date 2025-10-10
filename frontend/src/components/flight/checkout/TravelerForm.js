"use client";
import React, { useState, useEffect } from "react";

function TravelerForm({ index, data, onChange }) {
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = (field, value) => {
    let error = "";

    switch (field) {
      case "firstName":
      case "lastName":
        if (!value.trim()) error = "Required";
        break;
      case "gender":
        if (!value) error = "Select gender";
        break;
      case "dateOfBirth":
        if (!value) error = "Required";
        break;
      case "email":
        if (!value) error = "Required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Invalid email";
        break;
      case "contactNumber":
        if (!value) error = "Required";
        else if (!/^\d{10}$/.test(value)) error = "Invalid number";
        break;
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
    return !error;
  };

  // Validate all fields on demand
  // const validateAll = () => {
  //   const allValid = ["firstName", "lastName", "email", "contactNumber", "gender", "dateOfBirth"].every(
  //     (f) => validate(f, data[f])
  //   );
  //   setIsValid(index, allValid);
  //   return allValid;
  // };

  const handleChange = (field, value) => {
    onChange(index, { ...data, [field]: value });
    validate(field, value);
  };

  return (
    <div className="mb-5 border border-slate-300 rounded-xl bg-white shadow-sm transition-all duration-300 hover:shadow-md">
      {/* Header */}
      <button
        type="button"
        className="flex items-center justify-between w-full px-4 py-3 bg-gray-100 rounded-t-xl transition-colors duration-200 hover:bg-gray-200"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-2 text-left">
          <input type="checkbox" checked={true} readOnly className="w-4 h-4 accent-green-600" />
          <span className="text-base sm:text-lg font-semibold text-gray-800">
            Adult {index + 1}
          </span>
        </div>
        <span className="text-gray-600 text-lg sm:text-xl">{open ? "▲" : "▼"}</span>
      </button>

      {/* Collapsible Content */}
      {open && (
        <div className="p-4 sm:p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Gender */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select
                className={`border rounded-lg p-2 focus:outline-none focus:ring-2 ${errors.gender ? "border-red-500 focus:ring-red-400" : "border-slate-400 focus:ring-[#6DAA5C]"}`}
                value={data.gender}
                onChange={(e) => handleChange("gender", e.target.value)}
              >
                <option value="">Select</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Others</option>
              </select>
              {errors.gender && <span className="text-red-500 text-sm mt-1">{errors.gender}</span>}
            </div>

            {/* First Name */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                className={`border rounded-lg p-2 focus:outline-none focus:ring-2 ${errors.firstName ? "border-red-500 focus:ring-red-400" : "border-slate-400 focus:ring-[#6DAA5C]"}`}
                type="text"
                placeholder="Enter First Name"
                value={data.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
              />
              {errors.firstName && <span className="text-red-500 text-sm mt-1">{errors.firstName}</span>}
            </div>

            {/* Date of Birth */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
              <input
                className={`border rounded-lg p-2 focus:outline-none focus:ring-2 ${errors.dateOfBirth ? "border-red-500 focus:ring-red-400" : "border-slate-400 focus:ring-[#6DAA5C]"}`}
                type="date"
                value={data.dateOfBirth}
                onChange={(e) => handleChange("dateOfBirth", e.target.value)}
              />
              {errors.dateOfBirth && <span className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</span>}
            </div>
          </div>

          {/* Last Name */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input
              className={`border rounded-lg p-2 focus:outline-none focus:ring-2 ${errors.lastName ? "border-red-500 focus:ring-red-400" : "border-slate-400 focus:ring-[#6DAA5C]"}`}
              type="text"
              placeholder="Enter Last Name"
              value={data.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
            />
            {errors.lastName && <span className="text-red-500 text-sm mt-1">{errors.lastName}</span>}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              className={`border rounded-lg p-2 focus:outline-none focus:ring-2 ${errors.email ? "border-red-500 focus:ring-red-400" : "border-slate-400 focus:ring-[#6DAA5C]"}`}
              type="email"
              placeholder="Enter Email"
              value={data.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
            {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email}</span>}
          </div>

          {/* Contact Number */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Contact Number</label>
            <input
              className={`border rounded-lg p-2 focus:outline-none focus:ring-2 ${errors.contactNumber ? "border-red-500 focus:ring-red-400" : "border-slate-400 focus:ring-[#6DAA5C]"}`}
              type="tel"
              placeholder="Enter Contact Number"
              value={data.contactNumber}
              onChange={(e) => handleChange("contactNumber", e.target.value)}
            />
            {errors.contactNumber && <span className="text-red-500 text-sm mt-1">{errors.contactNumber}</span>}
          </div>
        </div>
      )}
    </div>
  );
}

export default TravelerForm;
