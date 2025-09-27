"use client";
import React from "react";
import FilterGroup from "./FilterGroup";
import { filtersData } from "./data/filtersData";

function FiltersSidebar({ filters, toggleFilter, resetFilters, filtersOpen }) {
  return (
    <aside
      className={`w-full md:w-[320px] max-w-[360px] bg-white border-gray-300 overflow-y-auto
      ${filtersOpen ? "block" : "hidden"} md:block`}
    >
      <div className="border border-slate-300 rounded-xl p-6 sticky top-4">
        <h1 className="text-xl font-semibold pb-2 border-b border-slate-300 mb-2">
          Filters
        </h1>
        <div className="flex justify-between items-center mb-4 md:hidden">
          <h2 className="font-semibold text-lg">Filters</h2>
          <button onClick={resetFilters} className="text-blue-600 underline text-sm">
            Reset
          </button>
        </div>

        <FilterGroup
          title="Price"
          options={filtersData.priceRanges}
          selected={filters.price}
          onToggle={(val) => toggleFilter("price", val)}
        />
        <FilterGroup
          title="Star Rating"
          options={filtersData.starRatings}
          selected={filters.starRatings}
          onToggle={(val) => toggleFilter("starRatings", val)}
        />
        <FilterGroup
          title="Amenities"
          options={filtersData.amenities}
          selected={filters.amenities}
          onToggle={(val) => toggleFilter("amenities", val)}
        />
        <FilterGroup
          title="Property Type"
          options={filtersData.propertyTypes}
          selected={filters.propertyTypes}
          onToggle={(val) => toggleFilter("propertyTypes", val)}
        />
      </div>
    </aside>
  );
}

export default FiltersSidebar;
