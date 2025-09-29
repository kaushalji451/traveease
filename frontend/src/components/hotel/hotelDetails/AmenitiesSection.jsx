"use client";
import React, { forwardRef } from "react";

const AmenitiesSection = forwardRef((_, ref) => (
  <section ref={ref} className="mb-10">
    <h3 className="text-xl font-semibold mb-4 border-b border-orange-600 pb-2">
      Amenities
    </h3>
    <ul className="grid grid-cols-2 md:grid-cols-3 gap-3 text-gray-700">
      <li>Restaurant</li>
      <li>Free Wi-Fi</li>
      <li>24-hour Room Service</li>
      <li>Gym</li>
      <li>Parking</li>
      <li>Doctor on call</li>
    </ul>
  </section>
));

AmenitiesSection.displayName = "AmenitiesSection";
export default AmenitiesSection;
