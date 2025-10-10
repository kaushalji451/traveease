"use client";
import React, { useState,useEffect } from 'react'
import { verifyUserToken } from '@/lib/auth';
import { useRouter } from 'next/navigation';

const Passangeform = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [user, setuser] = useState("");
    const [form, setForm] = useState({
        passengerType: '',
        firstName: '',
        lastName: '',
        dob: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
    });

    const [errors, setErrors] = useState({});

    // ✅ Fetch user from token and DB
    useEffect(() => {
        const fetchUser = async () => {
            if (typeof window !== "undefined") {
                const token = localStorage.getItem("token");
                if (token) {
                    const res = await verifyUserToken(token);
                    console.log(res);
                    if (res?.id) {
                        setuser(res.id);
                        console.log(res.id);
                    }
                }
            }
        };
        fetchUser();
    }, []);


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validate = () => {
        let newErrors = {};
        if (!form.passengerType) newErrors.passengerType = 'Required';
        if (!form.firstName) newErrors.firstName = 'Required';
        if (!form.dob) newErrors.dob = 'Required';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length !== 0) return;

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_AUTH_URL}/getuser/updateuser?userId=${user}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ...form,
                    }),
                }
            );

            const data = await res.json();
            if (res.ok) {
                console.log("Updated user:", data.user);
                router.push("/profile");
                router.refresh();
            } else {
                alert(data.error || "Update failed");
            }
        } catch (error) {
            console.error("Error updating user:", error);
            alert("Something went wrong");
        } finally {
        }
    };
    return (
        <div className="bg-white p-4 rounded shadow-lg my-6 max-w-5xl mx-auto">
            {/* Collapse toggle */}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between cursor-pointer border-b border-slate-300 pb-2 mb-3"
            >
                <h2 className="text-lg font-semibold">General Details</h2>
                <span className="text-xl transform transition-transform"
                    style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>⌄</span>
            </div>
            {isOpen && (
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Passenger Type */}
                        <div>
                            <label className="block text-sm font-medium">
                                Passenger Type <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="passengerType"
                                value={form.passengerType}
                                onChange={handleChange}
                                className="w-full mt-1 border border-slate-300 rounded px-3 py-2 focus:outline-none"
                            >
                                <option value="">Select</option>
                                <option value="Adult">Adult</option>
                                <option value="Child">Child</option>
                                <option value="Senior">Senior</option>
                            </select>
                            {errors.passengerType && <div className="text-red-500 text-xs">{errors.passengerType}</div>}
                        </div>
                        {/* First Name */}
                        <div>
                            <label className="block text-sm font-medium">
                                First Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                name="firstName"
                                value={form.firstName}
                                onChange={handleChange}
                                className="w-full mt-1 border border-slate-300 rounded px-3 py-2 focus:outline-none"
                                placeholder="First Name"
                            />
                            {errors.firstName && <div className="text-red-500 text-xs">{errors.firstName}</div>}
                        </div>
                        {/* Last Name */}
                        <div>
                            <label className="block text-sm font-medium">Last Name</label>
                            <input
                                name="lastName"
                                value={form.lastName}
                                onChange={handleChange}
                                className="w-full mt-1 border border-slate-300 rounded px-3 py-2 focus:outline-none"
                                placeholder="Last Name"
                            />
                        </div>
                    </div>

                    {/* Date of Birth */}
                    <div>
                        <label className="block text-sm font-medium">
                            Date of Birth <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type="date"
                                name="dob"
                                value={form.dob}
                                onChange={handleChange}
                                className="w-full mt-1 border border-slate-300 rounded px-3 py-2 focus:outline-none"
                                placeholder="dd-mm-yyyy"
                            />
                            {/* Calendar icon is optional */}
                        </div>
                        {errors.dob && <div className="text-red-500 text-xs">{errors.dob}</div>}
                    </div>

                    {/* Address, City, State */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium">Address</label>
                            <input
                                name="address"
                                value={form.address}
                                onChange={handleChange}
                                className="w-full mt-1 border border-slate-300 rounded px-3 py-2 focus:outline-none"
                                placeholder="Address"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">City</label>
                            <input
                                name="city"
                                value={form.city}
                                onChange={handleChange}
                                className="w-full mt-1 border border-slate-300 rounded px-3 py-2 focus:outline-none"
                                placeholder="City"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">State</label>
                            <input
                                name="state"
                                value={form.state}
                                onChange={handleChange}
                                className="w-full mt-1 border border-slate-300  rounded px-3 py-2 focus:outline-none"
                                placeholder="State"
                            />
                        </div>
                    </div>

                    {/* PinCode */}
                    <div>
                        <label className="block text-sm font-medium">PinCode</label>
                        <input
                            name="pincode"
                            value={form.pincode}
                            onChange={handleChange}
                            className="w-full mt-1 border border-slate-300 rounded px-3 py-2 focus:outline-none"
                            placeholder="Pincode"
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-[#A8E6A1] text-white py-2 px-8 rounded hover:bg-[#A8E6A1]"
                        >
                            Update
                        </button>
                    </div>
                </form>
            )}
        </div>
    )
}

export default Passangeform
