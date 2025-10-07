import React, { useState } from "react";

function TravelerForm({ index, data, onChange }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="mb-4 border border-slate-300 rounded-lg bg-white shadow-sm">
            {/* Header */}
            <button
                type="button"
                className="flex items-center justify-between w-full px-4 py-3 bg-gray-100 rounded-t-lg"
                onClick={() => setOpen(!open)}
            >
                <div className="flex items-center gap-2">
                    <input type="checkbox" checked={true} readOnly className="mr-2" />
                    <span className="text-lg font-semibold">Adult {index + 1}</span>
                </div>
                <span className="text-gray-600">{open ? "▲" : "▼"}</span>
            </button>

            {/* Collapsible Content */}
            {open && (
                <div className="p-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Gender */}
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">Gender</label>
                            <select
                                className="border rounded border-slate-400 p-2"
                                value={data.gender}
                                required
                                onChange={(e) =>
                                    onChange(index, { ...data, gender: e.target.value })
                                }
                            >
                                <option value="">Select</option>
                                <option value="MALE">Male</option>
                                <option value="FEMALE">Female</option>
                                <option value="OTHER">Others</option>
                            </select>
                        </div>

                        {/* First Name */}
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">First Name</label>
                            <input
                                className="border rounded border-slate-400 p-2"
                                type="text"
                                placeholder="Enter First Name"
                                required
                                value={data.firstName}
                                onChange={(e) =>
                                    onChange(index, { ...data, firstName: e.target.value })
                                }
                            />
                        </div>

                        {/* Date of Birth */}
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                            <input
                                className="border rounded border-slate-400 p-2"
                                type="date"
                                required
                                value={data.dateOfBirth}
                                onChange={(e) =>
                                    onChange(index, { ...data, dateOfBirth: e.target.value })
                                }
                            />
                        </div>
                    </div>

                    {/* Last Name */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1">Last Name</label>
                        <input
                            className="border rounded border-slate-400 p-2"
                            type="text"
                            placeholder="Enter Last Name"
                            required
                            value={data.lastName}
                            onChange={(e) =>
                                onChange(index, { ...data, lastName: e.target.value })
                            }
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Email */}
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                className="border rounded border-slate-400 p-2"
                                type="email"
                                placeholder="Enter Email Id"
                                required
                                value={data.email}
                                onChange={(e) =>
                                    onChange(index, { ...data, email: e.target.value })
                                }
                            />
                        </div>

                        {/* Contact Number */}
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                            <input
                                className="border rounded border-slate-400 p-2"
                                type="tel"
                                placeholder="Enter Contact Number"
                                required
                                value={data.contactNumber}
                                onChange={(e) =>
                                    onChange(index, { ...data, contactNumber: e.target.value })
                                }
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TravelerForm;
