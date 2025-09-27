"use client";

import { Suspense } from "react";
import HotelSearchPage from "@/components/hotel/resultpage/HotelSearchPage";

export default function page() {
  return (
    <Suspense fallback={<div className="p-6">Loading flights...</div>}>
      <HotelSearchPage />
    </Suspense>
  );
}
