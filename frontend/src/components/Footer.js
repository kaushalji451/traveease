"use client";
import React, { useState } from "react";
import  Image from "next/image";

const Footer = () => {
  const [active, setActive] = useState("OUR OFFERINGS");

  const menuItems = [
    "OUR OFFERINGS",
    "QUICK LINKS",
    "POPULAR DESTINATION",
    "INTERNATIONAL DESTINATION",
    "POPULAR AIRLINE",
    "CONNECT WITH US",
    "OFFERS",
    "EMT INSIGHTS",
    "MEDIA",
    "INVESTOR RELATIONS",
    "CURRENT OPENINGS",
  ];

  const offerings = [
    ["Flights", "Hotels", "Trains", "Holidays"],
    ["Bus", "Cabs", "Flight Status", "Airlines"],
    ["Airports", "Travel Guides", "Check PNR Status", "EMT PRO"],
    ["Activities", "Travel Updates", "Corporate Travel", "Blog"],
    ["Flight Check-in", "VIP Cabs"],
  ];

  return (
    <footer className="bg-black/95 text-white">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row border-b border-white/20 p-6">
        {/* Sidebar / Menu */}
        <div className="md:w-64 md:border-r border-gray-700 md:pr-4">
          {/* Desktop (Sidebar) */}
          <ul className="hidden md:block">
            {menuItems.map((item) => (
              <li
                key={item}
                onClick={() => setActive(item)}
                className={`cursor-pointer py-2 px-3 text-sm border-b border-gray-700 transition
                  ${
                    active === item
                      ? "bg-green-600 text-white relative"
                      : "text-gray-300 hover:text-white"
                  }`}
              >
                {item}
                {active === item && (
                  <span className="absolute right-0 top-0 h-full w-2 bg-green-600"></span>
                )}
              </li>
            ))}
          </ul>

          {/* Mobile (Horizontal Tabs) */}
          <div className="md:hidden overflow-x-auto flex gap-4 pb-2 border-b border-gray-700">
            {menuItems.map((item) => (
              <button
                key={item}
                onClick={() => setActive(item)}
                className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm transition
                  ${
                    active === item
                      ? "bg-green-600 text-white"
                      : "text-gray-300 hover:text-white"
                  }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 md:pl-8 mt-6 md:mt-0">
          {active === "OUR OFFERINGS" && (
            <>
              <h2 className="text-lg font-semibold mb-4">
                Make your travel easy with a wide range of products and services.
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-sm">
                {offerings.map((col, idx) => (
                  <div key={idx} className="flex flex-col space-y-2">
                    {col.map((link) => (
                      <span
                        key={link}
                        className="hover:text-green-400 cursor-pointer flex items-center gap-2"
                      >
                        {link}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Middle Branding Section */}
      <div className="border-b border-white/10 px-6 md:px-10 py-6 text-center md:text-left">
        <div className="text-3xl flex items-center md:text-4xl font-bold py-2 text-green-500">
          <Image 
          src={"/logo.png"}
          alt="logo"
          width={80}
          height={50}
          /><span>TRAVELEASE</span>
        </div>
        <p className="text-sm md:text-base md:w-2/3 mx-auto md:mx-0 text-gray-300">
          Travelease offers 'End to End' travel solutions including air tickets
          for more than 400 international and domestic airlines, hotel bookings
          for nearly 1 million hotels in India and abroad, cab booking with
          4000+ cab operators, bus tickets with 2000+ bus operators, and railway
          tickets in India for all major cities.
        </p>
      </div>

      {/* Bottom Section */}
      <div className="py-4 bg-black/95 text-center text-xs md:text-sm text-white/50">
        <p>
          Copyright © {new Date(Date.now()).getFullYear()} EaseMyTrip. All
          Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
