"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Passangeform from '@/components/profile/passangeform';
import PassangerContact from '@/components/profile/passangercontact';
import PassportDetails from '@/components/profile/PassportDetails';
import VisaDetails from '@/components/profile/VisaDetails';
import FrequentFlyerDetails from '@/components/profile/FrequentFlyerDetails';
import Link from 'next/link';

const Page = () => {
    const router = useRouter();

    useEffect(() => {
        // Check window width on mount
        if (window.innerWidth >= 768) { // md breakpoint
            router.replace('/profile');
        }
    }, [router]);

    return (
        <div className="mt-6 min-h-screen px-4 sm:px-6 md:hidden">
            {/* Mobile Back Button */}
            <Link
                href="/profile"
                className="flex items-center text-[#66BB6A] font-semibold mb-6 hover:underline"
            >
                <span className="mr-2 text-lg">←</span> My Profile
            </Link>

            {/* Forms */}
            <Passangeform />
            <PassangerContact />
            <PassportDetails />
            <VisaDetails />
            <FrequentFlyerDetails />
        </div>
    )
}

export default Page;
