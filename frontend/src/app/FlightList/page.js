

"use client";

import { Suspense } from "react";
import FlightSearchPage from "@/components/flight/resultpage/FlightSearchPage";

export default function page() {
  return (
    <Suspense fallback={<div className="p-6">Loading flights...</div>}>
      <FlightSearchPage />
    </Suspense>
  );
}
