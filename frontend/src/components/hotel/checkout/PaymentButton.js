"use client";
import { useState } from "react";
import { loadRazorpay } from "@/utils/loadRazorpay";
import { useRouter } from "next/navigation";

export default function PaymentButton({
  amount,
  guestDetails,
  contact,
  disabled,
  user,
  bookingReference,
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlePayment = async (e) => {
    e.preventDefault();

    // Disable button & show loading spinner
    setLoading(true);

    const res = await loadRazorpay("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) {
      alert("Razorpay SDK failed to load.");
      setLoading(false);
      return;
    }

    try {
      // Create Razorpay order
      const orderRes = await fetch(
        `${process.env.NEXT_PUBLIC_PAYMENT_URL}/payment/create-order`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount }),
        }
      );

      const orderData = await orderRes.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "RudrabhishekTravels",
        description: "Hotel Booking Payment",
        order_id: orderData.id,
        handler: async function (response) {
          // Verify payment
          const verifyRes = await fetch(
            `${process.env.NEXT_PUBLIC_PAYMENT_URL}/payment/verify`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            }
          );

          const verifyData = await verifyRes.json();

          if (verifyData.success) {
            console.log("✅ Booking Confirmed");
            console.log("Booking Reference:", bookingReference);
            console.log("Payment Response:", response);
            console.log(user);

            let saveddata = {
              userId: user.id,
              hotelBookings: bookingReference,
            };

            try {
              let data = await fetch(
                `${process.env.NEXT_PUBLIC_AUTH_URL}/user/add-hotel-booking`,
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(saveddata),
                }
              );

              let res = await data.json();
              console.log(res);
              console.log("booking saved successfully");

              router.push(
                `/profile/HotelSingleOrder?hotelbookingnumber=${bookingReference}`
              );
            } catch (error) {
              console.log(error);
              router.push(`/`);
            }
          } else {
            alert("Payment Verification Failed!");
          }
        },
        prefill: {
          name: `${guestDetails?.[0]?.firstName || "Guest"} ${
            guestDetails?.[0]?.lastName || ""
          }`,
          email: contact?.email || "test@example.com",
          contact: contact?.phone || "9876543210",
        },
        theme: { color: "#3399cc" },
        modal: {
          ondismiss: () => {
            // Re-enable button if user closes Razorpay popup
            setLoading(false);
          },
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Payment initiation failed:", error);
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={disabled || loading}
      className={`w-full flex items-center justify-center gap-2 py-3 rounded-md font-semibold transition
        ${
          disabled || loading
            ? "bg-gray-400 cursor-not-allowed opacity-60"
            : "bg-[#6daa5c] text-white hover:bg-[#54ba38]"
        }`}
    >
      {loading ? (
        <>
          <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          <span>Processing...</span>
        </>
      ) : (
        "Continue to Payment"
      )}
    </button>
  );
}
