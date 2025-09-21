"use client"
import React,{useState} from "react";
import Hotelbookform from "@/components/hotel/hotelbookform";
import Execlusiveoffershotel from "@/components/hotel/execlusiveoffershotel";
import Hoteldestini from "@/components/hotel/hoteldestini";
import Hotelwhybookus from "@/components/hotel/hotelwhybookus";
import Hotelfnq from "@/components/hotel/hotelfnq";
import HotelCrosule from "@/components/hotel/hotelCrosule";
const Page = () => {

  return (
    <div>
      <Hotelbookform />
      <Execlusiveoffershotel />
      <HotelCrosule/>
      <Hoteldestini />
      <Hotelwhybookus />
      <Hotelfnq />  

    </div>
  );
};

export default Page;
