"use client";
import React from "react";
import HotelCard from "./HotelCard";

function HotelsList({ filteredHotels }) {
  return (
    <main className="flex-1 p-6 overflow-y-auto" style={{ maxHeight: "calc(100vh - 2rem)" }}>
      <h2 className="font-bold text-xl mb-6">
        {filteredHotels.length} Properties found
      </h2>

      {filteredHotels.map((hotel) => {
        const minRate = parseFloat(hotel.minRate || hotel.rates?.[0]?.net || 0);
        const maxRate = parseFloat(hotel.maxRate || hotel.rates?.[0]?.net || 0);
        const discount = Math.round(maxRate - minRate);

        return (
          <HotelCard key={hotel.code} hotel={hotel} minRate={minRate} discount={discount} />
        );
      })}
    </main>
  );
}

export default HotelsList;
