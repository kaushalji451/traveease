"use client";
import React, { Suspense } from "react";
import HotelPage from "./HotelPage";

export default function Hotel() {
  return (
    <Suspense fallback={<div className="p-6">Loading hotel details...</div>}>
      <HotelPage />
    </Suspense>
  );
}
