"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Loader from "@/components/Loader";
import PaymentButton from "./PaymentButton";
import { verifyUserToken } from "@/lib/auth";
import Image from "next/image";
const EURO_TO_INR = 104;

export default function HotelCheckoutPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [hotelData, setHotelData] = useState(null);
  const [selectedRate, setSelectedRate] = useState(null);
  const [guestDetails, setGuestDetails] = useState([]);
  const [contact, setContact] = useState({ email: "", phone: "" });
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [bookingReference, setBookingReference] = useState(null);
  const [finalPriceEUR, setFinalPriceEUR] = useState(null);
  const [CheckIn, setCheckIn] = useState("");
  const [CheckOut, setCheckOut] = useState("");
  const [isBookingLoading, setIsBookingLoading] = useState(false); // 🟢 Added

  // ✅ Check user login
  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setUser(null);
        setAuthChecked(true);
        return;
      }
      try {
        const res = await verifyUserToken(token);
        if (res?.id) setUser(res);
      } catch (err) {
        console.error("Auth failed:", err);
        setUser(null);
      } finally {
        setAuthChecked(true);
      }
    };
    checkUser();
  }, []);

  // ✅ Load hotel data from localStorage
  useEffect(() => {
    if (id) {
      const storedData = localStorage.getItem(id);
      if (storedData) {
        const parsed = JSON.parse(storedData);
        console.log("Loaded hotel data:", parsed);
        setHotelData(parsed);

        if (parsed.room?.rates && parsed.room.rates.length > 0) {
          setSelectedRate(parsed.room.rates[0]);
        }

        if (parsed?.CheckIn && parsed?.CheckOut) {
          setCheckIn(parsed.CheckIn);
          setCheckOut(parsed.CheckOut);
        }
      }
    }
  }, [id]);

  // ✅ Initialize guest details
  useEffect(() => {
    if (selectedRate?.rooms) {
      setGuestDetails((prev) =>
        Array(selectedRate.rooms)
          .fill(null)
          .map((_, idx) => prev[idx] || { firstName: "", lastName: "", title: "Mr." })
      );
    }
  }, [selectedRate?.rooms]);

  if (!hotelData || !hotelData.room || !selectedRate) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Loader />
      </div>
    );
  }

  // ✅ Price calculations
  const euroPrice = finalPriceEUR || parseFloat(selectedRate.net || 0);
  const priceINR = Math.round(euroPrice * EURO_TO_INR);
  const grandTotal = priceINR;

  // ✅ Handle booking creation
  const handleBooking = async (e) => {
    e.preventDefault();
    setIsBookingLoading(true); // 🟢 Disable button immediately

    try {
      const payload = {
        hotelName: hotelData.room.name,
        rateKey: selectedRate.rateKey,
        guestDetails,
        contact,
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_HOTEL_URL}/create-booking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok && data?.bookingReference) {
        setBookingReference(data.bookingReference);
        setFinalPriceEUR(data.data.booking.totalNet);
        alert(`Booking Created! Reference: ${data.bookingReference}`);
      } else {
        console.error("Booking failed:", data);
        alert("Booking failed. Try again.");
        setIsBookingLoading(false); // 🟡 Enable button again if failed
      }
    } catch (err) {
      console.error("Error creating booking:", err);
      setIsBookingLoading(false); // 🟡 Enable again on error
    }
  };

  const isPaymentDisabled = !user || !bookingReference;
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-2">
      <div className="w-full max-w-screen-lg bg-gray-50 rounded-xl shadow-lg p-4 md:p-8 flex flex-col md:flex-row gap-8">
        {/* Main Section */}
        <div className="flex-1 bg-white rounded-lg shadow p-4 md:p-7">
          {/* Hotel Summary */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2IlovA50T00WLRbsaxCZgu5i-YF1z7zI4Vg&s"
              alt="hotel"
              width={100}
              height={100}
              className="w-full md:w-64 h-40 object-cover rounded-lg"
            />
            <div>
              <div className="font-bold text-xl mb-1">{hotelData.room.name}</div>
              <div className="text-sm text-gray-500">{hotelData.room.code}</div>
              <div className="flex gap-5 mt-2 flex-wrap">
                <span><b>Check-in:</b> {CheckIn}</span>
                <span><b>Check-out:</b> {CheckOut}</span>
              </div>
            </div>
          </div>

          {/* Room/Rates Selection */}
          <div className="mb-6">
            <div className="font-semibold mb-2">Available Rates</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {hotelData.room.rates.map((rate, idx) => (
                <div
                  key={idx}
                  className={`border rounded-lg p-3 cursor-pointer transition-all ${selectedRate.rateKey === rate.rateKey
                      ? "border-[#6daa5c] bg-[#6daa5c]/40"
                      : "border-gray-200 bg-white"
                    }`}
                  onClick={() => setSelectedRate(rate)}
                >
                  <div className="font-medium">{rate.boardName}</div>
                  <div>Price: ₹{parseFloat(rate.net * EURO_TO_INR).toFixed(2)}</div>
                  <div>Offer: {rate.offers?.[0]?.name || "—"}</div>
                  <div>Guests: {rate.adults} Adults</div>
                </div>
              ))}
            </div>
          </div>

          {/* Guest Details Form */}
          <div>
            <div className="font-semibold mb-2">Guest Details</div>
            <form onSubmit={handleBooking}>
              {guestDetails.map((guest, i) => (
                <div key={i} className="mb-4 px-3 py-2 border border-gray-200 rounded-lg">
                  <div className="font-medium">Room {i + 1}</div>
                  <div className="flex gap-3 mt-2 flex-wrap">
                    <select
                      value={guest.title}
                      onChange={(e) => {
                        const next = [...guestDetails];
                        next[i] = { ...next[i], title: e.target.value };
                        setGuestDetails(next);
                      }}
                      className="border px-2 py-1 rounded"
                    >
                      <option>Mr.</option>
                      <option>Ms.</option>
                      <option>Mrs.</option>
                    </select>
                    <input
                      type="text"
                      placeholder="First Name"
                      className="border px-2 py-1 flex-1 rounded"
                      value={guest.firstName}
                      required
                      onChange={(e) => {
                        const next = [...guestDetails];
                        next[i] = { ...next[i], firstName: e.target.value };
                        setGuestDetails(next);
                      }}
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="border px-2 py-1 flex-1 rounded"
                      value={guest.lastName}
                      required
                      onChange={(e) => {
                        const next = [...guestDetails];
                        next[i] = { ...next[i], lastName: e.target.value };
                        setGuestDetails(next);
                      }}
                    />
                  </div>
                </div>
              ))}

              {/* Contact Details */}
              <div className="mb-4 px-4 py-3 border border-gray-200 rounded-xl shadow-sm bg-white transition-all duration-200 hover:shadow-md">
                <div className="flex flex-col md:flex-row gap-3 md:gap-4">
                  {/* Email Input */}
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="border px-3 py-2 rounded-lg flex-1 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#6DAA5C] transition-all duration-200"
                    value={contact.email}
                    required
                    onChange={(e) => setContact({ ...contact, email: e.target.value })}
                  />

                  {/* Phone Input Group */}
                  <div className="flex w-full md:w-auto gap-2">
                    <select
                      className="border px-3 py-2 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#6DAA5C] transition-all duration-200 bg-gray-50 text-gray-700"
                      defaultValue="+91"
                    >
                      <option>+91</option>
                    </select>
                    <input
                      type="tel"
                      placeholder="Mobile Number"
                      className="border px-3 py-2 rounded-lg flex-1 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#6DAA5C] transition-all duration-200"
                      value={contact.phone}
                      required
                      onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isBookingLoading || bookingReference}
                className={`w-full py-3 rounded-md font-semibold transition ${isBookingLoading || bookingReference
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-[#6daa5c] text-white hover:bg-[#66c44b]"
                  }`}
              >
                {isBookingLoading
                  ? "Processing..."
                  : bookingReference
                    ? "Booking Confirmed"
                    : "Submit Guest Details & Confirm Booking"}
              </button>
            </form>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full md:w-80 min-w-64 mt-6 md:mt-0 flex-shrink-0">
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="font-semibold text-lg mb-2 text-center">Room Price Details</div>
            <div className="flex justify-between mb-1">
              <span>Price ₹</span>
              <span>₹{priceINR}</span>
            </div>
            <div className="flex justify-between font-semibold mt-3">
              <span>Grand Total</span>
              <span className="text-orange-600 text-xl">
                {bookingReference ? `₹${grandTotal}` : "— (XXX)"}
              </span>
            </div>
            {bookingReference && (
              <p className="text-xs text-green-600 mt-2 text-center">
                Booking Confirmed. Ref: {bookingReference}
              </p>
            )}
          </div>

          {/* Payment button */}
          <div className="mt-4">
            <PaymentButton
              amount={grandTotal}
              hotelData={hotelData}
              selectedRate={selectedRate}
              guestDetails={guestDetails}
              contact={contact}
              disabled={isPaymentDisabled}
              user={user}
              bookingReference={bookingReference}
            />
            {!user && (
              <p className="text-red-500 text-sm mt-2 text-center">
                Please login to continue to payment
              </p>
            )}
          </div>
          <p className="pt-4">Enter the guest details to see the final price</p>
        </div>
      </div>
    </div>
  );
}
