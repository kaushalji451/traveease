"use client";
import React, { useState } from "react";
import { BiSolidPlaneAlt } from "react-icons/bi";
import { MdHotel } from "react-icons/md";
import { IoMdTrain } from "react-icons/io";
import { FaBus, FaUmbrellaBeach, FaCarAlt, FaRegAddressCard } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";
import { FaCircleUser, FaTableTennisPaddleBall } from "react-icons/fa6";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import Link from "next/link";
import Image from "next/image";

const navItems = [
  { icon: <BiSolidPlaneAlt />, label: "Flights", link: "/" },
  { icon: <MdHotel />, label: "Hotels+Train", link: "/hotel" },
  { icon: <IoMdTrain />, label: "Trains", link: "/hotel" },
  { icon: <FaBus />, label: "Bus", link: "/bus" },
  { icon: <FaUmbrellaBeach />, label: "Holiday", link: "/holiday" },
  { icon: <IoIosMore />, label: "More", link: "#" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="flex min-h-20 justify-center shadow-md bg-white">
      <div className="flex justify-between items-center w-full max-w-7xl px-5">
        {/* Logo */}
       <div className="flex items-center">
         <Image
          src={"/logo.png"}
          alt="logo"
          width={80}
          height={50}
        />
        <Link href={"/"} className="text-3xl font-bold tracking-wide text-[#2E7D32]">
          TRAVELEASE
        </Link>
       </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-3 h-full items-center">
          {navItems.map((item, index) => (
            <Link
              href={item.link}
              key={index}
              className="bg-white/10 transition-all duration-300 px-3 py-2 
                flex flex-col items-center justify-center min-w-16 rounded-xl cursor-pointer 
                shadow-sm hover:shadow-md hover:bg-blue-100"
            >
              <span className="text-xl">{item.icon}</span>
              <p className="text-sm font-medium">{item.label}</p>
            </Link>
          ))}
        </ul>

        {/* User Section (Desktop Only) */}
        <Link href={"/profile"} className="hidden md:flex px-3 py-2 gap-2 
        items-center justify-center min-w-20 rounded-xl text-white bg-[#2E7D32] cursor-pointer shadow-sm hover:shadow-md">
          <FaCircleUser className="text-xl" />
          <h1 className="font-medium">Hi</h1>
        </Link>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileOpen(true)}
          className="md:hidden text-3xl text-[#2E7D32]"
        >
          <HiMenuAlt3 />
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 ${mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Close Button */}
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-5 right-5 text-3xl text-[#2E7D32]"
        >
          <HiX />
        </button>

        {/* Sidebar Menu */}
        <ul className="flex flex-col gap-4 mt-16 px-6">
          {navItems.map((item, index) => (
            <Link
              href={item.link}
              key={index}
              className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer 
              hover:bg-blue-100 transition"
            >
              <span className="text-xl text-[#2E7D32]">{item.icon}</span>
              <p className="text-base font-medium">{item.label}</p>
            </Link>
          ))}
        </ul>

        {/* User Section inside Sidebar */}
        <Link href={"/profile"} className="mt-10 mx-6 p-4 flex items-center gap-3 rounded-xl bg-[#2E7D32] text-white cursor-pointer">
          <FaCircleUser className="text-2xl" />
          <h1 className="font-medium">Hi</h1>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
