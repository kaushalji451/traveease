"use client";
import React from "react";
import { FaUserAlt, FaTicketAlt, FaUsers, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";

const menuItems = [
  {
    title: "Account Information",
    description: "Manage your profile, bookings and more",
    icon: <FaUserAlt />,
  },
  {
    title: "Your Bookings",
    description: "Check your bookings",
    icon: <FaTicketAlt />,
  },
  {
    title: "Co-Travellers",
    description: "Add or delete the respective traveler details",
    icon: <FaUsers />,
  },
  {
    title: "Settings",
    description: "Manage Notification, Fare Alert and more",
    icon: <FaCog />,
  },
  {
    title: "Log Out",
    description: "",
    icon: <FaSignOutAlt />,
  },
];

const Sidebar = ({ activeTab, setActiveTab }) => {
  const router = useRouter();

  const handleClick = (e, item) => {
    e.preventDefault();

    if (item.title === "Log Out") {
      handleLogout();
      return;
    }

    setActiveTab(item.title);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <div className="w-full border border-gray-300 rounded-2xl">
      <div className="p-5 border-b border-slate-400 max-sm:text-center">
      </div>

      <div className="mb-5">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`block cursor-pointer ${
              activeTab === item.title
                ? "bg-[#66BB6A]/30"
                : "hover:bg-[#66BB6A]/30"
            }`}
            onClick={(e) => handleClick(e, item)}
          >
            <div className="flex items-center border-b border-slate-400 rounded-md">
              <div className="min-w-15 flex justify-center text-xl">
                {item.icon}
              </div>
              <div className="p-3">
                <h1 className="font-semibold text-xl">{item.title}</h1>
                {item.description && (
                  <p className="text-sm md:text-base">{item.description}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
