"use client";

import { Suspense } from "react";
import HotelSearchPage from "@/components/hotel/resultpage/HotelSearchPage";
import Loader from "@/components/Loader";
export default function page() {
  return (
    <Suspense fallback={<Loader/>}>
      <HotelSearchPage />
    </Suspense>
  );
}
