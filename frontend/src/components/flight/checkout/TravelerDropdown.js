import React, { useState } from "react";

export default function TravelerDropdown({ traveler }) {
  const [open, setOpen] = useState(false);

  const URO_TO_INR = 104;
  return (
    <div className="mb-2">
      <button
        className="w-full text-left text-sm font-semibold bg-gray-100 py-2 px-3 rounded hover:bg-gray-200"
        onClick={() => setOpen((o) => !o)}
      >
        Traveler {traveler.travelerId} <span className="text-xs text-gray-500 ml-2">({traveler.travelerType})</span>
        <span className="float-right">{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div className="bg-white border border-t-0 border-gray-200 rounded-b p-3 text-xs">
          <div className="mb-1"><strong>Fare Option:</strong> {traveler.fareOption}</div>
          <div className="mb-1"><strong>Total Price:</strong> INR {Math.floor(traveler.price.total * URO_TO_INR)}</div>
          <div>
            <strong>Segments Fare Details:</strong>
            <table className="w-full border border-gray-300 mt-2 text-xs">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border px-2 py-1">Segment</th>
                  <th className="border px-2 py-1">Cabin</th>
                  <th className="border px-2 py-1">Class</th>
                  <th className="border px-2 py-1">Checked Bags</th>
                  <th className="border px-2 py-1">Cabin Bags</th>
                </tr>
              </thead>
              <tbody>
                {traveler.fareDetailsBySegment.map((fd) => (
                  <tr key={fd.segmentId}>
                    <td className="border px-2 py-1">{fd.segmentId}</td>
                    <td className="border px-2 py-1">{fd.cabin}</td>
                    <td className="border px-2 py-1">{fd.class}</td>
                    <td className="border px-2 py-1">{fd.includedCheckedBags ? `${fd.includedCheckedBags.weight} ${fd.includedCheckedBags.weightUnit}` : "--"}</td>
                    <td className="border px-2 py-1">{fd.includedCabinBags ? `${fd.includedCabinBags.weight} ${fd.includedCabinBags.weightUnit}` : "--"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
