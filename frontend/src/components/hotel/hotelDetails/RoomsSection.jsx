"use client";
import React, { forwardRef, useState } from "react";
import { useRouter } from "next/navigation";

const RoomsSection = forwardRef(({ hotel, CheckIn, CheckOut }, ref) => {
  const router = useRouter();
  const EUR_TO_INR = 104;
  const [loadingRoom, setLoadingRoom] = useState(null); // store index of clicked room

  const handleBookNow = (room, idx) => {
    setLoadingRoom(idx);

    console.log("Selected Room Details:", room, CheckIn, CheckOut);

    // First clear any existing "hotel*" keys
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("hotelroom")) {
        localStorage.removeItem(key);
      }
    });


    // Generate random hotel id like hotel1234
    const randomId = `hotelroom${Math.floor(1000 + Math.random() * 9000)}`;

    // Save room directly with that key
    localStorage.setItem(randomId, JSON.stringify({ room, CheckIn, CheckOut }));

    // Redirect with query param
    router.push(`/HotelCheckOut/?id=${randomId}`);
  };

  return (
    <section ref={ref} className="mb-10">
      <h3 className="text-xl font-semibold mb-4 border-b border-[#6daa5c] pb-2">
        Rooms
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotel.rooms.map((room, idx) => {
          const rate = room.rates?.[0];
          const netPrice = rate ? parseFloat(rate.net) * EUR_TO_INR : 0;
          const offer = rate?.offers?.[0];
          const offerAmount = offer ? parseFloat(offer.amount) * EUR_TO_INR : 0;

          // Correct discounted price logic
          let discountedPrice = netPrice;
          if (offer) {
            if (offerAmount < 0) {
              // Only subtract if discount is less than netPrice
              discountedPrice = netPrice + offerAmount < 0 ? netPrice : netPrice + offerAmount;
            } else {
              // If offerAmount is positive, add it
              discountedPrice = netPrice + offerAmount;
            }
          }
          return (
            <div
              key={idx}
              className="flex flex-col justify-between border border-slate-300 rounded-xl shadow-md hover:shadow-lg transition bg-white"
            >
              {/* Room Info */}
              <div className="p-4 flex flex-col gap-2">
                <h4 className="font-bold text-lg text-[#212121]">{room.name}</h4>
                <p className="text-sm text-green-700">
                  Room only, Free Wi-Fi, Complimentary water, Free stay for kids
                </p>

                {/* Pricing */}
                <div className="mt-3">
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
                  <div className="text-xl font-bold text-[#212121]">
                    ₹{discountedPrice.toFixed(0)}
                  </div>
                  <div className="text-xs text-gray-600">Per Night</div>
                </div>
              </div>

              {/* Book Now Button */}
              <div className="p-4 border-t border-slate-300">
                <button
                  onClick={() => handleBookNow(room, idx)}
                  disabled={loadingRoom === idx}
                  className={`w-full font-bold py-2 rounded-md transition ${loadingRoom === idx
                      ? "bg-gray-400 cursor-not-allowed text-white"
                      : "bg-[#6daa5c] hover:bg-[#66c44b] text-white"
                    }`}
                >
                  {loadingRoom === idx ? "Loading..." : "Book Now"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
});

RoomsSection.displayName = "RoomsSection";
export default RoomsSection;
