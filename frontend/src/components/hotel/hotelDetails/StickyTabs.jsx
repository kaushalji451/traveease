"use client";
import React from "react";

function StickyTabs({ sections, onScroll }) {
  return (
    <nav className="sticky top-0 z-20 bg-white border-b border-gray-200 mb-6 px-4">
      <ul className="flex justify-between max-w-7xl mx-auto overflow-x-auto scrollbar-hide">
        {sections.map(({ name, ref }) => (
          <li key={name} className="flex-1 text-center">
            <button
              onClick={() => onScroll(ref)}
              className="py-3 px-4 font-medium text-gray-700 hover:text-[#6daa5c] border-b-4 border-transparent hover:border-[#6daa5c] w-full whitespace-nowrap"
            >
              {name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default StickyTabs;
