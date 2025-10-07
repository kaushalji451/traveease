import React from "react";

export default function ContactForm({ contactDetails, setContactDetails }) {
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
            className="border rounded-lg p-2.5 w-full border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#6DAA5C] transition-all duration-200"
            value={contactDetails.email}
            required
            onChange={(e) =>
              setContactDetails({ ...contactDetails, email: e.target.value })
            }
          />
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
              className="border rounded-lg p-2.5 w-full border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#6DAA5C] transition-all duration-200"
              value={contactDetails.phone}
              required
              onChange={(e) =>
                setContactDetails({ ...contactDetails, phone: e.target.value })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
