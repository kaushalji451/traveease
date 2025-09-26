"use client";
import React from "react";

const FiltersSidebar = ({
  filters,
  airlineOptions,
  aircraftOptions,
  onFilterChange,
  onSidebarCheckbox,
  onPriceChange,
  showMobileSidebar,
  setShowMobileSidebar
}) => {
  return (
    <aside
      className={`bg-white border border-slate-300 shadow-lg rounded-lg  w-full px-4 py-5 ${
        showMobileSidebar
          ? "fixed inset-0 z-40 bg-white"
          : "lg:relative lg:translate-x-0"
      }`}
    >
      <div className="mb-5 flex items-center justify-between lg:justify-start">
        <h2 className="text-xl font-bold">Filters</h2>
        <button
          className="block lg:hidden text-2xl"
          onClick={() => setShowMobileSidebar(false)}
        >
          &times;
        </button>
      </div>

      {/* Popular Filters */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Popular Filters</h3>
        <label className="flex items-center gap-2 mb-1">
          <input
            type="checkbox"
            checked={filters.nonStopOnly}
            onChange={(e) => onFilterChange("nonStopOnly", e.target.checked)}
          />
          Non-stop Only
        </label>

        {["morning", "afternoon", "evening"].map((period) => (
          <label key={period} className="flex items-center gap-2 mb-1">
            <input
              type="checkbox"
              checked={filters.departPeriod === period}
              onChange={(e) =>
                onFilterChange("departPeriod", e.target.checked ? period : "")
              }
            />
            {period.charAt(0).toUpperCase() + period.slice(1)} Departure
          </label>
        ))}

        {airlineOptions.map((opt) => (
          <label key={opt.code} className="flex items-center gap-2 mb-1">
            <input
              type="checkbox"
              checked={filters.airlines.includes(opt.code)}
              onChange={(e) =>
                onSidebarCheckbox("airlines", opt.code, e.target.checked)
              }
            />
            {opt.name}
          </label>
        ))}
      </div>

      {/* Price Range */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Price Range (INR)</h3>
        <input
          type="range"
          min={0}
          max={10000}
          step={100}
          value={filters.price[0]}
          onChange={(e) => onPriceChange(Number(e.target.value), filters.price[1])}
          className="w-full mb-2"
        />
        <input
          type="range"
          min={0}
          max={10000}
          step={100}
          value={filters.price[1]}
          onChange={(e) => onPriceChange(filters.price[0], Number(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between text-sm mt-1">
          <span>{filters.price[0]}</span>
          <span>{filters.price[1]}</span>
        </div>
      </div>

      {/* Stops */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Stops</h3>
        {["nonstop", "1stop", "2plus"].map((stop) => (
          <label key={stop} className="flex items-center gap-2 mb-1">
            <input
              type="checkbox"
              checked={filters.stops.includes(stop)}
              onChange={(e) => onSidebarCheckbox("stops", stop, e.target.checked)}
            />
            {stop === "nonstop" ? "Non-stop" : stop === "1stop" ? "1 Stop" : "2+ Stops"}
          </label>
        ))}
      </div>

      {/* Aircraft */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Aircraft</h3>
        {aircraftOptions.map((opt) => (
          <label key={opt.code} className="flex items-center gap-2 mb-1">
            <input
              type="checkbox"
              checked={filters.aircraft.includes(opt.code)}
              onChange={(e) =>
                onSidebarCheckbox("aircraft", opt.code, e.target.checked)
              }
            />
            {opt.name}
          </label>
        ))}
      </div>
    </aside>
  );
};

export default FiltersSidebar;
