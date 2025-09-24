"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";

const offers = [
  {
    text: "Luxury AC Sleeper Buses – Save up to 30% on Goa trips",
    img: "/busscroll.jpg",
  },
  {
    text: "Delhi → Manali Volvo Bus – Starting from INR 899*",
    img: "/busscroll.jpg",
  },
  {
    text: "Student Bus Pass Deals – Extra 15% OFF on all routes",
    img: "/busscroll.jpg",
  },
  {
    text: "Lowest Price Guarantee – Find cheaper bus ticket, get refund",
    img: "/busscroll.jpg",
  },
  {
    text: "Weekend Getaway Bus Deals – Tickets under INR 499",
    img: "/busscroll.jpg",
  },
  {
    text: "Family Travel Bus Packages – Save more when you book together",
    img: "/busscroll.jpg",
  },
];


const Busoffer = () => {
  const carouselRef = useRef(null);

  const scroll = (direction) => {
    const width = carouselRef.current.offsetWidth / 3; // scroll by one card
    carouselRef.current.scrollBy({
      left: direction === "left" ? -width : width,
      behavior: "smooth",
    });
  };
  return (
    <div className="w-full px-4 py-8 bg-white">
      <h2 className="text-3xl font-bold text-center mb-8">Exclusive Offers</h2>
      <div className="relative">
        {/* Left Button */}
        <button
          className="absolute z-20 left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow ring-1 ring-gray-300 hover:bg-indigo-100 transition hidden md:flex"
          onClick={() => scroll("left")}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Cards Row with mask for blur edges */}
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-4 pr-4 md:pr-0 relative"
          style={{
            scrollbarWidth: "none",
            maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          }}
        >
          {offers.map((offer, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-[80%] sm:w-[45%] md:w-[30%] lg:w-[22%] rounded-2xl shadow bg-white flex flex-col overflow-hidden transition duration-300 hover:scale-105"
            >
              {/* Image */}
              <Image
                src={offer.img}
                alt="offer"
                width={400}
                height={200}
                className="h-40 w-full object-cover rounded-xl p-2"
              />

              {/* Text + Button */}
              <div className="p-4 flex flex-col justify-between ">
                <p className="text-sm text-gray-700 ">{offer.text}</p>
                <button className=" w-fit py-2">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Button */}
        <button
          className="absolute z-20 right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow ring-1 ring-gray-300 hover:bg-indigo-100 transition hidden md:flex"
          onClick={() => scroll("right")}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}



export default Busoffer