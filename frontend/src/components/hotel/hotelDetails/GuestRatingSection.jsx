"use client";
import React, { forwardRef } from "react";

const GuestRatingSection = forwardRef((_, ref) => (
  <section ref={ref} className="mb-16">
    <h3 className="text-xl font-semibold mb-4 border-b border-orange-600 pb-2">
      Guest Rating
    </h3>
    <div className="text-green-700 font-bold text-3xl flex items-center">
      <span>4.8</span>
      <span className="ml-3 text-gray-600 text-xl">(350 reviews)</span>
    </div>
  </section>
));

GuestRatingSection.displayName = "GuestRatingSection";
export default GuestRatingSection;
