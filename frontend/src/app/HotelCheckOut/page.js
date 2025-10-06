"use client";
import React from 'react'
import { Suspense } from "react";
import Loader from "@/components/Loader";
import HotelCheckoutPage from '@/components/hotel/checkout/HotelCheckoutPage';

const page = () => {
    return (
        <Suspense fallback={<Loader />}>
            <HotelCheckoutPage />
        </Suspense>
    )
}

export default page
