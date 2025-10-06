"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Loader from "@/components/Loader";
import { HiUserGroup } from "react-icons/hi2";
import { MdOutlineFlightTakeoff } from "react-icons/md";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { Suspense } from "react";


function isoToLocal(dt) {
  try {
    const d = new Date(dt);
    return d.toLocaleString();
  } catch (e) {
    return dt;
  }
}

function durationToHuman(pt) {
  const match = /^PT(?:(\d+)H)?(?:(\d+)M)?$/.exec(pt || "");
  if (!match) return pt || "";
  const h = match[1] ? `${match[1]}h` : "";
  const m = match[2] ? ` ${match[2]}m` : "";
  return `${h}${m}`.trim();
}

const FlightSinglePage = () => {
  const searchParams = useSearchParams();
  const pnr = searchParams.get("pnr");
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (pnr) {
      const fetchBooking = async () => {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_FLIGHT_URL}/pnr/${encodeURIComponent(pnr)}`
          );
          if (!res.ok) throw new Error("Failed to fetch booking");
          const data = await res.json();
          console.log(data);
          setBooking(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchBooking();
    }
  }, [pnr]);

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
          <div className="text-gray-400 text-5xl sm:text-6xl mb-4">✈️</div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            No Booking Found
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Please check your PNR and try again.
          </p>
        </div>
      </div>
    );

  const order = booking.flightDetails?.data;
  const offer = order?.flightOffers?.[0];
  const itineraries = offer?.itineraries || [];
  const isRoundTrip = itineraries.length === 2;
  const travelers = order?.travelers || [];
  const pnrCode = order?.id || "-";

  // Convert EUR to INR with *104 and add +300 fee
  const eurToInr = (val) => (parseFloat(val || 0) * 104).toFixed(2);
  const totalInr = Number(eurToInr(offer?.price?.total || 0)) + 300;
  const baseInr = eurToInr(offer?.price?.base || 0);

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
                  Booking Confirmation
                </h1>
                <p className="text-blue-100 text-sm sm:text-lg">
                  PNR:{" "}
                  <span className="font-mono bg-white/20 px-3 py-1 rounded-full">
                    {pnrCode}
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

          {/* Travelers */}
          <div className="p-6 sm:p-8 border-b border-gray-100">
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="text-xl sm:text-3xl mr-3">
                <HiUserGroup />
              </span>{" "}
              Travelers
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {travelers.map((t, index) => (
                <div
                  key={t.id || index}
                  className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 sm:p-6 rounded-2xl border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg">
                      {t.name?.firstName?.[0]}
                      {t.name?.lastName?.[0]}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 text-base sm:text-lg">
                        {t.name?.firstName} {t.name?.lastName}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600 mt-1">
                        {t.contact?.emailAddress}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600">
                        <span className="font-mono">
                          +{t.contact?.phones?.[0]?.countryCallingCode}
                        </span>{" "}
                        {t.contact?.phones?.[0]?.number}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Itineraries */}
          <div className="p-6 sm:p-8">
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="text-xl sm:text-3xl mr-3">
                <MdOutlineFlightTakeoff />
              </span>{" "}
              Flight Itinerary {isRoundTrip ? "(Round Trip)" : "(One Way)"}
            </h2>
            <div className="space-y-6">
              {itineraries.map((it, idx) => {
                const totalDuration = it.duration
                  ? durationToHuman(it.duration)
                  : durationToHuman(it.segments?.[0]?.duration);
                const totalStops =
                  it.segments?.reduce(
                    (acc, seg) => acc + (seg.numberOfStops || 0),
                    0
                  ) || 0;
                return (
                  <div
                    key={idx}
                    className="bg-[#6daa5c]/30 rounded-2xl p-4 sm:p-6 border border-blue-100"
                  >
                    <div className="flex flex-col sm:flex-row items-center justify-between mb-6 pb-4 border-b border-blue-200 text-center sm:text-left">
                      <div className="text-base sm:text-xl font-semibold text-gray-800">
                        {idx === 0 ? "Outbound Flight" : "Return Flight"}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600 bg-white/50 px-3 sm:px-4 py-1.5 rounded-full mt-2 sm:mt-0">
                        {totalStops} Stop{totalStops !== 1 ? "s" : ""} ·{" "}
                        {totalDuration}
                      </div>
                    </div>

                    <div className="space-y-4">
                      {it.segments?.map((seg, segIdx) => (
                        <div
                          key={seg.id || segIdx}
                          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-4 bg-white rounded-xl shadow-sm border border-gray-200 text-center sm:text-left"
                        >
                          {/* Departure */}
                          <div className="w-full sm:w-24">
                            <div className="font-bold text-sm sm:text-lg text-gray-900">
                              {seg.departure?.iataCode}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              Terminal {seg.departure?.terminal || "N/A"}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-600 mt-1">
                              {isoToLocal(seg.departure?.at)}
                            </div>
                          </div>

                          {/* Flight Path */}
                          <div className="flex-1 flex justify-center">
                            <div className="flex items-center space-x-2">
                              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#6daa5c] rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold">
                                →
                              </div>
                              <div>
                                <div className="font-semibold text-gray-800 text-xs sm:text-sm">
                                  {seg.carrierCode} {seg.number}
                                </div>
                                <div className="text-[10px] sm:text-xs text-gray-500">
                                  {seg.aircraft?.code || "N/A"} · {seg.segmentType} ·{" "}
                                  {seg.bookingStatus}
                                </div>
                                <div className="text-[10px] sm:text-xs text-gray-600 mt-1">
                                  CO₂: {seg.co2Emissions?.[0]?.weight}{" "}
                                  {seg.co2Emissions?.[0]?.weightUnit} (
                                  {seg.co2Emissions?.[0]?.cabin} class)
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Arrival */}
                          <div className="w-full sm:w-24">
                            <div className="font-bold text-sm sm:text-lg text-gray-900">
                              {seg.arrival?.iataCode}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              Terminal {seg.arrival?.terminal || "N/A"}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-600 mt-1">
                              {isoToLocal(seg.arrival?.at)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
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
              {/* Base Fare */}
              <div className="text-center lg:text-left">
                <div className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">
                  Base Fare
                </div>
                <div className="text-xl sm:text-2xl font-bold text-gray-900 mt-2">
                  ₹ {baseInr.toLocaleString()}
                </div>
              </div>

              {/* Taxes */}
              <div>
                <div className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide mb-4">
                  Taxes & Fees
                </div>
                <div className="space-y-2 text-xs sm:text-sm">
                  {offer?.travelerPricings?.[0]?.price?.taxes?.map((t, i) => (
                    <div
                      key={i}
                      className="flex justify-between py-1 border-b border-gray-100 last:border-b-0"
                    >
                      <span className="text-gray-600 font-mono">{t.code}</span>
                      <span className="text-gray-800">
                        ₹ {Number(eurToInr(t.amount)).toLocaleString()}
                      </span>
                    </div>
                  ))}
                  <div className="flex justify-between py-2 border-t border-gray-200 font-semibold text-gray-800">
                    <span>Service Fee</span>
                    <span>+ ₹ 300</span>
                  </div>
                </div>
              </div>

              {/* Total */}
              <div className="text-center lg:text-right pt-4 lg:pt-0 lg:border-l lg:border-gray-200">
                <div className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">
                  Total Amount
                </div>
                <div className="text-xl sm:text-3xl font-bold text-[#6daa5c] mt-2">
                  ₹ {totalInr.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500 mt-1">Paid in INR</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-gray-600 px-4">
          <p>
            This is your digital booking confirmation. For changes or
            cancellations, contact support.
          </p>
        </div>
      </div>
    </div>
  );
};

const page = () => {
  return (
    <Suspense fallback={<Loader />}>
      <FlightSinglePage />
    </Suspense>
  )
}

export default page
