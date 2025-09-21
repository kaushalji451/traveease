"use client";
import React from "react";
import Holidaybookform from "@/components/holiday/holidaybookform";
import Holidaydeals from "@/components/holiday/holidaydeals";
import Holidaypack from "@/components/holiday/holidaypack";
import Holidaywhybookus from "@/components/holiday/holidaywhybookus";
export default function Page() {
  return (
    <div>
      {/* Booking Form */}
      <Holidaybookform />
      {/* Holiday Deals Section */}
      <Holidaydeals />
      {/* Holiday Packages Section */}
      <Holidaypack />
      {/* Why Book With Us Section */}
      <Holidaywhybookus />
    </div>
  );
}
