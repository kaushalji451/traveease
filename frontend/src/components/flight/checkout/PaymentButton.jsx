"use client";
import { useState } from "react";
import { loadRazorpay } from "@/utils/loadRazorpay";
import { useRouter } from "next/navigation";

export default function PaymentButton({ amount, flightData, travelers, contact, disabled, user }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);   // ✅ Final loading (after payment verification)
    const [buttonLoading, setButtonLoading] = useState(false); // ✅ Immediate loading after first click

    const handlePayment = async () => {
        if (disabled || buttonLoading) return; // prevent multiple clicks
        setButtonLoading(true); // ✅ Disable and show loading text immediately

        const res = await loadRazorpay("https://checkout.razorpay.com/v1/checkout.js");
        if (!res) {
            alert("Razorpay SDK failed to load. Check your connection.");
            setButtonLoading(false);
            return;
        }

        try {
            // ✅ Create order on backend
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
                description: "Flight Booking Payment",
                order_id: orderData.id,
                handler: async function (response) {
                    // ✅ Verify payment
                    const verifyRes = await fetch(`${process.env.NEXT_PUBLIC_PAYMENT_URL}/payment/verify`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(response),
                    });

                    const verifyData = await verifyRes.json();

                    if (verifyData.success) {
                        setLoading(true); // ✅ Full-screen loading

                        const bookingData = {
                            flightOffer: flightData,
                            travelers,
                            contact,
                            paymentDetails: response,
                            userId: user.id,
                        };

                        try {
                            const pnrRes = await fetch(`${process.env.NEXT_PUBLIC_FLIGHT_URL}/create-pnr`, {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify(bookingData),
                            });

                            const pnrData = await pnrRes.json();

                            if (pnrRes.ok) {
                                router.push(`/profile/FlightSingleOrder?pnr=${pnrData.pnr}`);
                            } else {
                                console.error("PNR creation failed:", pnrData);
                                setLoading(false);
                                setButtonLoading(false);
                            }
                        } catch (err) {
                            console.error("Error creating PNR:", err);
                            setLoading(false);
                            setButtonLoading(false);
                            alert("PNR creation failed. Check console for details.");
                        }
                    } else {
                        alert("Payment Verification Failed!");
                        setButtonLoading(false);
                    }
                },
                prefill: {
                    name: contact?.name || "Traveler",
                    email: contact?.email || "test@example.com",
                    contact: contact?.phone || "9876543210",
                },
                theme: { color: "#3399cc" },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (err) {
            console.error("Payment error:", err);
            setButtonLoading(false);
        }
    };

    // ✅ Full-page loader after successful verification
    if (loading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-[#6daa5c] border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-lg font-semibold text-gray-700">Processing your booking...</p>
                </div>
            </div>
        );
    }

    return (
        <button
            onClick={handlePayment}
            disabled={disabled || buttonLoading}
            className={`w-full py-3 rounded-md font-semibold transition
                ${(disabled || buttonLoading)
                    ? "bg-gray-400 cursor-not-allowed opacity-60"
                    : "bg-[#6daa5c] text-white hover:bg-[#54ba38]"
                }`}
        >
            {buttonLoading ? "Processing Payment..." : "Continue to Payment"}
        </button>
    );
}
