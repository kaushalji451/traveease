import React, { useState } from "react";

export default function TravelerDropdown({ traveler }) {
  const [open, setOpen] = useState(false);
  const URO_TO_INR = 104;

  return (
    <div className="mb-3 border border-slate-300 rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
      {/* Header Button */}
      <button
        className="w-full flex items-center justify-between text-left text-sm sm:text-base font-semibold bg-gray-100 py-3 px-4 rounded-t-lg hover:bg-gray-200 transition-colors duration-200"
        onClick={() => setOpen((o) => !o)}
      >
        <div>
          Traveler {traveler.travelerId}
          <span className="text-xs sm:text-sm text-gray-500 ml-2">
            ({traveler.travelerType})
          </span>
        </div>
        <span className="text-gray-600 text-base">{open ? "▲" : "▼"}</span>
      </button>

      {/* Dropdown Content */}
      {open && (
        <div className="bg-white border-t border-gray-200 rounded-b p-4 text-xs sm:text-sm overflow-x-auto">
          <div className="mb-2">
            <strong>Fare Option:</strong> {traveler.fareOption}
          </div>
          <div className="mb-3">
            <strong>Total Price:</strong> INR{" "}
            {Math.floor(traveler.price.total * URO_TO_INR)}
          </div>

          <div>
            <strong>Segments Fare Details:</strong>

            {/* Responsive Table */}
            <div className="mt-2 overflow-x-auto rounded-lg border border-gray-300">
              <table className="w-full min-w-[500px] border-collapse">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="border px-3 py-2 text-left">Segment</th>
                    <th className="border px-3 py-2 text-left">Cabin</th>
                    <th className="border px-3 py-2 text-left">Class</th>
                    <th className="border px-3 py-2 text-left">Checked Bags</th>
                    <th className="border px-3 py-2 text-left">Cabin Bags</th>
                  </tr>
                </thead>
                <tbody>
                  {traveler.fareDetailsBySegment.map((fd) => (
                    <tr
                      key={fd.segmentId}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="border px-3 py-2">{fd.segmentId}</td>
                      <td className="border px-3 py-2">{fd.cabin}</td>
                      <td className="border px-3 py-2">{fd.class}</td>
                      <td className="border px-3 py-2">
                        {fd.includedCheckedBags
                          ? `${fd.includedCheckedBags.weight} ${fd.includedCheckedBags.weightUnit}`
                          : "--"}
                      </td>
                      <td className="border px-3 py-2">
                        {fd.includedCabinBags
                          ? `${fd.includedCabinBags.weight} ${fd.includedCabinBags.weightUnit}`
                          : "--"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
