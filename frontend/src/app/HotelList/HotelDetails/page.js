// "use client";
// import React, { useRef, useEffect, useState } from "react";
// import { useSearchParams, useRouter } from "next/navigation";

// const bookingPolicyList = [
//   "As per the government regulations, every guest above the 18 years has to carry a valid Photo ID. The identification proofs can be Driving License, Voters Card, Passport and Ration Card. Without valid ID, guests will not be allowed to check in.",
//   "EaseMyTrip.com will not be responsible for the check-in denied by the hotel due to the above-mentioned reason.",
//   "The primary guest checking-in to the hotel must be minimum of 18 years old. Children accompanying adults may be between 1 and 12 years.",
//   "Guests will be charged for extra bed, food and other facilities which are not mentioned in the booking and may vary as per the hotel.",
//   "If an extra bed is included in your booking, you may be provided with a folding cot or a mattress as an extra bed (depends on hotel).",
//   "Generally, check-in / check-out time varies from hotel to hotel and can be checked on the confirmation voucher, However, for early check-in or late check-out, you are advised to confirm the same directly from the concerned hotel.",
//   "The room tariff is inclusive of all taxes but the amount paid does not include charges for any additional services and facilities (such as room service, mini bar, snacks or telephone calls). These services will be charged by the hotel at the time of check-out.",
//   "If the hotel denies accommodation to the guests posing as a 'couple' on not providing suitable ID proof, EaseMyTrip.com will not be responsible for this condition and won’t provide any refund for such bookings.",
//   "The hotel reserves the right to decline accommodation to locals/city residents. EaseMyTrip.com will not be responsible for any check-in declined by the hotel or any refunds due to the above-mentioned reason.",
//   "For any modifications, users have to pay applicable cancellation/modification charges. Modified bookings will be subject to availability and may depend on the booking policy of the hotel. The cancellation/modification charges are standard and any waiver is on the discretion of the hotel.",
//   "In case of cancellation or modification, entire benefit (discount / cash back) on the actual booking amount will be forfeited.",
//   "EaseMyTrip.com reserves the right, at any time, without prior notice and liability and without assigning any reason whatsoever, to add/alter/modify/change or vary all of these terms and conditions or to replace, wholly or in part, this offer by another offer, whether similar to this offer or not, or to extend or withdraw it altogether.",
//   "In case of partial/full cancellation, the offer stands void, and the discount / cash back will be rolled back before processing the refunds.",
//   "Gala dinner charges which are applicable for Christmas and New Year dates would be extra and payable directly to the hotel. Please check with the hotel directly for more information on the same.",
//   "In case of any amendment (date change) in your hotel reservation, EaseMyTrip.com would inform and advise you about the availability and applicable new rates.",
//   "If payment has been received by credit/debit card, the refund shall be credited to the same card by which the payment was received. For all other cases, the refund will be made by Account Payee Cheque only.",
//   "Guests are requested to read the terms & conditions before making any booking under the offers running on EaseMyTrip.com.",
//   "If any city taxes applicable then it will be directly payable to hotel. For more information, kindly connect with hotelier directly.",
//   "All the information pertaining to the hotel including the category of the hotel, images, room type, amenities and facilities available at the hotel are as per the information provided by the hotel to EaseMyTrip.com. This information is for reference only. Any discrepancy that may exist between the website pictures and actual settings of the hotel shall be raised by the User with the hotel directly, and shall be resolved between the User and hotel. EaseMyTrip.com will have no responsibility in that process of resolution, and shall not take any liability for such discrepancies.",
//   "Refund, if any shall be processed by EaseMyTrip.com to the customer only upon receipt of the same from the concerned Hotel.",
//   "For any query or clarification, please write to us at care@easemytrip.com",
// ];

// function HotelPage() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const hotelId = searchParams.get("id"); // get ID from query
//   const [hotelData, setHotelData] = useState(null);
//   const [CheckIn, setCheckIn] = useState("");
//   const [CheckOut, setCheckOut] = useState("");

