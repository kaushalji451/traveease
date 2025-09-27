"use client";
import React from "react";

function FilterGroup({ title, options, selected, onToggle }) {
  return (
    <div className="mb-6">
      <h3 className="font-semibold text-sm mb-2">{title}</h3>
      <div className="flex flex-col gap-2 max-h-[130px] overflow-auto">
        {options.map((opt) => (
          <label key={opt} className="inline-flex items-center gap-2 cursor-pointer text-sm">
            <input
              type="checkbox"
              checked={selected.includes(opt)}
              onChange={() => onToggle(opt)}
              className="rounded border-gray-400"
            />
            <span>{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default FilterGroup;
