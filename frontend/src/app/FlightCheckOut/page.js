"use client";

import { Suspense } from "react";
import Loader from "@/components/Loader";
import FlightCheckOut from "@/components/flight/checkout/FlightCheckoutPage";

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <FlightCheckOut />
    </Suspense>
  );
}
