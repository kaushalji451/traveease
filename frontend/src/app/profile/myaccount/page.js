"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Passangeform from "@/components/profile/passangeform";
import Link from "next/link";
import Loader from "@/components/Loader";
import { verifyUserToken } from "@/lib/auth";

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState(null);
  const [user, setUser] = useState(null);

  // ✅ Redirect desktop users to /profile
  useEffect(() => {
    if (window.innerWidth >= 768) {
      router.replace("/profile");
    }
  }, [router]);

  // ✅ Fetch user and details
  useEffect(() => {
    const fetchUser = async () => {
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
    };
    fetchUser();
  }, []);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader />
      </div>
    );

  // ✅ Check if any required field is missing
  const hasMissingField = userDetails
    ? (() => {
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
        return requiredFields.some(
          (key) =>
            !userDetails[key] ||
            (typeof userDetails[key] === "string" &&
              userDetails[key].trim() === "")
        );
      })()
    : true;

  return (
    <div className="mt-6 min-h-screen px-4 sm:px-6 md:hidden">
      {/* Mobile Back Button */}
      <Link
        href="/profile"
        className="flex items-center text-[#66BB6A] font-semibold mb-6 hover:underline"
      >
        <span className="mr-2 text-lg">←</span> Back
      </Link>

      {/* Show form or user details */}
      {userDetails && !hasMissingField ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-[#6daa5c]">
            Account Details
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <p>
              <strong>Passenger Type:</strong> {userDetails.passengerType}
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
      ) : (
        <Passangeform />
      )}
    </div>
  );
};

export default Page;
