"use client";
import React from 'react'
import Link from "next/link";
import Image from 'next/image';
const destinations = [
  {
    city: "Goa",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?fm=jpg&q=60&w=3000",
    link: "/hotels/goa",
    categories: "Beach Resorts, Luxury Villas, Budget Hotels, 5 Star Hotels",
  },
  {
    city: "Dubai",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?fm=jpg&q=60&w=3000",
    link: "/hotels/dubai",
    categories: "Luxury Hotels, Desert Resorts, Business Hotels, 4 Star Hotels",
  },
  {
    city: "Mumbai",
    img: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?fm=jpg&q=60&w=3000",
    link: "/hotels/mumbai",
    categories: "City Hotels, Boutique Hotels, Budget Hotels, 3 Star Hotels",
  },
  {
    city: "Delhi",
    img: "https://cdn.britannica.com/37/189837-050-F0AF383E/New-Delhi-India-War-Memorial-arch-Sir.jpg",
    link: "/hotels/delhi",
    categories: "Luxury Hotels, Airport Hotels, Heritage Hotels, 5 Star Hotels",
  },
  {
    city: "Bangalore",
    img: "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?fm=jpg&q=60&w=3000",
    link: "/hotels/bangalore",
    categories: "Business Hotels, Budget Hotels, Boutique Stays, 4 Star Hotels",
  },
  {
    city: "Jaipur",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuDD8CIjBDuVukV24jBDSDnW6-DUu3qrzpeQ&s",
    link: "/hotels/jaipur",
    categories: "Palace Hotels, Heritage Stays, Budget Hotels, 3 Star Hotels",
  },
  {
    city: "Chennai",
    img: "https://cdn.britannica.com/13/100813-050-708D93FE/Kapaleeswarar-temple-Hindu-Mylapore-Chennai-India-Tamil.jpg",
    link: "/hotels/chennai",
    categories: "Beach Hotels, Business Hotels, Budget Hotels, 4 Star Hotels",
  },
  {
    city: "Kolkata",
    img: "https://s7ap1.scene7.com/is/image/incredibleindia/howrah-bridge-howrah-west-bengal-city-1-hero?qlt=82&ts=1742154305591",
    link: "/hotels/kolkata",
    categories: "Heritage Hotels, Boutique Hotels, Budget Hotels, 3 Star Hotels",
  },
  {
    city: "Singapore",
    img: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?fm=jpg&q=60&w=3000",
    link: "/hotels/singapore",
    categories: "Luxury Hotels, Marina Bay Resorts, Boutique Stays, 5 Star Hotels",
  },
  {
    city: "Bangkok",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTqnfffLuR8KCxRAr8IDKCsRPJLWQseSXymg&s",
    link: "/hotels/bangkok",
    categories: "Riverside Hotels, Spa Resorts, Budget Hotels, 4 Star Hotels",
  },
  {
    city: "London",
    img: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?fm=jpg&q=60&w=3000",
    link: "/hotels/london",
    categories: "Luxury Hotels, Boutique Hotels, Airport Hotels, 5 Star Hotels",
  },
  {
    city: "Paris",
    img: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?fm=jpg&q=60&w=3000",
    link: "/hotels/paris",
    categories: "Romantic Hotels, Boutique Stays, Luxury Hotels, 5 Star Hotels",
  },
];

const Hoteldestini = () => {
  return (
     <section className="py-12">
        <h2 className="text-center text-2xl md:text-3xl font-bold mb-10">
          Book Hotels at Popular Destinations
        </h2>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6 md:px-20">
          {destinations.map((dest, idx) => (
            <Link
              href={dest.link}
              key={idx}
              className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-100 transition"
            >
              <Image
                src={dest.img}
                alt={dest.city}
                className="w-16 h-16 rounded-lg object-cover"
                width={64}
                height={64}
              />
              <div>
                <p className="font-semibold text-lg">{dest.city}</p>
                <p className="text-sm text-gray-600">{dest.categories}</p>
              </div>
            </Link>
          ))}
        </div>

      </section>
  )
}

export default Hoteldestini
