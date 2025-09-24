"use client";
import React, { useState } from "react";

const trainFAQs = [
  {
    question: "How can I save while booking train tickets?",
    answer:
      "You can save by booking in advance, using promo codes, comparing prices on different platforms, and choosing trains with ongoing offers."
  },
  {
    question: "Can I book a train ticket with a local ID?",
    answer:
      "Yes, you can book tickets using government-issued ID proofs such as Aadhaar, PAN, Passport, Voter ID, or Driving License depending on the train booking rules."
  },
  {
    question: "How can I change my train journey?",
    answer:
      "You can modify your journey online if allowed by IRCTC policies, or contact customer support for assistance. Cancellation and rescheduling charges may apply."
  },
  {
    question: "Can I book train tickets for other passengers?",
    answer:
      "Yes, you can book tickets for family or friends by providing their details during the booking process."
  },
  {
    question: "How can I book Tatkal tickets effectively?",
    answer:
      "Prepare all passenger details in advance, use a fast and reliable internet connection, choose a single payment method, and monitor seat availability to increase your chances of booking Tatkal tickets."
  },
  {
    question: "How to check train status and updates?",
    answer:
      "You can check real-time train status, schedules, and updates via the RudrabhishekTravels platform or the IRCTC website/app."
  }
];

const TrainFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Train FAQs</h1>
      <div className="space-y-4">
        {trainFAQs.map((faq, index) => (
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

export default TrainFAQ;