//   // Refs for scrolling
//   const roomsRef = useRef(null);
//   const overviewRef = useRef(null);
//   const amenitiesRef = useRef(null);
//   const locationRef = useRef(null);
//   const bookingPolicyRef = useRef(null);
//   const guestRatingRef = useRef(null);

//   const scrollToRef = (ref) => {
//     if (ref.current) {
//       window.scrollTo({
//         top: ref.current.offsetTop - 80, // offset for sticky nav
//         behavior: "smooth",
//       });
//     }
//   };

  
//     useEffect(() => {
//       console.log(hotelData);
//     }, [hotelData])

//   useEffect(() => {
//     if (!hotelId) {
//       router.push("/HotelList"); // no ID, redirect
//       return;
//     }

//     // Get hotel from localStorage
//     const storedData = localStorage.getItem(`hotel_${hotelId}`);
//     if (!storedData) {
//       console.log("No data found");
//       router.push("/HotelList"); // no data found, redirect
//       return;
//     }

//     setHotelData(JSON.parse(storedData));
//     setCheckIn(JSON.parse(storedData).CheckIn);
//     setCheckOut(JSON.parse(storedData).CheckOut);
//   }, [hotelId, router]);

//   if (!hotelData) return <div>Loading hotel details...</div>;

//   const { hotel, minRate, discount } = hotelData;
//   const EUR_TO_INR = 90; // Example conversion rate

//   // Room images placeholders - replace with real images if available
//   const roomImages = [
//     "https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=",
//     "https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=",
//     "https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=",
//     "https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=",
//   ];

//   return (
//     <div className="max-w-7xl mx-auto my-6 p-4 font-sans text-gray-800 selection:bg-orange-400 selection:text-white">
//       {/* Back Navigation */}
//       <div className="text-sm text-gray-600 mb-4 select-none">
//         <span className="underline cursor-pointer px-4 text-blue-700">
//           {hotel.destinationName}
//         </span>{" "}
//         <strong>{CheckIn},&nbsp; {CheckOut}</strong>, {}
//       </div>

//       {/* Hotel Info Card */}
//       <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden mb-6 border border-gray-200">
//         {/* Image Carousel Section */}
//         <div className="flex-shrink-0 md:w-2/3">
//           <div className="relative h-64 md:h-full overflow-hidden">
//             <img
//               src={roomImages[0]}
//               alt={`${hotel.name} main`}
//               className="object-cover w-full h-full"
//             />
//           </div>
//           {/* Thumbnail Images */}
//           <div className="flex space-x-2 p-2 overflow-x-auto bg-gray-50 border-t border-gray-200">
//             {roomImages.slice(1).map((img, i) => (
//               <img
//                 key={i}
//                 src={img}
//                 alt={`Thumbnail ${i + 1}`}
//                 className="w-24 h-16 object-cover rounded cursor-pointer hover:ring-2 hover:ring-orange-500 transition"
//               />
//             ))}
//           </div>
//         </div>

//         {/* Info & Pricing Section */}
//         <div className="p-6 flex flex-col justify-between w-full md:w-1/3">
//           <div>
//             <h2 className="text-2xl font-bold mb-1">{hotel.name}</h2>
//             <div className="flex flex-wrap items-center gap-2 mb-2">
//               <span className="inline-flex items-center bg-yellow-400 rounded px-2 py-0.5">
//                 {[...Array(3)].map((_, i) => (
//                   <svg
//                     key={i}
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-4 w-4 text-white"
//                     viewBox="0 0 20 20"
//                     fill="currentColor"
//                   >
//                     <path d="M9.049 2.927C9.349 2.07 10.65 2.07 10.951 2.927l1.286 3.994a1 1 0 00.95.69h4.21c.969 0 1.371 1.24.588 1.81l-3.404 2.476a1 1 0 00-.364 1.118l1.285 3.995c.3.857-.755 1.57-1.54 1.06l-3.403-2.475a1 1 0 00-1.175 0l-3.403 2.475c-.785.51-1.84-.203-1.54-1.06l1.285-3.995a1 1 0 00-.364-1.118L2.035 9.42c-.783-.57-.38-1.81.588-1.81h4.21a1 1 0 00.95-.69l1.286-3.994z" />
//                   </svg>
//                 ))}
//               </span>
//               <span className="text-sm text-gray-600 bg-blue-100  rounded px-2 py-0.5 select-none">
//                 Hotel
//               </span>
//             </div>
//             <div className="text-sm text-gray-500 mb-4 select-text">
//              {hotel.destinationName}
//             </div>

