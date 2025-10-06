"use client";
import React, { useEffect, useState,Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Loader from "@/components/Loader";
import { HiUserGroup } from "react-icons/hi2";
import { MdOutlineHotel } from "react-icons/md";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";

// Convert EUR to INR with *104 and  service fee
const eurToInr = (val) => (parseFloat(val || 0) * 104).toFixed(2);
function formatDateTime(dt) {
  try {
    const d = new Date(dt);
    return d.toLocaleString("en-IN", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZoneName: "short",
    });
  } catch (e) {
    return dt;
  }
}


const HotelSinglePage = () => {
  const searchParams = useSearchParams();
  const bookingNumber = searchParams.get("hotelbookingnumber");
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (bookingNumber) {
      const fetchBooking = async () => {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_HOTEL_URL}/booking/${encodeURIComponent(bookingNumber)}`
          );
          if (!res.ok) throw new Error("Failed to fetch booking");
          const data = await res.json();
          console.log(data);
          setBooking(data.data?.booking); // 👈 store only booking object
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchBooking();
    }
  }, [bookingNumber]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <Loader />
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 max-w-md w-full mx-4 text-center">
          <div className="text-red-600 text-5xl sm:text-6xl mb-4">⚠️</div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            Oops! Something went wrong
          </h1>
          <p className="text-gray-600 mb-6 text-sm sm:text-base">
            Error: {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 text-white px-5 py-2 sm:px-6 sm:py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );

  if (!booking)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 max-w-md w-full mx-4 text-center">
          <div className="text-gray-400 text-5xl sm:text-6xl mb-4">🏨</div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            No Booking Found
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Please check your booking number and try again.
          </p>
        </div>
      </div>
    );

  // Extract booking data
  const { reference, holder, hotel, totalNet, currency } = booking;
  const totalInr = Number(eurToInr(totalNet));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-6 sm:py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl overflow-hidden border border-white/50">
          {/* Header */}
          <div className="bg-[#6daa5c] p-6 sm:p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10" />
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                  Hotel Booking Confirmation
                </h1>
                <p className="text-blue-100 text-sm sm:text-lg">
                  Booking Ref:{" "}
                  <span className="font-mono bg-white/20 px-3 py-1 rounded-full">
                    {reference}
                  </span>
                </p>
              </div>
              <div className="text-center sm:text-right">
                <div className="text-blue-100 text-xs sm:text-sm opacity-90">
                  Total Amount
                </div>
                <div className="text-2xl sm:text-4xl font-bold mt-1">
                  ₹ {totalInr.toLocaleString()}
                </div>
                <div className="text-blue-100 text-xs mt-1">
                  Inclusive of taxes & fees
                </div>
              </div>
            </div>
          </div>

          {/* Holder Info */}
          <div className="p-6 sm:p-8 border-b border-gray-100">
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="text-xl sm:text-3xl mr-3">
                <HiUserGroup />
              </span>{" "}
              Guest Details
            </h2>
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 sm:p-6 rounded-2xl border border-gray-200">
              <div className="font-semibold text-gray-900 text-base sm:text-lg">
                {holder?.name} {holder?.surname}
              </div>
            </div>
          </div>

          {/* Hotel Info */}
          <div className="p-6 sm:p-8">
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="text-xl sm:text-3xl mr-3">
                <MdOutlineHotel />
              </span>{" "}
              Hotel Information
            </h2>
            <div className="bg-[#6daa5c]/20 rounded-2xl p-6 border border-blue-100">
              <h3 className="text-xl font-bold text-gray-900">{hotel?.name}</h3>
              <p className="text-gray-600">{hotel?.categoryName}</p>
              <p className="text-gray-600">
                {hotel?.destinationName} · {hotel?.zoneName}
              </p>
              <p className="text-gray-700 font-medium mt-2">
                Check-in: {hotel?.checkIn} | Check-out: {hotel?.checkOut}
              </p>

              {/* Rooms */}
              <div className="mt-6 space-y-4">
                {hotel?.rooms?.map((room, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-white rounded-xl border shadow-sm"
                  >
                    <h4 className="font-semibold text-gray-900">
                      {room.name} ({room.code})
                    </h4>
                    <p className="text-sm text-gray-600">
                      Status: {room.status}
                    </p>
                    <p className="text-sm text-gray-600">
                      Guests: {room.paxes?.length}
                    </p>
                    {room.rates?.map((rate, i) => (
                      <div
                        key={i}
                        className="mt-2 p-3 bg-gray-50 rounded-lg text-sm text-gray-700"
                      >
                        <p>
                          Board: {rate.boardName} ({rate.boardCode})
                        </p>
                        <p>Payment: {rate.paymentType}</p>
                        <p>
                          Net: ₹{eurToInr(rate.net)}
                        </p>
                        {rate.cancellationPolicies?.map((cp, j) => (
                          <p key={j} className="text-red-600">
                            Cancel Fee: {eurToInr(cp.amount)} INR   From: {formatDateTime(cp.from)}
                          </p>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing Breakdown */}
          <div className="p-6 sm:p-8 border-t border-gray-100 bg-gray-50/50">
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="text-xl sm:text-3xl mr-3">
                <RiMoneyRupeeCircleFill />
              </span>{" "}
              Price Breakdown
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-white rounded-2xl p-6 shadow-inner">
              <div className="text-center lg:text-left">
                <div className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">
                  Without Taxes
                </div>
                <div className="text-xl sm:text-2xl font-bold text-gray-900 mt-2">
                  ₹ {eurToInr(totalNet)}
                </div>
              </div>
              <div className="text-center lg:text-right">
                <div className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">
                  With Service Fee
                </div>
                <div className="text-xl sm:text-3xl font-bold text-[#6daa5c] mt-2">
                  ₹ {totalInr.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-gray-600 px-4">
          <p>
            This is your digital hotel booking confirmation. For changes or
            cancellations, please contact support.
          </p>
        </div>
      </div>
    </div>
  );
};

export {HotelSinglePage};



const page = () => {
  return (
    <Suspense fallback={<Loader />}>
      <HotelSinglePage />
    </Suspense>
  )
}

export default page
