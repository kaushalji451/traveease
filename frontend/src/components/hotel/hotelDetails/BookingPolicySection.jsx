"use client";
import React, { forwardRef } from "react";

export const bookingPolicyList = [
  "Every guest above 18 must carry a valid Photo ID.",
  "Hotel may deny check-in without valid ID proof.",
  "Primary guest must be 18+.",
  "Extra charges apply for additional facilities.",
  "Refunds processed only after confirmation from hotel.",
];

const BookingPolicySection = forwardRef((_, ref) => (
  <section ref={ref} className="mb-10">
    <h3 className="text-xl font-semibold mb-4 border-b border-orange-600 pb-2">
      Booking Policy
    </h3>
    <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 leading-relaxed max-h-72 overflow-y-auto pr-3 border border-gray-200 rounded p-3 bg-gray-50">
      {bookingPolicyList.map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
    </ul>
  </section>
));

BookingPolicySection.displayName = "BookingPolicySection";
export default BookingPolicySection;
