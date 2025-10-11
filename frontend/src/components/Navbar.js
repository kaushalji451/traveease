"use client";
import React, { useState, useEffect } from "react";
import { BiSolidPlaneAlt } from "react-icons/bi";
import { MdHotel } from "react-icons/md";
import { IoMdTrain } from "react-icons/io";
import { FaBus, FaUmbrellaBeach } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { IoIosMore } from "react-icons/io";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";

const navItems = [
  { icon: <BiSolidPlaneAlt />, label: "Flights", link: "/flight" },
  { icon: <MdHotel />, label: "Hotels", link: "/hotel" },
  { icon: <IoMdTrain />, label: "Trains", link: "/train" },
  { icon: <FaBus />, label: "Bus", link: "/bus" },
  { icon: <FaUmbrellaBeach />, label: "Holiday", link: "/" },
  { icon: <IoIosMore />, label: "More", link: "#" },
];

const Navbar = () => {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null); // null = not checked, {} = logged in

  // Check token on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) return setUser(null);

      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_AUTH_URL}/verify`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(res);
        if (res.status === 200) {
          setUser(res.data.user); // assume backend returns { user: {...} }
        } else {
          setUser(null);
        }
      } catch (err) {
        if (err.response?.status === 401) {
          // Token invalid
          localStorage.removeItem("token");
          setUser(null);
        } else {
          // Some other error (network, server down)
          console.error(err);
        }
      }
    };
    checkAuth();


    const handleUserLogin = () => checkAuth(); // custom event
  window.addEventListener("user-login", handleUserLogin);

  return () => {
    window.removeEventListener("user-login", handleUserLogin);
  };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/");
  };

  return (
    <nav className="flex min-h-20 justify-center shadow-md bg-white relative">
      <div className="flex justify-between items-center w-full max-w-7xl px-5 max-sm:ps-0">
        {/* Logo */}
        <div className="flex items-center">
          <Image src={"/logo1.png"} alt="logo" width={80} height={50} />
          <Link
            href={"/"}
            className="text-2xl font-bold tracking-wide text-[#6DAA5C]"
          >
            RudrabhishekTravels
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

        {/* User Section (Desktop with Dropdown) */}
        <div className="hidden md:block relative">
          <div className="group">
            <button className="flex items-center gap-2 px-3 py-2 rounded-xl text-white bg-gradient-to-b from-[#6DAA5C] via-[#7FBF6D] to-[#98D487] shadow-sm hover:shadow-md">
              <FaCircleUser />
              <h1 className="font-medium">{user ? `Hi, ${user.email}` : "Account"}</h1>
            </button>

            {/* Dropdown */}
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-md opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50">
              {user ? (
                <>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                  >
                    Signup
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>


        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileOpen(true)}
          className="md:hidden text-3xl text-[#A8E6A1]"
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
          className="absolute top-5 right-5 text-3xl text-[#A8E6A1]"
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
              onClick={() => setMobileOpen(false)}
            >
              <span className="text-xl text-[#A8E6A1]">{item.icon}</span>
              <p className="text-base font-medium">{item.label}</p>
            </Link>
          ))}
        </ul>

        {/* User Section inside Sidebar */}
        <div className="mt-10 mx-6 p-4 flex flex-col gap-2 rounded-xl bg-gradient-to-b from-[#6DAA5C] via-[#7FBF6D] to-[#98D487] text-white cursor-pointer">
          {user ? (
            <>
              <Link href="/profile" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
                <FaCircleUser className="text-2xl" />
                <h1 className="font-medium">Profile</h1>
              </Link>
              <button
                onClick={handleLogout}
                className="text-left px-2 py-1 hover:bg-green-600 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="block hover:underline" onClick={() => setMobileOpen(false)}>
                Login
              </Link>
              <Link href="/auth/signup" className="block hover:underline" onClick={() => setMobileOpen(false)}>
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
