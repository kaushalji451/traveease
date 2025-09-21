"use client"
import React, { useState } from "react";
import Flightbookform from "@/components/flight/flightbookform";
import Topflightroot from "@/components/flight/topflightroot";
import Whybookus from "@/components/flight/whybookus";
import Famousplace from "@/components/flight/famousplace";
import ExclusiveOffers from "@/components/flight/exclusiveOffers";
const page = () => {
  return (
    <div>
      {/* flight book form */}
      <Flightbookform />
      {/* ExclusiveOffers */}
      <ExclusiveOffers />
      {/* Top Flight Routes */}
      <Topflightroot />
      {/* famus place */}
      <Famousplace />
      {/* why book us */}
      <Whybookus />
    </div>
  )
}

export default page
