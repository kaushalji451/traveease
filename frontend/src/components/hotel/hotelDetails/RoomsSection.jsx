"use client";
import React, { forwardRef } from "react";

const RoomsSection = forwardRef(({ hotel }, ref) => {
  const EUR_TO_INR = 90;

  return (
    <section ref={ref} className="mb-10">
      <h3 className="text-xl font-semibold mb-4 border-b border-[#6daa5c] pb-2">
        Rooms
      </h3>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 text-sm">
          <thead className="bg-[#f1da8e88]">
            <tr>
              <th className="p-3 border border-gray-300 text-left">Room Type</th>
              <th className="p-3 border border-gray-300 text-left">Benefits</th>
              <th className="p-3 border border-gray-300 text-right">Price (INR)</th>
            </tr>
          </thead>
          <tbody>
            {hotel.rooms.map((room, idx) => {
              const rate = room.rates?.[0];
              const netPrice = rate ? parseFloat(rate.net) * EUR_TO_INR : 0;
              const offer = rate?.offers?.[0];
              const offerAmount = offer ? parseFloat(offer.amount) * EUR_TO_INR : 0;
              const discountedPrice = netPrice + offerAmount;

              return (
                <tr
                  key={idx}
                  className="border-t border-gray-300 hover:bg-orange-50"
                >
                  <td className="p-3 border border-gray-300 font-semibold">
                    {room.name}
                  </td>
                  <td className="p-3 border border-gray-300 text-green-700">
                    Room only, Free Wi-Fi, Complimentary water, Free stay for kids
                  </td>
                  <td className="p-3 border border-gray-300 text-right">
                    {offer && (
                      <div className="text-green-700 text-xs bg-green-100 rounded px-2 py-1 mb-1 inline-block font-semibold">
                        Save ₹{Math.abs(offerAmount.toFixed(0))}
                      </div>
                    )}
                    {offer && (
                      <div className="text-red-500 line-through text-xs mb-1">
                        ₹{netPrice.toFixed(0)}
                      </div>
                    )}
                    <div className="text-lg font-bold">₹{discountedPrice.toFixed(0)}</div>
                    <div className="text-xs text-gray-600">Per Night</div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
});

RoomsSection.displayName = "RoomsSection";
export default RoomsSection;
