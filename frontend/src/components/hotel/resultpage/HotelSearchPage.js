"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import FiltersSidebar from "./FiltersSidebar";
import HotelsList from "./HotelsList";

function App() {
  const searchParams = useSearchParams();

  const [hotelsData, setHotelsData] = useState(null);
  const [CheckIn, setCheckIn] = useState("");
  const [CheckOut, setCheckOut] = useState("");
  const [filters, setFilters] = useState({
    price: [],
    starRatings: [],
    amenities: [],
    propertyTypes: [],
  });
  const [filtersOpen, setFiltersOpen] = useState(false);

  // ✅ Backend fetch
  useEffect(() => {
    const fetchData = async () => {
      const destinationCode = searchParams.get("destinationCode");
      const checkIn = searchParams.get("checkIn");
      const checkOut = searchParams.get("checkOut");
      const occupancy = searchParams.get("occupancy");

      if(searchParams.get("checkIn") && searchParams.get("checkOut")){
        setCheckIn(searchParams.get("checkIn"));
        setCheckOut(searchParams.get("checkOut"));
      }
      
      if (!destinationCode || !checkIn || !checkOut || !occupancy) return;

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_HOTEL_URL}/search?destinationCode=${destinationCode}&checkIn=${checkIn}&checkOut=${checkOut}&occupancy=${occupancy}`
        );
        const json = await res.json();
        console.log(json);
        setCheckIn(json.hotels?.checkIn);
        setCheckOut(json.hotels?.checkOut); 
        const hotelsArray = Array.isArray(json.hotels?.hotels) ? json.hotels.hotels : [];
        setHotelsData(hotelsArray);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();


  }, [searchParams]);

  const toggleFilter = (filterKey, value) => {
    setFilters((prev) => {
      const current = prev[filterKey];
      if (current.includes(value)) {
        return { ...prev, [filterKey]: current.filter((v) => v !== value) };
      } else {
        return { ...prev, [filterKey]: [...current, value] };
      }
    });
  };

  const resetFilters = () => {
    setFilters({ price: [], starRatings: [], amenities: [], propertyTypes: [] });
  };

  const filteredHotels = (hotelsData || []).filter((hotel) => {
    const priceMatch =
      filters.price.length === 0 ||
      filters.price.some((range) => {
        const minRate = parseFloat(hotel.minRate || hotel.rates?.[0]?.net || 0);
        if (range === "₹ 1 - ₹ 500") return minRate <= 500;
        if (range === "₹ 501 - ₹ 1000") return minRate > 500 && minRate <= 1000;
        if (range === "Above ₹ 1000") return minRate > 1000;
        return true;
      });

    const starMatch =
      filters.starRatings.length === 0 ||
      filters.starRatings.some((star) => hotel.categoryName.includes(star.split(" ")[0]));

    const amenitiesMatch =
      filters.amenities.length === 0 ||
      filters.amenities.every((a) => hotel.amenities?.includes(a));

    const typeMatch =
      filters.propertyTypes.length === 0 ||
      filters.propertyTypes.includes(hotel.propertyType || "Hotel");

    return priceMatch && starMatch && amenitiesMatch && typeMatch;
  });

  return (
    <div className="min-h-screen flex flex-col md:flex-row max-w-7xl mx-auto mt-4">
      {/* Mobile filter toggle */}
      <div className="md:hidden flex justify-between p-4 bg-white border-b border-gray-300">
        <h2 className="font-semibold text-lg">Hotels</h2>
        <button className="text-blue-600 font-semibold" onClick={() => setFiltersOpen(!filtersOpen)}>
          {filtersOpen ? "Close Filters" : "Open Filters"}
        </button>
      </div>

      <FiltersSidebar
        filters={filters}
        toggleFilter={toggleFilter}
        resetFilters={resetFilters}
        filtersOpen={filtersOpen}
      />

      <HotelsList filteredHotels={filteredHotels} CheckIn={CheckIn} CheckOut={CheckOut}/>
    </div>
  );
}

export default App;
