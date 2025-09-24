import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
const destinations = [
  {
    city: "Goa",
    img: "/goa.jpg",
    link: "/buses/goa",
    categories: "Mumbai → Goa, Pune → Goa, Bangalore → Goa, Hyderabad → Goa",
  },
  {
    city: "Dubai",
    img: "/dubai.jpg",
    link: "/buses/dubai",
    categories: "Sharjah → Dubai, Abu Dhabi → Dubai, Fujairah → Dubai",
  },
  {
    city: "Mumbai",
    img: "/mumbai.jpg",
    link: "/buses/mumbai",
    categories: "Mumbai → Pune, Mumbai → Goa, Mumbai → Nashik, Mumbai → Shirdi",
  },
  {
    city: "Delhi",
    img: "/delhi.jpg",
    link: "/buses/delhi",
    categories: "Delhi → Jaipur, Delhi → Manali, Delhi → Lucknow, Delhi → Chandigarh",
  },
  {
    city: "Bangalore",
    img: "/Bengaluru.jpg",
    link: "/buses/bangalore",
    categories: "Bangalore → Chennai, Bangalore → Hyderabad, Bangalore → Goa, Bangalore → Coorg",
  },
  {
    city: "Jaipur",
    img: "/jaipur.jpg",
    link: "/buses/jaipur",
    categories: "Jaipur → Delhi, Jaipur → Udaipur, Jaipur → Jodhpur, Jaipur → Agra",
  },
  {
    city: "Chennai",
    img: "/chennai.jpg",
    link: "/buses/chennai",
    categories: "Chennai → Bangalore, Chennai → Pondicherry, Chennai → Madurai, Chennai → Coimbatore",
  },
  {
    city: "Kolkata",
    img: "/kolkata.jpg",
    link: "/buses/kolkata",
    categories: "Kolkata → Digha, Kolkata → Puri, Kolkata → Siliguri, Kolkata → Ranchi",
  },
  {
    city: "Singapore",
    img: "/singapore.jpg",
    link: "/buses/singapore",
    categories: "Singapore → Kuala Lumpur, Singapore → Malacca, Singapore → Johor Bahru",
  },
  {
    city: "Bangkok",
    img: "/bankok.jpg",
    link: "/buses/bangkok",
    categories: "Bangkok → Pattaya, Bangkok → Phuket, Bangkok → Chiang Mai, Bangkok → Hua Hin",
  },
  {
    city: "London",
    img: "/london.jpg",
    link: "/buses/london",
    categories: "London → Manchester, London → Birmingham, London → Oxford, London → Edinburgh",
  },
  {
    city: "Paris",
    img: "/paris.jpg",
    link: "/buses/paris",
    categories: "Paris → Lyon, Paris → Marseille, Paris → Brussels, Paris → Geneva",
  },
];



const Buspoproot = () => {
  return (
      <section className="py-12">
        <h2 className="text-center text-2xl md:text-3xl font-bold mb-10">
          Popular Bus Routes
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
                width={64}
                height={64}
                className="rounded-lg object-cover h-20 w-20"
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

export default Buspoproot
