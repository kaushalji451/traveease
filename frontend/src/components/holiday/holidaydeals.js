"use client";
import React from "react";
import Image from "next/image";
const deals = [
  {
    title: "KASHMIR",
    duration: "5 Nights / 6 Days",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "BALI",
    duration: "4 Nights / 5 Days",
    img: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "KERALA",
    duration: "4 Nights / 5 Days",
    img: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=500&q=80",
  },
  {
    title: "HIMACHAL PRADESH",
    duration: "5 Nights / 6 Days",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "THAILAND",
    duration: "4 Nights / 5 Days",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "SINGAPORE",
    duration: "3 Nights / 4 Days",
    img: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=500&q=80",
  },
];

const testimonialImages = [
  {
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
  {
    img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=300&q=80",
  },
  {
    img: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=300&q=80",
  },
];
const Holidaydeals = () => {
  return (
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 max-w-3xl">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Deals You Can't Miss
          </h2>
          <p className="mt-2 text-gray-600">
            Travel beyond boundaries with incredible savings
          </p>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {deals.map((deal, idx) => (
            <div
              key={idx}
              className="relative rounded-xl overflow-hidden shadow-md hover:shadow-lg transition"
            >
              {/* FIXED SIZE WITH ASPECT RATIO */}
              <div className="w-full">
                <Image
                  src={deal.img}
                  alt={deal.title}
                  width={400}
                  height={300}
                  className="object-cover w-full aspect-[4/3] sm:aspect-[3/2] lg:aspect-[5/4]"
                />
              </div>

              {/* Overlay */}
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent px-4 py-3">
                <h3 className="text-white font-extrabold text-lg">
                  {deal.title}
                </h3>
                <p className="text-gray-200 text-sm">{deal.duration}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Section */}
        <section className="bg-gradient-to-r bg-[#66BB6A] rounded-2xl p-8 flex flex-col md:flex-row items-center gap-6 overflow-hidden relative">
          {/* Left Content */}
          <div className="text-white flex-1 max-w-xl">
            <p
              className="text-3xl font-script font-[cursive] mb-2 select-none"
              style={{ fontFamily: "'Dancing Script', cursive" }}
            >
              Built On Trust,
            </p>
            <h3 className="text-4xl font-extrabold mb-4">
              Loved For Experiences!
            </h3>
            <p className="mb-6 text-lg">
              Read stories from travellers who trusted us to craft their perfect
              journeys!
            </p>
            <button className="bg-[#FFD54F] hover:bg-[#FFD54F] text-white font-semibold rounded-full px-6 py-3 transition">
              View Testimonials
            </button>
          </div>

          {/* Images on right */}
          <div className="flex flex-1 justify-end gap-4 relative w-full max-w-xl md:max-w-3xl h-64 md:h-56">
            {/* Image 1 */}
            <div className="relative w-24 md:w-32 rounded-xl overflow-hidden border-4 border-white shadow-lg">
              <Image
                src={testimonialImages[0].img}
                alt="Testimonial 1"
                width={128}
                height={128}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Image 2 */}
            <div className="w-24 md:w-28 rounded-xl overflow-hidden border-4 border-white shadow-lg">
              <Image
              width={112}
                height={112}
                src={testimonialImages[1].img}
                alt="Testimonial 2"
                className="object-cover w-full h-full"
              />
            </div>

            {/* Image 3 */}
            <div className="w-36 md:w-44 rounded-xl overflow-hidden border-4 border-white shadow-lg">
              <Image
              width={112}
              height={112}
                src={testimonialImages[2].img}
                alt="Testimonial 3"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </section>
      </div>
  )
}

export default Holidaydeals