//             {/* Room description */}
//             <p className="text-base mb-4 leading-relaxed">
//               Day Use Room 6Hrs (Check In 9am - Check Out 3pm) (6 Hours stay between 09:00 to 15:00) <br />
//               <span className="text-sm text-gray-600">
//                 2 x Guest | 1 x Room
//               </span>
//             </p>

//             {/* Amenities tags */}
//             <div className="flex flex-wrap gap-2 text-sm mb-6 text-gray-700">
//               {["Restaurant", "Free Wi-Fi", "24-hour Room Service", "Gym", "Free toiletries"].map((amenity, idx) => (
//                 <span
//                   key={idx}
//                   className="inline-flex items-center bg-green-100 text-green-700 rounded px-3 py-1"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-4 w-4 mr-1"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                     strokeWidth={2}
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
//                   </svg>
//                   {amenity}
//                 </span>
//               ))}
//             </div>
//           </div>

//           {/* Pricing & Buttons */}
//           <div className="space-y-3">
//             <div className="flex items-end justify-end gap-4 text-right">
//               <div className="line-through text-gray-500 text-sm mt-0.5">₹{Math.floor(discount * EUR_TO_INR)}</div>
//               <div className="text-3xl font-bold text-black">₹{Math.floor(minRate *  EUR_TO_INR)}</div>
//             </div>

//             <div className="text-xs text-gray-600 text-right -mt-2">
//               ₹100 Taxes & fees <br /> Base price (Per Night)
//             </div>

//             <div className="flex gap-3 mt-4">
//               <button
//                 type="button"
//                 className="flex-1 border-2 border-orange-600 text-orange-600 rounded py-2 hover:bg-orange-50 font-semibold transition"
//               >
//                 Select Rooms
//               </button>
//               <button
//                 type="button"
//                 className="flex-1 bg-orange-600 text-white rounded py-2 hover:bg-orange-700 font-semibold transition shadow"
//               >
//                 Book Now
//               </button>
//             </div>

//             <div className="bg-yellow-50 border border-yellow-300 text-yellow-800 text-sm px-3 py-2 rounded mt-4 select-none">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="inline-block h-5 w-5 mr-1 align-middle"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth={2}
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 12V8m0 0L9 11" />
//               </svg>
//               Flat ₹500 Cashback on booking above ₹5,000
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Deal Drop Sale Banner */}
//       <div className="bg-blue-900 text-white rounded-lg font-semibold p-4 flex flex-col md:flex-row md:items-center md:justify-between mb-8">
//         <div className="flex items-center space-x-4 mb-3 md:mb-0">
//           <img
//             src="https://cdn-icons-png.flaticon.com/512/833/833472.png"
//             alt="Cashback icon"
//             className="w-10 h-10"
//           />
//           <div className="space-x-6 flex flex-wrap">
//             <span>Instant ₹500* Cashback</span>
//             <span>Up to 60% OFF*</span>
//             <span>Breakfast Upgrade</span>
//             <span>F&B Discounts</span>
//             <span>Special Coupon Offers</span>
//           </div>
//         </div>
//         <button className="bg-orange-600 hover:bg-orange-700 rounded px-6 py-2 font-bold transition self-start md:self-auto whitespace-nowrap">
//           Know More
//         </button>
//       </div>

