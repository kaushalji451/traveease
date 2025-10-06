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
                <div className="p-4">
                    <div className="flex gap-2 mb-3">
                        <select
                            className="border rounded border-slate-400 p-2 flex-1"
                            value={data.title}
                            required
                            onChange={(e) =>
                                onChange(index, { ...data, gender: e.target.value })
                            }
                        >
                            <option value="">Gender</option>
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                            <option value="OTHER">Others</option>
                        </select>
                        <input
                            className="border rounded border-slate-400 p-2 flex-1"
                            type="text"
                            placeholder="Enter First Name"
                            required
                            value={data.firstName}
                            onChange={(e) =>
                                onChange(index, { ...data, firstName: e.target.value })
                            }
                        />
                        {/* dateOfBirth */}
                        <input
                            className="border rounded border-slate-400 p-2 flex-1"
                            type="date"
                            placeholder="DOB"
                            required
                            value={data.dateOfBirth}
                            onChange={(e) =>
                                onChange(index, { ...data, dateOfBirth: e.target.value })
                            }
                        />
                    </div>
                    <input
                        className="border rounded border-slate-400 p-2 flex-1"
                        type="text"
                        placeholder="Enter Last Name"
                        required
                        value={data.lastName}
                        onChange={(e) =>
                            onChange(index, { ...data, lastName: e.target.value })
                        }
                    />

                    <div className="flex gap-2 mb-3">
                        <input
                            className="border rounded border-slate-400 p-2 flex-1"
                            type="email"
                            placeholder="Enter Email Id"
                            required
                            value={data.email}
                            onChange={(e) =>
                                onChange(index, { ...data, email: e.target.value })
                            }
                        />
                        <input
                            className="border rounded border-slate-400 p-2 flex-1"
                            type="text"
                            placeholder="Enter Contact Number"
                            required
                            value={data.contactNumber}
                            onChange={(e) =>
                                onChange(index, { ...data, contactNumber: e.target.value })
                            }
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default TravelerForm;
