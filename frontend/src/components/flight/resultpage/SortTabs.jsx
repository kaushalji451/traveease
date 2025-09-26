"use client";
import React from "react";

const SortTabs = ({ activeSort, setActiveSort }) => {
  const tabs = ["best", "cheapest", "fastest"];
  return (
    <div className="flex gap-3 mb-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`px-4 py-2 rounded border font-semibold transition ${
            activeSort === tab
              ? "bg-[#6DAA5C]/50 text-[#fff] border-[#6DAA5C]/80"
              : "bg-white border-gray-300 text-gray-700 hover:bg-blue-50"
          }`}
          onClick={() => setActiveSort(tab)}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default SortTabs;
