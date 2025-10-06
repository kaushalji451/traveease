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

    const res = await loadRazorpay("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) {
      alert("Razorpay SDK failed to load.");
      return;
    }

    // Create Razorpay order
    const orderRes = await fetch(`${process.env.NEXT_PUBLIC_PAYMENT_URL}/payment/create-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });
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
        const verifyRes = await fetch(`${process.env.NEXT_PUBLIC_PAYMENT_URL}/payment/verify`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(response),
        });
        const verifyData = await verifyRes.json();

        if (verifyData.success) {
          setLoading(true);

          console.log("✅ Booking Confirmed");
          console.log("Booking Reference:", bookingReference);
          console.log("Payment Response:", response);
          console.log(user);

          let saveddata = {
            userId: user.id,
            hotelBookings: bookingReference
          };

          try {
            let data = await fetch(`${process.env.NEXT_PUBLIC_PAYMENT_URL}/user/add-hotel-booking`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(saveddata),
            });
            let res = await data.json();
            console.log(res)
            console.log("booking saved successfuly");
            router.push(`/profile/HotelSingleOrder?hotelbookingnumber=${bookingReference}`);
          } catch (error) {
            console.log(error);
            router.push(`/`);
          }

          setLoading(false);
        } else {
          alert("Payment Verification Failed!");
        }
      },
      prefill: {
        name: `${guestDetails?.[0]?.firstName || "Guest"} ${guestDetails?.[0]?.lastName || ""}`,
        email: contact?.email || "test@example.com",
        contact: contact?.phone || "9876543210",
      },
      theme: { color: "#3399cc" },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#6daa5c] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg font-semibold text-gray-700">Processing your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={handlePayment}
      disabled={disabled}
      className={`w-full py-3 rounded-md font-semibold transition
        ${disabled
          ? "bg-gray-400 cursor-not-allowed opacity-60"
          : "bg-[#6daa5c] text-white hover:bg-[#54ba38]"
        }`}>
      Continue to Payment
    </button>
  );
}
