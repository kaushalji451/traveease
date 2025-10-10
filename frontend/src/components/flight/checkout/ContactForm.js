import React, { useState, useEffect } from "react";

export default function ContactForm({ contactDetails, setContactDetails }) {
  const [errors, setErrors] = useState({ email: "", phone: "" });

  // Validate fields
  const validateField = (field, value) => {
    let error = "";

    if (field === "email") {
      if (!value.trim()) error = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Invalid email";
    }

    if (field === "phone") {
      if (!value.trim()) error = "Phone number is required";
      else if (!/^\d{10}$/.test(value)) error = "Phone must be 10 digits";
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
    return !error;
  };

  // Update form validity whenever contact details change
  useEffect(() => {
    const emailValid = validateField("email", contactDetails.email);
    const phoneValid = validateField("phone", contactDetails.phone);
    // setIsValid(emailValid && phoneValid);
  }, [contactDetails]);

  const handleChange = (field, value) => {
    setContactDetails({ ...contactDetails, [field]: value });
    validateField(field, value);
  };

  return (
    <div className="px-4 sm:px-6 py-5 border border-slate-300 rounded-2xl shadow-sm max-w-3xl mx-auto bg-white transition-all duration-300 hover:shadow-md">
      {/* Header */}
      <div className="font-semibold text-base sm:text-lg mb-2 text-gray-800">
        Contact Details
      </div>
      <p className="text-xs sm:text-sm text-gray-500 mb-4">
        Your ticket & flight details will be shared here
      </p>

      {/* Form Container */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Email */}
        <div className="w-full md:w-1/2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            placeholder="Enter Email Address"
            className={`border rounded-lg p-2.5 w-full focus:outline-none focus:ring-2 transition-all duration-200 ${
              errors.email ? "border-red-500 focus:ring-red-400" : "border-slate-300 focus:ring-[#6DAA5C]"
            }`}
            value={contactDetails.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div className="w-full md:w-1/2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <div className="flex gap-2">
            <input
              type="tel"
              placeholder="Enter Mobile Number"
              className={`border rounded-lg p-2.5 w-full focus:outline-none focus:ring-2 transition-all duration-200 ${
                errors.phone ? "border-red-500 focus:ring-red-400" : "border-slate-300 focus:ring-[#6DAA5C]"
              }`}
              value={contactDetails.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </div>
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>
      </div>
    </div>
  );
}
