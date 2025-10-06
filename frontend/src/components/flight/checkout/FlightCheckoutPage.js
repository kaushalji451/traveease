"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import FlightSummary from "./FlightSummary";
import SegmentDropdown from "./SegmentDropdown";
import TravelerDropdown from "./TravelerDropdown";
import Loader from "@/components/Loader";
import TravelerForm from "./TravelerForm";
import ContactForm from "./ContactForm";
import BaggageContent from "./BaggageContent";
import PaymentButton from "@/components/flight/checkout/PaymentButton";
import {verifyUserToken} from '@/lib/auth';

export default function FlightDetailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [flightData, setFlightData] = useState(null);
  const [showBaggage, setShowBaggage] = useState(false);
  const [travelersForm, setTravelersForm] = useState([]);
  const [user, setUser] = useState(null);
  const [contactDetails, setContactDetails] = useState({
    email: "",
    phoneCode: "+91",
    phone: "",
  });
  const [authChecked, setAuthChecked] = useState(false);

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

  // Load flight data
  useEffect(() => {
    if (id) {
      const storedOffer = localStorage.getItem(id);
      if (storedOffer) {
        setFlightData(JSON.parse(storedOffer));
      }
    }
  }, [id]);

  // Traveler forms setup
  useEffect(() => {
    if (flightData?.travelerPricings?.length) {
      setTravelersForm(
        flightData.travelerPricings.map(() => ({
          gender: "",
          firstName: "",
          lastName: "",
          email: "",
          contactNumber: "",
          dateOfBirth: "",
        }))
      );
    }
  }, [flightData]);

  if (!flightData || !authChecked) return <Loader />;

  const URO_TO_INR = 104;
  const itineraries = flightData.itineraries || [];
  const travelers = flightData.travelerPricings || [];
  const travelerCount = travelers.length || 1;

  const tax = 2.88 * URO_TO_INR;
  const total = ((Number(flightData.price?.grandTotal || 0) * URO_TO_INR) + tax).toFixed(2);
  const perAdult = ((Number(flightData.price?.total / travelerCount) * URO_TO_INR)).toFixed(2);

  const handleTravelerChange = (i, updated) => {
    setTravelersForm((prev) => {
      const next = [...prev];
      next[i] = updated;
      return next;
    });
  };

  // ✅ Form validation
  const isContactComplete = contactDetails.email && contactDetails.phone;
  const areTravelersComplete = travelersForm.every(
    (t) => t.firstName && t.lastName && t.email && t.contactNumber && t.gender && t.dateOfBirth
  );
  const isFormComplete = isContactComplete && areTravelersComplete;

  // ✅ Disable payment if form incomplete or user not logged in
  const isPaymentDisabled = !user || !isFormComplete;

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans text-gray-900">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 border border-slate-200 rounded-xl">

        {/* Left Section */}
        <section className="flex-1 overflow-y-auto max-h-screen mb-10">
          <div className="bg-[#6daa5c]/40 px-5 py-2 rounded-t-md font-semibold text-gray-900">
            Flight Detail
          </div>

          {/* Route Summary */}
          {itineraries[0] && <FlightSummary itinerary={itineraries[0]} />}

          {/* Segments */}
          <div className="px-5 py-4 border mt-2 border-slate-300 rounded-xl mx-4">
            {itineraries.map((it, idx) => (
              <SegmentDropdown
                key={idx}
                label={idx === 0 ? "Outbound Route" : "Return Route"}
                segments={it.segments}
                duration={it.duration}
              />
            ))}
          </div>

          {/* Traveler Fare Summary */}
          <div className="px-5 py-3 border-b border-gray-200">
            <div className="font-semibold mb-1">Traveler Fare Details</div>
            {travelers.map((trav) => (
              <TravelerDropdown key={trav.travelerId} traveler={trav} />
            ))}
          </div>

          {/* Contact Form */}
          <ContactForm
            contactDetails={contactDetails}
            setContactDetails={setContactDetails}
          />

          {/* Traveler Forms */}
          <div className="px-5 py-3 border-b border-gray-200">
            <div className="font-semibold mb-2">Traveler Details</div>
            {travelersForm.map((form, i) => (
              <TravelerForm
                key={i}
                index={i}
                data={form}
                onChange={handleTravelerChange}
              />
            ))}
          </div>

          {/* Baggage Tab */}
          <div className="px-5 pt-5">
            <nav className="flex border-b border-gray-200 space-x-8">
              <button
                type="button"
                className={`inline-block pb-2 font-semibold text-sm ${showBaggage
                  ? "border-[#6daa5c] text-[#6daa5c] border-b-2"
                  : "text-gray-500"
                  }`}
                onClick={() => setShowBaggage(true)}
              >
                Baggage
              </button>
            </nav>
            <div className="mt-2">
              {showBaggage && <BaggageContent travelers={travelers} />}
            </div>
          </div>
        </section>

        {/* Right Sticky Price Summary */}
        <aside className="w-full max-w-sm flex-shrink-0">
          <div className="sticky top-6 space-y-4">
            <section className="bg-white rounded-md border border-gray-200 shadow-sm p-5">
              <div className="text-sm flex justify-between mb-2">
                <span>Adult x {travelerCount}</span>
                <span>INR {perAdult * travelerCount}</span>
              </div>
              <div className="text-sm flex justify-between mb-3">
                <span>Total Taxes +</span>
                <span>INR {tax}</span>
              </div>
              <div className="text-lg font-bold text-[#6daa5c] flex justify-between">
                <span>Grand Total</span>
                <span>INR {total}</span>
              </div>
            </section>
            {/* ✅ payment button */}
            <PaymentButton
              amount={total}
              flightData={flightData}
              travelers={travelersForm}
              contact={contactDetails}
              disabled={isPaymentDisabled}
              user={user}
            />
            {!user && (
              <p className="text-red-500 text-sm mt-2">Please login to continue to payment</p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