//       {/* Sticky Tabs */}
//       <nav className="sticky top-0 z-20 bg-white border-b border-gray-200 mb-6 px-4">
//         <ul className="flex justify-between max-w-7xl mx-auto overflow-x-auto scrollbar-hide">
//           {[
//             { name: "Rooms", ref: roomsRef },
//             { name: "Overview", ref: overviewRef },
//             { name: "Amenities", ref: amenitiesRef },
//             { name: "Location", ref: locationRef },
//             { name: "Booking Policy", ref: bookingPolicyRef },
//             { name: "Guest Rating", ref: guestRatingRef },
//           ].map(({ name, ref }) => (
//             <li key={name} className="flex-1 text-center">
//               <button
//                 onClick={() => scrollToRef(ref)}
//                 className="py-3 px-4 font-medium text-gray-700 hover:text-orange-600 border-b-4 border-transparent hover:border-orange-600 w-full whitespace-nowrap"
//               >
//                 {name}
//               </button>
//             </li>
//           ))}
//         </ul>
//       </nav>

//       {/* All Sections Rendered Directly */}

//       {/* Rooms */}
//       <section ref={roomsRef} className="mb-10">
//         <h3 className="text-xl font-semibold mb-4 border-b border-orange-600 pb-2">Rooms</h3>
//         <div className="overflow-x-auto">
//           <table className="min-w-full border-collapse border border-gray-300 text-sm">
//             <thead className="bg-orange-100">
//               <tr className="text-left">
//                 <th className="p-3 border border-gray-300 font-semibold">Room Type</th>
//                 <th className="p-3 border border-gray-300 font-semibold">Benefits</th>
//                 <th className="p-3 border border-gray-300 font-semibold text-right">Per Night Price</th>
//               </tr>
//             </thead>
//             <tbody>
//               {hotel.rooms.map((room, idx) => {
//                 const rate = room.rates[0];
//                 const netPrice = rate ? parseFloat(rate.net) : 0;
//                 const offer = rate && rate.offers ? rate.offers[0] : null;
//                 const offerAmount = offer ? parseFloat(offer.amount) : 0;
//                 const discountedPrice = netPrice + offerAmount; // offerAmount is negative

//                 return (
//                   <tr key={idx} className="border-t border-gray-300 hover:bg-orange-50">
//                     <td className="p-3 border border-gray-300 font-semibold align-top">{room.name}</td>
//                     <td className="p-3 border border-gray-300 align-top text-green-700">
//                       {rate ? (
//                         <>
//                           <div className="font-semibold text-blue-900 mb-2">ROOM ONLY</div>
//                           <ul className="list-disc list-inside leading-relaxed">
//                             <li>Room only</li>
//                             <li>Free Wi-Fi</li>
//                             <li>Complimentary Mineral Water Daily 1 bottles</li>
//                             <li>Complimentary stay for children under 5 years without extra bed</li>
//                           </ul>
//                         </>
//                       ) : (
//                         "No rates available"
//                       )}
//                     </td>
//                     <td className="p-3 border border-gray-300 text-right align-top">
//                       {rate ? (
//                         <>
//                           {offer && (
//                             <div className="text-green-700 text-xs bg-green-100 rounded px-2 py-1 mb-1 inline-block font-semibold">
//                               Book Now and Get {Math.abs(offerAmount.toFixed(2))} {hotel.currency} OFF
//                             </div>
//                           )}
//                           {offer && (
//                             <div className="text-red-500 line-through text-xs mb-1">{netPrice.toFixed(2)} {hotel.currency}</div>
//                           )}
//                           <div className="text-lg font-bold">{discountedPrice.toFixed(2)} {hotel.currency}</div>
//                           <div className="text-xs text-gray-600">Per Night</div>
//                           <button
//                             className="mt-2 px-4 py-1 bg-orange-600 text-white rounded hover:bg-orange-700 transition"
//                             type="button"
//                           >
//                             Book Now
//                           </button>
//                         </>
//                       ) : (
//                         "N/A"
//                       )}
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       </section>

