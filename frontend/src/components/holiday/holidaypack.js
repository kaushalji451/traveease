"use client";
import React from "react";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

const holidayPackages = [
  { title: "Kerala", price: "₹ 11,999", img: "/kerala.jpg" },
  { title: "Andaman", price: "₹ 14,999", img: "/andaman.jpg" },
  { title: "Gujarat", price: "₹ 14,999", img: "/gujarat.jpg" },
  { title: "Rajasthan", price: "₹ 6,199", img: "/jaipur.jpg" },
];

const holidayThemes = [
  { title: "Family Retreat", icon: "👨‍👩‍👧", desc: "Explore Now" },
  { title: "Luxury", icon: "💎", desc: "Explore Now" },
  { title: "Weekend", icon: "🏙️", desc: "Explore Now" },
  { title: "Honeymoon", icon: "💑", desc: "Explore Now" },
  { title: "Adventure", icon: "🏞️", desc: "Explore Now" },
];

// Custom Arrows
const NextArrow = ({ onClick }) => (
  <div className="absolute right-[-10px] sm:right-[-20px] top-1/2 -translate-y-1/2 z-10">
    <button
      onClick={onClick}
      className="bg-white shadow-md p-2 sm:p-3 rounded-full hover:bg-gray-200"
    >
      <FaArrowRight className="text-[#A8E6A1] text-sm sm:text-base" />
    </button>
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div className="absolute left-[-10px] sm:left-[-20px] top-1/2 -translate-y-1/2 z-10">
    <button
      onClick={onClick}
      className="bg-white shadow-md p-2 sm:p-3 rounded-full hover:bg-gray-200"
    >
      <FaArrowLeft className="text-[#A8E6A1] text-sm sm:text-base" />
    </button>
  </div>
);

export default function Holidaypack() {
  // Holiday Packages slider settings
  const packageSettings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 3, // default for desktop
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024, // tablet
        settings: { slidesToShow: 2, slidesToScroll: 1 }
      },
      {
        breakpoint: 640, // mobile
        settings: {
          slidesToShow: 1,  // 1 slide on mobile
          slidesToScroll: 1,
          centerMode: true,  // center the card
          centerPadding: "20px" // adds side spacing
        }
      },
    ],
  };


  // Holiday Themes slider settings
  const themeSettings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 4, // default desktop
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024, // tablets
        settings: { slidesToShow: 3, slidesToScroll: 1 }
      },
      {
        breakpoint: 640, // mobile
        settings: {
          slidesToShow: 3,  // 3 slides on mobile
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "10px" // optional, adds side spacing
        }
      },
    ],
  };


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

      {/* Holiday Packages */}
      <div className="mb-10 sm:mb-14">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">
          Handpicked Holiday Packages
        </h2>
        <p className="text-gray-600 mb-6 text-sm sm:text-base">
          Indulge in unforgettable adventure with special tour plans.
        </p>

        <Slider {...packageSettings}>
          {holidayPackages.map((pkg, idx) => (
            <div key={idx} className="px-2 sm:px-3">
              <div className="relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition">
                <Image
                  src={pkg.img}
                  alt={pkg.title}
                  width={600}
                  height={400}
                  className="w-full h-48 sm:h-56 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-white/90 px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold">{pkg.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600">
                      From <span className="font-bold">{pkg.price}</span>
                    </p>
                  </div>
                  <Link
                    href="#"
                    className="text-[#66BB6A] font-semibold text-xs sm:text-sm"
                  >
                    Explore →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Holiday Themes */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">
          Explore Holidays By Theme
        </h2>
        <p className="text-gray-600 mb-6 text-sm sm:text-base">
          Find your perfect getaway, tailored to your interests.
        </p>

        <Slider {...themeSettings}>
          {holidayThemes.map((theme, idx) => (
            <div key={idx} className="px-4 flex-shrink-0"> {/* increased px and flex-shrink-0 */}
              <div className="flex flex-col items-center justify-center text-center bg-white 
                rounded-full border-2 border-[#A8E6A1] 
                w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 
                mx-auto shadow-md hover:shadow-lg transition">
                <div className="text-xl sm:text-2xl md:text-4xl">{theme.icon}</div>
                <h3 className="font-bold mt-1 sm:mt-2 text-xs sm:text-sm md:text-base">
                  {theme.title}
                </h3>
                <p className="text-[10px] sm:text-xs md:text-sm text-[#A8E6A1]">
                  {theme.desc}
                </p>
              </div>
            </div>
          ))}
        </Slider>

      </div>

    </div>
  );
}
