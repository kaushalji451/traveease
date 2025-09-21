"use client";
import React from 'react'
import { useState } from 'react'

const faqs = [
  {
    question: "How can I save while booking hotels?",
    answer:
      "You can save by booking in advance, using coupon codes, comparing prices on different platforms, and choosing hotels with ongoing offers."
  },
  {
    question: "Can I book a hotel with a local ID?",
    answer:
      "Yes, many hotels allow booking with a local ID. However, it depends on the hotel’s policy. Always check before booking."
  },
  {
    question: "How can I get early check-in or late check-out in a hotel?",
    answer:
      "You can request early check-in or late check-out while booking or directly call the hotel. Some hotels may charge extra."
  },
  {
    question: "How can unmarried couples book hotels in India?",
    answer:
      "Unmarried couples can book hotels in India if the hotel is couple-friendly. Always check hotel policies before booking."
  },
  {
    question: "How can I book cheap hotel rooms in 5 star hotels?",
    answer:
      "Look for discounts, book during off-seasons, use loyalty points, or search across multiple booking platforms."
  },
  {
    question: "How to book hotel online?",
    answer:
      "You can book hotels online through booking websites or apps by selecting your dates, choosing a hotel, and making the payment."
  }
];

const Hotelfnq = () => {
       const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
         
<div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">FAQs</h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border-b  border-slate-200 shadow-sm p-4 bg-white"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center text-left font-medium text-lg focus:outline-none"
            >
              {faq.question}
              <span className="text-xl">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>
            {openIndex === index && (
              <p className="mt-3 text-gray-600">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Hotelfnq
