"use client";
import React, { useEffect, useState, Suspense } from "react";
import { verifyUserToken } from "@/lib/auth";
import { useRouter } from "next/navigation";

function formatDate(dateString) {
  const date = new Date(dateString);
  const datePart = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const timePart = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return `${datePart}, ${timePart}`;
}

function FlightOrdersContent() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [copiedPnr, setCopiedPnr] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (token) {
          const res = await verifyUserToken(token);
          if (res?.id) setUser(res);
        }
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (user?.id) {
        try {
          const data = await fetch(
            `${process.env.NEXT_PUBLIC_AUTH_URL}/getuser?userId=${user.id}`
          );
          const res = await data.json();
          if (res?.data?.flightBookings) {
            const sortedBookings = res.data.flightBookings.sort(
              (a, b) =>
                new Date(b.bookedAt).getTime() -
                new Date(a.bookedAt).getTime()
            );
            setBookings(sortedBookings);
          }
        } catch (err) {
          console.error("Error fetching user:", err);
        }
      }
    };
    fetchData();
  }, [user]);

  const copyToClipboard = (pnr) => {
    navigator.clipboard.writeText(pnr);
    setCopiedPnr(pnr);
    setTimeout(() => setCopiedPnr(null), 2000);
  };

  const goToOrder = (pnr) => {
    router.push(`/profile/FlightSingleOrder?pnr=${pnr}`);
  };

  return (
    <div className="h-screen bg-gray-100 py-8 rounded-2xl px-6 flex flex-col">
      <div className="max-w-2xl w-full mx-auto flex-grow overflow-y-auto pr-2">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Your Flight Bookings
        </h1>

        {bookings.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
              <p className="text-sm text-gray-500">Total Bookings</p>
              <p className="text-2xl font-bold text-gray-800">
                {bookings.length}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
              <p className="text-sm text-gray-500">Last Booking</p>
              <p className="text-lg font-semibold text-gray-800">
                {bookings[0] ? formatDate(bookings[0].bookedAt) : "N/A"}
              </p>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Flight Booking
              </h2>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  PNR
                </label>
                <div className="flex items-center space-x-3 max-md:flex-col">
                  <span className="text-lg font-mono text-gray-800 bg-gray-50 px-3 py-1 rounded-md">
                    {booking.pnr}
                  </span>
                  <button
                    onClick={() => copyToClipboard(booking.pnr)}
                    className="px-4 py-2 bg-[#6daa5c] cursor-pointer text-white rounded-md hover:bg-[#61ba48] transition-colors font-medium"
                  >
                    {copiedPnr === booking.pnr ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Booking Date
                </label>
                <span className="text-gray-600 font-medium bg-gray-50 px-3 py-1 rounded-md inline-block">
                  {formatDate(booking.bookedAt)}
                </span>
              </div>

              <button
                onClick={() => goToOrder(booking.pnr)}
                className="mt-4  border px-2 py-3 rounded-xl text-white cursor-pointer font-medium bg-[#6daa5c]"
              >
                Show More Details
              </button>
            </div>
          ))}
        </div>

        {bookings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No flight bookings found.</p>
          </div>
        )}
      </div>

      <div className="mt-4 bg-gray-200 py-4 text-center rounded-lg">
        <p className="text-gray-600">
          ✈️ Tip: Keep your PNR safe — it’s your ticket reference!
        </p>
      </div>
    </div>
  );
}

export default function FlightOrders() {
  return (
    <Suspense fallback={<div>Loading flight bookings...</div>}>
      <FlightOrdersContent />
    </Suspense>
  );
}
