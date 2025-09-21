"use client";
import React, { useState } from "react";

const faqs = [
  {
    question: "How can I save while booking bus tickets?",
    answer:
      "You can save by booking in advance, using discount coupons, comparing fares across platforms, and traveling during non-peak hours."
  },
  {
    question: "Can I book a bus ticket at the last minute?",
    answer:
      "Yes, you can book a bus ticket at the last minute if seats are available. However, fares may be higher and seat options limited."
  },
  {
    question: "How can I choose my preferred seat while booking a bus?",
    answer:
      "Most bus operators allow you to select your preferred seat during the booking process on the website or app."
  },
  {
    question: "Can I cancel or reschedule my bus ticket?",
    answer:
      "Yes, bus tickets can be canceled or rescheduled depending on the operator’s cancellation policy. Some may charge a small fee."
  },
  {
    question: "Is ID proof required while traveling on a bus?",
    answer:
      "Yes, a valid ID proof is usually required while boarding the bus. Carry the same ID used during the booking process."
  },
  {
    question: "How to book a bus ticket online?",
    answer:
      "You can book bus tickets online by selecting your source, destination, travel date, choosing your seat, and making the payment."
  }
];

const Busfnq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Bus Booking FAQs</h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border-b border-slate-200 shadow-sm p-4 bg-white"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center text-left font-medium text-lg focus:outline-none"
            >
              {faq.question}
              <span className="text-xl">{openIndex === index ? "−" : "+"}</span>
            </button>
            {openIndex === index && (
              <p className="mt-3 text-gray-600">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Busfnq;
