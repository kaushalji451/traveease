"use client";
import React from 'react';
import Cursole from '@/components/profile/cursole';
import Sidebar from '@/components/profile/sidebar';
import Passangeform from '@/components/profile/passangeform';
import PassangerContact from '@/components/profile/passangercontact';
import PassportDetails from '@/components/profile/PassportDetails';
import VisaDetails from '@/components/profile/VisaDetails';
import FrequentFlyerDetails from '@/components/profile/FrequentFlyerDetails';
import { useAuth } from "@/hooks/useAuth";
const Page = () => {
    const { loading } = useAuth();

    if (loading) return <p>Loading...</p>;


    return (
        <div className='max-w-7xl mx-auto min-h-screen mt-10 flex flex-col md:flex-row gap-10'>

            {/* Sidebar */}
            <div className='order-2 md:order-1 w-full md:w-1/4 '>
                <Sidebar />
            </div>

            {/* Main Content */}
            <div className='order-1 md:order-2 w-full md:w-3/4 '>
                {/* activity carousel */}
                <Cursole />

                {/* Forms: Hidden on mobile, visible on md and above */}
                <div className="hidden md:block mt-6">
                    <Passangeform />
                    <PassangerContact />
                    <PassportDetails />
                    <VisaDetails />
                    <FrequentFlyerDetails />
                </div>
            </div>
        </div>
    );
};

export default Page;
