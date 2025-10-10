"use client";
import React, { useState, useEffect } from "react";
import Cursole from "@/components/profile/cursole";
import Sidebar from "@/components/profile/sidebar";
import Passangeform from "@/components/profile/passangeform";
import FlightOrders from "./FlightOrder";
import HotelOrder from "./HotelOrder";
import { verifyUserToken } from "@/lib/auth";
import Loader from "@/components/Loader";
import useIsMobile from "@/hooks/useIsMobile";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Account Information");
  const [bookingType, setBookingType] = useState("flight");
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  // ✅ Fetch user from token and DB
  useEffect(() => {
    const fetchUser = async () => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (token) {
          const res = await verifyUserToken(token);
          if (res?.id) {
            setUser(res.id);
            const data = await fetch(
              `${process.env.NEXT_PUBLIC_AUTH_URL}/getuser?userId=${res.id}`
            );
            const result = await data.json();
            if (result && !result.error) {
              setUserDetails(result.data);
            }
          }
        }
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader />
      </div>
    );

  const handleTabClick = (tab) => {
    if (isMobile) {
      if (tab === "Account Information") router.push("/profile/myaccount");
      if (tab === "Your Bookings") router.push("/profile/yourbookings");
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <div className="max-w-7xl mx-auto min-h-screen mt-10 flex flex-col md:flex-row gap-10 px-4">
      {/* Sidebar */}
      <div className="order-2 md:order-1 w-full md:w-1/4">
        <Sidebar activeTab={activeTab} setActiveTab={handleTabClick} />
      </div>

      {/* Main Content */}
      <div className="order-1 md:order-2 w-full md:w-3/4">
        {activeTab === "Account Information" && (
          <>
            <Cursole />
            <div className="hidden md:block mt-6">
              {userDetails ? (() => {
                // Check if any required field is missing or empty
                const requiredFields = [
                  "passengerType",
                  "firstName",
                  "lastName",
                  "dob",
                  "address",
                  "city",
                  "state",
                  "pincode",
                  "email",
                ];

                const hasMissingField = requiredFields.some(
                  (key) =>
                    !userDetails[key] ||
                    (typeof userDetails[key] === "string" &&
                      userDetails[key].trim() === "")
                );

                if (hasMissingField) return <Passangeform />;

                return (
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4 text-[#6daa5c]">
                      Account Details
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <p>
                        <strong>Passenger Type:</strong>{" "}
                        {userDetails.passengerType}
                      </p>
                      <p>
                        <strong>First Name:</strong> {userDetails.firstName}
                      </p>
                      <p>
                        <strong>Last Name:</strong> {userDetails.lastName}
                      </p>
                      <p>
                        <strong>Date of Birth:</strong> {userDetails.dob}
                      </p>
                      <p>
                        <strong>Address:</strong> {userDetails.address}
                      </p>
                      <p>
                        <strong>City:</strong> {userDetails.city}
                      </p>
                      <p>
                        <strong>State:</strong> {userDetails.state}
                      </p>
                      <p>
                        <strong>Pincode:</strong> {userDetails.pincode}
                      </p>
                      <p>
                        <strong>Email:</strong> {userDetails.email}
                      </p>
                    </div>
                  </div>
                );
              })() : (
                <Passangeform />
              )}
            </div>
          </>
        )}

        {activeTab === "Your Bookings" && (
          <>
            {/* Booking Type Toggle */}
            <div className="flex gap-4 mb-4">
              <button
                className={`px-4 py-2 rounded ${
                  bookingType === "flight"
                    ? "bg-[#6daa5c] text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setBookingType("flight")}
              >
                Flight Orders
              </button>
              <button
                className={`px-4 py-2 rounded ${
                  bookingType === "hotel"
                    ? "bg-[#6daa5c] text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setBookingType("hotel")}
              >
                Hotel Orders
              </button>
            </div>

            {bookingType === "flight" && <FlightOrders />}
            {bookingType === "hotel" && <HotelOrder />}
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
