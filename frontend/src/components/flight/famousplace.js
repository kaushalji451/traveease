import React from 'react'
import Image from "next/image";
const attractions = [
  { name: "Udaipur", img: "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D" },
  { name: "Andaman", img: "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D" },
  { name: "Kashmir", img: "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D" },
  { name: "Jaipur", img: "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D" },
  { name: "Bengaluru", img: "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D" },
  { name: "Paris", img: "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D" },
  { name: "Leh", img: "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D" },
  { name: "Bali", img: "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D" },
  { name: "Dubai", img: "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D" },
  { name: "Kerala", img: "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D" },
];
const Famousplace = () => {
  return (
    <section className="px-6 md:px-16 lg:px-24 py-12">
      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
        Famous Tourist Attraction
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-2 max-w-3xl mx-auto sm:grid-cols-3 md:grid-cols-5 gap-8 text-center">
        {attractions.map((place, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center hover:scale-105 transition-transform"
          >
            {/* Circle Background Icon */}
            <div className="w-25 h-25 flex items-center justify-center bg-blue-50 rounded-full text-3xl">
              <Image
                src={place.img}
                width={80}
                height={80}
                alt={place.name}
                className="rounded-full object-cover h-25 w-25"
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
