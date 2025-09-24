import React from 'react'
import Image from "next/image";
const attractions = [
  { name: "Udaipur", img: "/udaipur.jpg" },
  { name: "Andaman", img: "/Andaman.jpg" },
  { name: "Kashmir", img: "/kashmir.jpg" },
  { name: "Jaipur", img: "/jaipur.jpg" },
  { name: "Bengaluru", img: "/Bengaluru.jpg" },
  { name: "Paris", img: "/paris.jpg" },
  { name: "Leh", img: "/leh.jpg" },
  { name: "Bali", img: "/Bali.jpg" },
  { name: "Dubai", img: "/dubai.jpg" },
  { name: "Kerala", img: "/kerala.jpg" },
];
const Famousplace = () => {
  return (
    <section className="px-6 md:px-16 lg:px-24 py-12">
      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
        Famous Tourist Attraction
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-2 max-w-7xl mx-auto sm:grid-cols-3 md:grid-cols-5 gap-8 text-center">
        {attractions.map((place, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center hover:scale-105 transition-transform"
          >
            {/* Circle Background Icon */}
            <div className="w-35 h-35 flex items-center justify-center bg-blue-50 rounded-full text-3xl">
              <Image
                src={place.img}
                width={80}
                height={80}
                alt={place.name}
                className="rounded-full object-cover h-35 w-35"
              />
            </div>
            <p className="mt-3 font-medium text-gray-700">{place.name}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Famousplace
