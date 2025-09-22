"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

// Replace these routes with actual popular train routes
const trainRoutes = [
  {
    from: "Delhi",
    to: "Mumbai",
    code: "NDLS-BCT",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9SRRmhH4X5N2e4QalcoxVbzYsD44C-sQv-w&s", // sample train image
    link: "/trains/NDLS-BCT",
  },
  {
    from: "Mumbai",
    to: "Chennai",
    code: "CSTM-MAS",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9SRRmhH4X5N2e4QalcoxVbzYsD44C-sQv-w&s",
    link: "/trains/CSTM-MAS",
  },
  {
    from: "Hyderabad",
    to: "Bangalore",
    code: "HYB-SBC",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9SRRmhH4X5N2e4QalcoxVbzYsD44C-sQv-w&s",
    link: "/trains/HYB-SBC",
  },
  {
    from: "Delhi",
    to: "Lucknow",
    code: "NDLS-LKO",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9SRRmhH4X5N2e4QalcoxVbzYsD44C-sQv-w&s",
    link: "/trains/NDLS-LKO",
  },
  {
    from: "Kolkata",
    to: "Patna",
    code: "KOAA-PAT",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9SRRmhH4X5N2e4QalcoxVbzYsD44C-sQv-w&s",
    link: "/trains/KOAA-PAT",
  },
  {
    from: "Bangalore",
    to: "Goa",
    code: "SBC-DBO",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9SRRmhH4X5N2e4QalcoxVbzYsD44C-sQv-w&s",
    link: "/trains/SBC-DBO",
  },
];

const Toptrainroutes = () => {
  return (
    <section className="py-12 max-w-7xl mx-auto">
      <h2 className="text-center text-2xl md:text-3xl font-bold mb-10">
        Top Train Routes
      </h2>

      {/* Routes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6 md:px-20">
        {trainRoutes.map((route, idx) => (
          <Link
            href={route.link}
            key={idx}
            className="flex items-center gap-4 p-4 border border-[#66BB6A] rounded-lg bg-[#66BB6A]/30 transition"
          >
            <Image
              src={route.img}
              alt={`${route.from} to ${route.to}`}
              width={64}
              height={64}
              className="rounded-lg object-cover"
            />
            <div>
              <p className="font-semibold">
                {route.from} <span className="text-gray-500">↝</span> {route.to}
              </p>
              <p className="text-[#66BB6A] font-medium">{route.code}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Info Cards */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 px-6 md:px-20">
        <div className="flex items-center gap-4 p-5 border border-slate-200 rounded-tl-4xl bg-white shadow-md">
          <span className="text-3xl">📄</span>
          <div>
            <h3 className="font-bold">Important Info:</h3>
            <p className="text-sm text-gray-600">
              To cancel, claim refund, or reschedule your train booking.{" "}
              <Link href="/refund" className="text-blue-600 underline">
                Click here...
              </Link>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-5 border border-slate-200 rounded-tl-4xl bg-white shadow-md">
          <span className="text-3xl">🚉</span>
          <div>
            <h3 className="font-bold">Train Notifications</h3>
            <p className="text-sm text-gray-600">
              Get instant updates, live train status, and travel alerts.{" "}
              <Link href="/notifications" className="text-blue-600 underline">
                Click here...
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Toptrainroutes;
