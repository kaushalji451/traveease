"use client";
import React from 'react'
import Link from "next/link";
import Image from 'next/image';

const routes = [
  {
    from: "Chennai",
    to: "Mumbai",
    code: "MAA-BOM",
    img: "/chennai.jpg",
    link: "/flights/MAA-BOM",
  },
  {
    from: "Mumbai",
    to: "Chennai",
    code: "BOM-MAA",
    img: "/mumbai.jpg",
    link: "/flights/BOM-MAA",
  },
  {
    from: "Hyderabad",
    to: "Bangalore",
    code: "HYD-BLR",
    img: "/hyderabad.jpg",
    link: "/flights/HYD-BLR",
  },
  {
    from: "Delhi",
    to: "Ahmedabad",
    code: "DEL-AMD",
    img: "/delhi.jpg",
    link: "/flights/DEL-AMD",
  },
  {
    from: "Mumbai",
    to: "Dubai",
    code: "BOM-DXB",
    img: "/dubai.jpg",
    link: "/flights/BOM-DXB",
  },
  {
    from: "Mumbai",
    to: "Jaipur",
    code: "BOM-JAI",
    img: "/jaipur.jpg",
    link: "/flights/BOM-JAI",
  },
  {
    from: "Delhi",
    to: "Lucknow",
    code: "DEL-LKO",
    img: "/lucknow.jpg",
    link: "/flights/DEL-LKO",
  },
  {
    from: "Mumbai",
    to: "Kolkata",
    code: "BOM-CCU",
    img: "/kolkata.jpg",
    link: "/flights/BOM-CCU",
  },
  {
    from: "Delhi",
    to: "Dubai",
    code: "DEL-DXB",
    img: "/dubai.jpg",
    link: "/flights/DEL-DXB",
  },
];

const Topflightroot = () => {
  return (
    <section className="py-12">
         <h2 className="text-center text-2xl md:text-3xl font-bold mb-10">
           Top Flight Routes
         </h2>
   
         {/* Routes Grid */}
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6 md:px-20">
           {routes.map((route, idx) => (
             <Link
               href={route.link}
               key={idx}
               className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-100 transition"
             >
               <Image
                 src={route.img}
                 alt={`${route.from} to ${route.to}`}
                 width={64}
                 height={64}
                 className="rounded-lg object-cover h-20 w-20"
               />
               <div>
                 <p className="font-semibold">
                   {route.from} <span className="text-gray-500">↝</span> {route.to}
                 </p>
                 <p className="text-[#A8E6A1] font-medium">{route.code}</p>
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
                 To cancel/claim refund or reschedule/modify your booking.{" "}
                 <Link href="/refund" className="text-blue-600 underline">
                   Click here...
                 </Link>
               </p>
             </div>
           </div>
   
           <div className="flex items-center gap-4 p-5 border border-slate-200 rounded-tl-4xl bg-white shadow-md">
             <span className="text-3xl">✈️</span>
             <div>
               <h3 className="font-bold">Airline Notifications</h3>
               <p className="text-sm text-gray-600">
                 Get instant flight updates, notifications and travel alerts.{" "}
                 <Link href="/notifications" className="text-blue-600 underline">
                   Click here...
                 </Link>
               </p>
             </div>
           </div>
         </div>
       </section>
  )
}

export default Topflightroot
