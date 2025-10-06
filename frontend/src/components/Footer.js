"use client";
import React from "react";
import Image from "next/image";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 px-6 md:px-12 py-12">
        {/* Brand / About */}
        <div className="md:w-1/3">
          <div className="flex items-center gap-3 mb-3">
            <Image src="/logo1.png" alt="logo" width={60} height={40} />
            <span className="text-2xl font-bold text-[#6DAA5C]">
              RudrabhishekTravels
            </span>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">
            Offering end-to-end travel solutions including flights, hotels,
            trains, cabs, buses, and holiday packages. Travel with ease and
            comfort at the best prices.
          </p>
        </div>

        {/* Links Section (Quick Links + Destinations + Connect) */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#6DAA5C]">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="hover:text-[#6DAA5C] cursor-pointer">Flights</li>
              <li className="hover:text-[#6DAA5C] cursor-pointer">Hotels</li>
              <li className="hover:text-[#6DAA5C] cursor-pointer">Trains</li>
              <li className="hover:text-[#6DAA5C] cursor-pointer">Holiday Packages</li>
            </ul>
          </div>

          {/* Popular Destinations */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#6DAA5C]">Popular Destinations</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="hover:text-[#6DAA5C] cursor-pointer">Goa</li>
              <li className="hover:text-[#6DAA5C] cursor-pointer">Jaipur</li>
              <li className="hover:text-[#6DAA5C] cursor-pointer">Shimla</li>
              <li className="hover:text-[#6DAA5C] cursor-pointer">Kerala</li>
            </ul>
          </div>

          {/* Connect With Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#6DAA5C]">Connect With Us</h3>
            <div className="flex gap-4 text-xl text-gray-400">
              <FaFacebook className="hover:text-[#6DAA5C] cursor-pointer" />
              <FaTwitter className="hover:text-[#6DAA5C] cursor-pointer" />
              <FaInstagram className="hover:text-[#6DAA5C] cursor-pointer" />
              <FaLinkedin className="hover:text-[#6DAA5C] cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-white/10 py-4 text-center text-xs md:text-sm text-white/50">
        <p>
          © {new Date().getFullYear()} RudrabhishekTravels. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