//       {/* Overview */}
//       <section ref={overviewRef} className="mb-10">
//         <h3 className="text-xl font-semibold mb-4 border-b border-orange-600 pb-2">Hotel Overview</h3>
//         <p className="leading-relaxed max-w-7xl">
//           <strong>{hotel.name}</strong> is a {hotel.categoryName} hotel located in {hotel.zoneName}. Enjoy a comfortable stay with premium rooms and top-notch amenities. The minimum room rate starts at {hotel.minRate} {hotel.currency}.
//         </p>
//       </section>

//       {/* Amenities */}
//       <section ref={amenitiesRef} className="mb-10 max-w-7xl">
//         <h3 className="text-xl font-semibold mb-4 border-b border-orange-600 pb-2">Amenities</h3>
//         <ul className="grid grid-cols-2 md:grid-cols-3 gap-3 text-gray-700">
//           <li>Restaurant</li>
//           <li>Free Wi-Fi</li>
//           <li>24-hour Room Service</li>
//           <li>Gym</li>
//           <li>Free toiletries</li>
//           <li>Parking facility (As per hotel policy)</li>
//           <li>Luggage Storage</li>
//           <li>Front Desk</li>
//           <li>Room service - On request</li>
//           <li>Doctor on call</li>
//         </ul>
//       </section>

//       {/* Location */}
//       <section ref={locationRef} className="mb-10 max-w-7xl">
//         <h3 className="text-xl font-semibold mb-4 border-b border-orange-600 pb-2">Location</h3>
//         <div className="border rounded overflow-hidden shadow-sm">
//           <iframe
//             title="Hotel Location"
//             src={`https://maps.google.com/maps?q=${hotel.latitude},${hotel.longitude}&z=15&output=embed`}
//             width="100%"
//             height="300"
//             style={{ border: "0" }}
//             allowFullScreen=""
//             loading="lazy"
//             referrerPolicy="no-referrer-when-downgrade"
//           ></iframe>
//         </div>
//         <div className="mt-2 text-gray-600 text-sm select-text">
//           Coordinates: {hotel.latitude}, {hotel.longitude} - {hotel.zoneName}
//         </div>
//       </section>

//       {/* Booking Policy */}
//       <section ref={bookingPolicyRef} className="mb-10 max-w-7xl">
//         <h3 className="text-xl font-semibold mb-4 border-b border-orange-600 pb-2">Booking Policy</h3>
//         <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 leading-relaxed max-h-72 overflow-y-auto pr-3 border border-gray-200 rounded p-3 bg-gray-50">
//           {bookingPolicyList.map((item, idx) => (
//             <li key={idx}>{item}</li>
//           ))}
//         </ul>
//       </section>

//       {/* Guest Rating */}
//       <section ref={guestRatingRef} className="mb-16 max-w-7xl">
//         <h3 className="text-xl font-semibold mb-4 border-b border-orange-600 pb-2">Guest Rating</h3>
//         <div className="text-green-700 font-bold text-3xl flex items-center">
//           <span>4.8</span>
//           <span className="ml-3 text-gray-600 text-xl select-none">(350 reviews)</span>
//         </div>
//       </section>

//       {/* Footer spacing */}
//       <footer className="mb-16" />
//     </div>
//   );
// }

// export default HotelPage;


"use client";
import React, { Suspense } from "react";
import HotelPage from "./HotelPage";

export default function Hotel() {
  return (
    <Suspense fallback={<div className="p-6">Loading hotel details...</div>}>
      <HotelPage />
    </Suspense>
  );
}
