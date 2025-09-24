"use client";
import React from 'react'
import Link from "next/link";
import Image from 'next/image';
const destinations = [
  {
    city: "Goa",
    img: "/goa.jpg",
    link: "/hotels/goa",
    categories: "Beach Resorts, Luxury Villas, Budget Hotels, 5 Star Hotels",
  },
  {
    city: "Dubai",
    img: "/dubai.jpg",
    link: "/hotels/dubai",
    categories: "Luxury Hotels, Desert Resorts, Business Hotels, 4 Star Hotels",
  },
  {
    city: "Mumbai",
    img: "/mumbai.jpg",
    link: "/hotels/mumbai",
    categories: "City Hotels, Boutique Hotels, Budget Hotels, 3 Star Hotels",
  },
  {
    city: "Delhi",
    img: "/delhi.jpg",
    link: "/hotels/delhi",
    categories: "Luxury Hotels, Airport Hotels, Heritage Hotels, 5 Star Hotels",
  },
  {
    city: "Bangalore",
    img: "/Bengaluru.jpg",
    link: "/hotels/bangalore",
    categories: "Business Hotels, Budget Hotels, Boutique Stays, 4 Star Hotels",
  },
  {
    city: "Jaipur",
    img: "/jaipur.jpg",
    link: "/hotels/jaipur",
    categories: "Palace Hotels, Heritage Stays, Budget Hotels, 3 Star Hotels",
  },
  {
    city: "Chennai",
    img: "/chennai.jpg",
    link: "/hotels/chennai",
    categories: "Beach Hotels, Business Hotels, Budget Hotels, 4 Star Hotels",
  },
  {
    city: "Kolkata",
    img: "/kolkata.jpg",
    link: "/hotels/kolkata",
    categories: "Heritage Hotels, Boutique Hotels, Budget Hotels, 3 Star Hotels",
  },
  {
    city: "Singapore",
    img: "/singapore.jpg",
    link: "/hotels/singapore",
    categories: "Luxury Hotels, Marina Bay Resorts, Boutique Stays, 5 Star Hotels",
  },
  {
    city: "Bangkok",
    img: "/bankok.jpg",
    link: "/hotels/bangkok",
    categories: "Riverside Hotels, Spa Resorts, Budget Hotels, 4 Star Hotels",
  },
  {
    city: "London",
    img: "/london.jpg",
    link: "/hotels/london",
    categories: "Luxury Hotels, Boutique Hotels, Airport Hotels, 5 Star Hotels",
  },
  {
    city: "Paris",
    img: "/paris.jpg",
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
                className="h-20 w-20 rounded-lg object-cover"
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
