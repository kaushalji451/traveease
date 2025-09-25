
"use client";
import React, { useEffect, useState, useMemo } from "react";
import FiltersSidebar from "@/components/flight/resultpage/FiltersSidebar";
import SortTabs from "@/components/flight/resultpage/SortTabs";
import DateSelector from "@/components/flight/resultpage/DateSelector";
import FlightsList from "@/components/flight/resultpage/FlightsList";
import { useSearchParams, useRouter } from "next/navigation";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [data, setData] = useState([]);
  const [dictionaries, setDictionaries] = useState({});
  const [loading, setLoading] = useState(true);

  const [activeSort, setActiveSort] = useState("best");
  const [expandedId, setExpandedId] = useState(null);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  // Filters
  const [filters, setFilters] = useState({
    airlines: [],
    price: [0, 10000],
    stops: [],
    aircraft: [],
    departPeriod: "",
    nonStopOnly: false,
  });

  // Dates
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  // Helpers
  const formatTime = (time) =>
    new Date(time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const formatDate = (time) => new Date(time).toISOString().split("T")[0];

  // Dummy data for testing
  const dummyResponse = {
    data: [
      {
        id: "1",
        price: { total: "4500", currency: "INR", grandTotal: "4800", base: "4000", fees: [] },
        validatingAirlineCodes: ["AI"],
        itineraries: [
          {
            duration: "PT2H30M",
            segments: [
              {
                number: "123",
                carrierCode: "AI",
                departure: { at: "2025-09-30T09:00:00", iataCode: "DEL", terminal: "3" },
                arrival: { at: "2025-09-30T11:30:00", iataCode: "BOM", terminal: "2" },
                aircraft: { code: "320" },
                numberOfStops: 0,
              },
            ],
          },
        ],
        travelerPricings: [
          {
            travelerType: "ADULT",
            cabin: "ECONOMY",
            class: "Y",
            brandedFareLabel: "Saver",
            fareDetailsBySegment: [
              {
                includedCheckedBags: { weight: 15, weightUnit: "KG" },
                amenities: [{ description: "Meal", isChargeable: false }],
              },
            ],
          },
        ],
      },
      {
        id: "2",
        price: { total: "6500", currency: "INR", grandTotal: "6800", base: "6000", fees: [] },
        validatingAirlineCodes: ["UK"],
        itineraries: [
          {
            duration: "PT2H10M",
            segments: [
              {
                number: "456",
                carrierCode: "UK",
                departure: { at: "2025-09-30T14:00:00", iataCode: "DEL", terminal: "3" },
                arrival: { at: "2025-09-30T16:10:00", iataCode: "BOM", terminal: "2" },
                aircraft: { code: "321" },
                numberOfStops: 0,
              },
            ],
          },
        ],
        travelerPricings: [
          {
            travelerType: "ADULT",
            cabin: "ECONOMY",
            class: "Y",
            brandedFareLabel: "Flex",
            fareDetailsBySegment: [
              {
                includedCheckedBags: { weight: 20, weightUnit: "KG" },
                amenities: [
                  { description: "Meal", isChargeable: false },
                  { description: "Wi-Fi", isChargeable: true },
                ],
              },
            ],
          },
        ],
      },
    ],
    dictionaries: {
      carriers: { AI: "Air India", UK: "Vistara" },
      aircraft: { "320": "Airbus A320", "321": "Airbus A321" },
    },
  };

  // Simulate API fetch with dummy data
  useEffect(() => {
    const fetchData = async () => {
      // --- Original backend call (commented out for testing) ---
      // const from = searchParams.get("from");
      // const to = searchParams.get("to");
      // const date = searchParams.get("date");
      // const returnDate = searchParams.get("returnDate");
      // const adults = searchParams.get("adults");
      // const travelClass = searchParams.get("class");

      // if (!from || !to || !date) {
      //   router.push("/");
      //   return;
      // }

      // try {
      //   setLoading(true);
      //   const res = await fetch(
      //     `http://localhost:5000/search?from=${from}&to=${to}&date=${date}&returnDate=${returnDate || ""}&adults=${adults}&class=${travelClass}`
      //   );
      //   const json = await res.json();
      //   setData(json.data || []);
      //   setDictionaries(json.dictionaries);
      // } catch (err) {
      //   console.error(err);
      // } finally {
      //   setLoading(false);
      // }

      // --- Dummy data instead of backend ---
      setLoading(true);
      await new Promise((res) => setTimeout(res, 500)); // simulate delay
      setData(dummyResponse.data);
      setDictionaries(dummyResponse.dictionaries);

      // Date selector range
      const firstDepart = dummyResponse.data[0].itineraries?.[0]?.segments?.[0]?.departure?.at;
      const defaultDate = formatDate(firstDepart);
      const range = [];
      const base = new Date(defaultDate);
      for (let i = -3; i <= 3; i++) {
        const d = new Date(base);
        d.setDate(d.getDate() + i);
        range.push(formatDate(d));
      }
      setDates(range);
      setSelectedDate(defaultDate);

      setLoading(false);
    };

    fetchData();
  }, [searchParams, router]);

  // Handlers
  const handleFilterChange = (key, value) => setFilters((prev) => ({ ...prev, [key]: value }));

  const handleSidebarCheckbox = (key, value, checked) =>
    setFilters((prev) => ({
      ...prev,
      [key]: checked ? [...prev[key], value] : prev[key].filter((v) => v !== value),
    }));

  const handlePriceChange = (min, max) => setFilters((prev) => ({ ...prev, price: [min, max] }));

  // Apply filters
  const filteredData = useMemo(() => {
    return data.filter((offer) => {
      const seg = offer.itineraries[0].segments[0];
      const carrierCode = seg.carrierCode;
      const aircraftCode = seg.aircraft.code;
      const depHour = new Date(seg.departure.at).getHours();

      if (filters.airlines.length > 0 && !filters.airlines.includes(carrierCode)) return false;
      const price = Number(offer.price.total);
      if (price < filters.price[0] || price > filters.price[1]) return false;
      if (filters.stops.length > 0) {
        const stops = seg.numberOfStops === 0 ? "nonstop" : seg.numberOfStops === 1 ? "1stop" : "2plus";
        if (!filters.stops.includes(stops)) return false;
      }
      if (filters.aircraft.length > 0 && !filters.aircraft.includes(aircraftCode)) return false;
      if (filters.departPeriod) {
        if (
          (filters.departPeriod === "morning" && !(depHour >= 6 && depHour < 12)) ||
          (filters.departPeriod === "afternoon" && !(depHour >= 12 && depHour < 18)) ||
          (filters.departPeriod === "evening" && !(depHour >= 18 && depHour < 24))
        ) {
          return false;
        }
      }
      if (filters.nonStopOnly && seg.numberOfStops !== 0) return false;

      return true;
    });
  }, [data, filters]);

  // Sorting
  const sortedData = useMemo(() => {
    const sorted = [...filteredData];
    if (activeSort === "cheapest") sorted.sort((a, b) => Number(a.price.total) - Number(b.price.total));
    if (activeSort === "fastest") sorted.sort((a, b) => a.itineraries[0].duration.localeCompare(b.itineraries[0].duration));
    return sorted;
  }, [filteredData, activeSort]);

  // Options for filters
  const airlineOptions = dictionaries.carriers
    ? Object.entries(dictionaries.carriers).map(([code, name]) => ({ code, name }))
    : [];
  const aircraftOptions = dictionaries.aircraft
    ? Object.entries(dictionaries.aircraft).map(([code, name]) => ({ code, name }))
    : [];

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className={`lg:w-1/4 ${showMobileSidebar ? "block" : "hidden lg:block"}`}>
        <FiltersSidebar
          filters={filters}
          airlineOptions={airlineOptions}
          aircraftOptions={aircraftOptions}
          onFilterChange={handleFilterChange}
          onSidebarCheckbox={handleSidebarCheckbox}
          onPriceChange={handlePriceChange}
          showMobileSidebar={showMobileSidebar}
          setShowMobileSidebar={setShowMobileSidebar}
        />
      </div>

      {/* Main content */}
      <div className="lg:w-3/4 w-full p-6">
        <button
          className="lg:hidden mb-4 px-4 py-2 bg-blue-600 text-white rounded shadow"
          onClick={() => setShowMobileSidebar(true)}
        >
          Filters
        </button>

        <DateSelector dates={dates} selectedDate={selectedDate} onDateSelect={setSelectedDate} />

        <SortTabs activeSort={activeSort} setActiveSort={setActiveSort} />

        <FlightsList
          sortedData={sortedData}
          dictionaries={dictionaries}
          expandedId={expandedId}
          setExpandedId={setExpandedId}
          formatTime={formatTime}
          loading={loading}
        />
      </div>
    </div>
  );
}