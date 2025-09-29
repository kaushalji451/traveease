"use client";
import React, { forwardRef } from "react";

const OverviewSection = forwardRef(({ hotel }, ref) => (
  <section ref={ref} className="mb-10">
    <h3 className="text-xl font-semibold mb-4 border-b border-[#6daa5c] pb-2">
      Hotel Overview
    </h3>
    <p className="leading-relaxed">
      <strong>{hotel.name}</strong> is a {hotel.categoryName} hotel located in{" "}
      {hotel.zoneName}. Enjoy premium rooms and amenities. Minimum rate starts at{" "}
      {hotel.minRate} {hotel.currency}.
    </p>
  </section>
));

OverviewSection.displayName = "OverviewSection";
export default OverviewSection;
