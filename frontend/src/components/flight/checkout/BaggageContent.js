import React from "react";

export default function BaggageContent({ travelers }) {
  return (
    <div className="mt-4 text-sm text-gray-700">
      <table className="w-full border border-gray-300 text-left text-xs">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1 font-semibold">Traveler</th>
            <th className="border px-2 py-1 font-semibold">Check-in Baggage</th>
            <th className="border px-2 py-1 font-semibold">Cabin Baggage</th>
          </tr>
        </thead>
        <tbody>
          {travelers.map((trav) =>
            trav.fareDetailsBySegment.map((fd) => (
              <tr key={trav.travelerId + "-" + fd.segmentId}>
                <td className="border px-2 py-1">
                  #{trav.travelerId} ({trav.travelerType})
                  <br />
                  Segment {fd.segmentId}
                </td>
                <td className="border px-2 py-1 font-semibold text-center">
                  {fd.includedCheckedBags
                    ? `${fd.includedCheckedBags.weight} ${fd.includedCheckedBags.weightUnit}`
                    : "--"}
                </td>
                <td className="border px-2 py-1 font-semibold text-center">
                  {fd.includedCabinBags
                    ? `${fd.includedCabinBags.weight} ${fd.includedCabinBags.weightUnit}`
                    : "--"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
