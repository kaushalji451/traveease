"use client";
import React, { forwardRef } from "react";

const LocationSection = forwardRef(({ hotel }, ref) => (
  <section ref={ref} className="mb-10">
    <h3 className="text-xl font-semibold mb-4 border-b border-[#6daa5c] pb-2">
      Location
    </h3>
    <div className="border rounded overflow-hidden shadow-sm">
      <iframe
        title="Hotel Location"
        src={`https://maps.google.com/maps?q=${hotel.latitude},${hotel.longitude}&z=15&output=embed`}
        width="100%"
        height="300"
        style={{ border: "0" }}
        allowFullScreen
        loading="lazy"
      ></iframe>
    </div>
    <p className="mt-2 text-gray-600 text-sm">
      Coordinates: {hotel.latitude}, {hotel.longitude} - {hotel.zoneName}
    </p>
  </section>
));

LocationSection.displayName = "LocationSection";
export default LocationSection;
