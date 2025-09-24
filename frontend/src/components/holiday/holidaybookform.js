"use client";
import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

const carouselImages = [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1454023492550-5696f8ff10e1?auto=format&fit=crop&w=1500&q=80",
];

const trendingDestinations = [
    { name: "Europe", image: "/europe.jpg" },
    { name: "Kerala", image: "/kerala.jpg" },
    { name: "Bali", image: "/Bali.jpg" },
    { name: "Kashmir", image: "/kashmir.jpg" },
    { name: "Vietnam", image: "/vietnam.jpg" },
];

const menuItems = [
    { label: "Easy Book", isNew: true },
    { label: "Honeymoon" },
    { label: "Pilgrimage" },
    { label: "Luxury" },
    { label: "Adventure" },
];
const Holidaybookform = () => {
    const [search, setSearch] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        if (search.trim()) {
            console.log("Searching for:", search);
        }
    };

    return (
        <div className="w-full min-h-screen bg-gray-50 font-sans">
            {/* HERO SECTION */}
            <div className="relative w-full h-[350px]">
                <Carousel
                    autoPlay
                    infiniteLoop
                    showThumbs={false}
                    showStatus={false}
                    showArrows={false}
                    interval={4000}
                    className="h-full"
                >
                    {carouselImages.map((img, idx) => (
                        <Image
                            key={idx}
                            src={img}
                            className="object-cover w-full h-[350px]"
                            alt={`Dubai Skyline ${idx + 1}`}
                            width={1500}
                            height={350}
                        />
                    ))}
                </Carousel>

                <div className="absolute inset-0 bg-gradient-to-b from-blue-400/40 via-white/0 to-white/80" />

                {/* TITLE & SEARCH */}
                <div className="absolute top-0 left-0 w-full flex flex-col items-center pt-12">
                    <h2
                        className="text-white text-3xl font-bold mb-1 tracking-tight"
                        style={{ fontFamily: "'EB Garamond', serif" }}
                    >
                        Dubai Tour Packages
                    </h2>
                    <div className="text-lg text-white font-semibold mb-4">
                        Where Every Experience Counts!
                    </div>

                    {/* SEARCH FORM */}
                    <form
                        onSubmit={handleSearch}
                        className="flex shadow-lg rounded-full overflow-hidden w-[90vw] max-w-2xl"
                    >
                        <div className="flex items-center bg-white px-4 flex-1">
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 mr-3" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Enter Your Dream Destination!"
                                className="w-full py-3 px-2 text-base outline-none"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-[#FFD54F]  text-white px-8 py-3 font-semibold text-lg hover:bg-[#FFD54F] transition-all"
                        >
                            Search
                        </button>
                    </form>
                </div>

                {/* MENU TABS STICKED TO BOTTOM */}
                <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 
                flex gap-3 sm:gap-6 bg-white/90 rounded-full p-2 sm:p-3 shadow-md 
                items-center overflow-x-auto max-w-[95%] sm:max-w-none whitespace-nowrap scrollbar-hide">
                    {menuItems.map((item) => (
                        <span
                            key={item.label}
                            className="flex items-center px-2 sm:px-3 py-1 rounded-full 
                 text-xs sm:text-sm relative"
                        >
                            {item.label}
                            {item.isNew && (
                                <span className="ml-1 text-[10px] sm:text-xs text-pink-600 font-bold bg-pink-100 px-1 rounded-full">
                                    NEW
                                </span>
                            )}
                        </span>
                    ))}
                </div>

            </div>

            {/* TOP TRENDING DESTINATIONS */}
            <div className="mt-12 flex flex-col items-center px-4">
                <h3 className="text-3xl font-extrabold  mb-1">
                    Top Trending Destinations
                </h3>
                <div className="mb-5 text-gray-500">
                    Explore the hottest travel spots around the globe.
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl">
                    {trendingDestinations.map((dest) => (
                        <div
                            key={dest.name}
                            className="flex flex-col items-center  rounded-xl  hover:shadow-md transition"
                        >
                            <Image
                                width={200}
                                height={200}
                                src={dest.image}
                                alt={dest.name}
                                className="rounded-2xl object-cover w-50 h-50 mb-3"
                            />
                            <div className="text-lg font-semibold">{dest.name}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Holidaybookform
