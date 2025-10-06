import React from "react";

export default function ContactForm({ contactDetails, setContactDetails }) {
  return (
    <div className="px-5 py-3 border border-slate-300 rounded-xl mx-4 shadow-md">
      <div className="font-semibold mb-2">Contact Details</div>
      <p className="text-xs text-gray-500 mb-3">
        Your ticket & flight details will be shared here
      </p>
      <div className="flex justify-between gap-5">
        <div className="mb-3 w-1/2">
          <label className="block text-sm mb-1">Email Address</label>
          <input
            type="email"
            placeholder="Enter Email Address"
            className="border rounded p-2 w-full border-slate-300"
            value={contactDetails.email}
            required
            onChange={(e) =>
              setContactDetails({ ...contactDetails, email: e.target.value })
            }
          />
        </div>
        <div className="mb-3 w-1/2">
          <label className="block text-sm mb-1">Phone Number</label>
          <div className="flex gap-2">
            <span className="border rounded p-2 text-gray-600 bg-gray-100">+91</span>
            <input
              type="text"
              placeholder="Enter Mobile No."
              className="border rounded p-2 w-full border-slate-300"
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
