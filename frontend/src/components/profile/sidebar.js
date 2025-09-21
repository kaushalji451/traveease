"use client";
import React from 'react';
import Link from 'next/link';
import { FaUserAlt, FaTicketAlt, FaUsers, FaGift, FaWallet, FaCog, FaSignOutAlt } from "react-icons/fa";

const menuItems = [
    {
        title: "Account Information",
        description: "Manage your profile, bookings and more",
        icon: <FaUserAlt />,
        link: "/profile/myaccount"
    },
    {
        title: "Your Bookings",
        description: "Check your bookings",
        icon: <FaTicketAlt />,
        link: "/profile"
    },
    {
        title: "Co-Travellers",
        description: "Add or delete the respective traveler details",
        icon: <FaUsers />,
        link: "/profile"
    },
    {
        title: "Promo Codes",
        description: "Refer a Friend and Earn",
        icon: <FaGift />,
        link: "/profile"
    },
    {
        title: "Gift Cards/ Coupons",
        description: "Check savings on your booking",
        icon: <FaGift />,
        link: "/profile"
    },
    {
        title: "EMT Wallet",
        description: "Check & Manage your added wallet balance",
        icon: <FaWallet />,
        link: "/profile"
    },
    {
        title: "Settings",
        description: "Manage Notification, Fare Alert and more",
        icon: <FaCog />,
        link: "/profile"
    },
    {
        title: "Log Out",
        description: "",
        icon: <FaSignOutAlt />,
        link: "/logout"
    }
];

const Sidebar = () => {
    const handleClick = (e, title) => {
        // Disable navigation for "Account Information" on desktop
        if (title === "Account Information" && window.innerWidth >= 768) {
            e.preventDefault();
        }
    };

    return (
        <div className='w-full border border-gray-300 rounded-2xl'>
            <div className='p-5 border-b border-slate-400 max-sm:text-center'>
                <h1 className='text-xl font-semibold'>Mr. Smith</h1>
                <p>Joined Since 2025</p>
            </div>

            <div className='mb-5'>
                {menuItems.map((item, index) => (
                    <Link 
                        key={index} 
                        href={item.link} 
                        className='block'
                        onClick={(e) => handleClick(e, item.title)}
                    >
                        <div className={`
                            flex items-center border-b border-slate-400 cursor-pointer rounded-md
                            ${item.title === "Account Information" ? "min-md:bg-[#66BB6A]/30" : "hover:bg-[#66BB6A]/30"}
                        `}>
                            <div className='min-w-15  flex justify-center text-xl'>
                                {item.icon}
                            </div>
                            <div className='p-3'>
                                <h1 className='font-semibold text-xl'>{item.title}</h1>
                                {item.description && <p className='text-sm md:text-base'>{item.description}</p>}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
