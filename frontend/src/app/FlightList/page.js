

"use client";

import { Suspense } from "react";
import FlightSearchPage from "@/components/flight/resultpage/FlightSearchPage";
import Loader from "@/components/Loader";
export default function page() {
  return (
    <Suspense fallback={<Loader/>}>
      <FlightSearchPage />
    </Suspense>
  );
}
