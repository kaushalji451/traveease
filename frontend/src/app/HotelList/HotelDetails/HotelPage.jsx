"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

// Components
import HotelHeader from "@/components/hotel/hotelDetails/HotelHeader";
import HotelInfoCard from "@/components/hotel/hotelDetails/HotelInfoCard";
import DealBanner from "@/components/hotel/hotelDetails/DealBanner";
import StickyTabs from "@/components/hotel/hotelDetails/StickyTabs";
import RoomsSection from "@/components/hotel/hotelDetails/RoomsSection";
import OverviewSection from "@/components/hotel/hotelDetails/OverviewSection";
import AmenitiesSection from "@/components/hotel/hotelDetails/AmenitiesSection";
import LocationSection from "@/components/hotel/hotelDetails/LocationSection";
import BookingPolicySection, { bookingPolicyList } from "@/components/hotel/hotelDetails/BookingPolicySection";
import GuestRatingSection from "@/components/hotel/hotelDetails/GuestRatingSection";
import Loader from "@/components/Loader";

function HotelPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const hotelId = searchParams.get("id");

  const [hotelData, setHotelData] = useState(null);
  const [CheckIn, setCheckIn] = useState("");
  const [CheckOut, setCheckOut] = useState("");

  // Section refs for scroll
  const roomsRef = useRef(null);
  const overviewRef = useRef(null);
  const amenitiesRef = useRef(null);
  const locationRef = useRef(null);
  const bookingPolicyRef = useRef(null);
  const guestRatingRef = useRef(null);

  const scrollToRef = (ref) => {
    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (!hotelId) {
      router.push("/HotelList");
      return;
    }

    const storedData = localStorage.getItem(`hotel_${hotelId}`);
    if (!storedData) {
      router.push("/HotelList");
      return;
    }

    const parsedData = JSON.parse(storedData);
    setHotelData(parsedData);
    setCheckIn(parsedData.CheckIn);
    setCheckOut(parsedData.CheckOut);
  }, [hotelId, router]);

  if (!hotelData) return <div className="h-screen"><Loader/></div>;

  return (
    <div className="max-w-7xl mx-auto my-6 p-4 font-sans text-gray-800 selection:bg-orange-400 selection:text-white">
      <HotelHeader destination={hotelData.hotel.destinationName} checkIn={CheckIn} checkOut={CheckOut} />

      <HotelInfoCard hotel={hotelData.hotel} minRate={hotelData.minRate} discount={hotelData.discount} />

      <DealBanner />

      <StickyTabs
        sections={[
          { name: "Rooms", ref: roomsRef },
          { name: "Overview", ref: overviewRef },
          { name: "Amenities", ref: amenitiesRef },
          { name: "Location", ref: locationRef },
          { name: "Booking Policy", ref: bookingPolicyRef },
          { name: "Guest Rating", ref: guestRatingRef },
        ]}
        onScroll={scrollToRef}
      />

      <RoomsSection ref={roomsRef} hotel={hotelData.hotel} CheckIn={CheckIn} CheckOut={CheckOut} />
      <OverviewSection ref={overviewRef} hotel={hotelData.hotel} />
      <AmenitiesSection ref={amenitiesRef} />
      <LocationSection ref={locationRef} hotel={hotelData.hotel} />
      <BookingPolicySection ref={bookingPolicyRef} />
      <GuestRatingSection ref={guestRatingRef} />
    </div>
  );
}

export default HotelPage;
