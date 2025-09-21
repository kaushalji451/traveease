import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
const destinations = [
  {
    city: "Goa",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?fm=jpg&q=60&w=3000",
    link: "/buses/goa",
    categories: "Mumbai → Goa, Pune → Goa, Bangalore → Goa, Hyderabad → Goa",
  },
  {
    city: "Dubai",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?fm=jpg&q=60&w=3000",
    link: "/buses/dubai",
    categories: "Sharjah → Dubai, Abu Dhabi → Dubai, Fujairah → Dubai",
  },
  {
    city: "Mumbai",
    img: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?fm=jpg&q=60&w=3000",
    link: "/buses/mumbai",
    categories: "Mumbai → Pune, Mumbai → Goa, Mumbai → Nashik, Mumbai → Shirdi",
  },
  {
    city: "Delhi",
    img: "https://cdn.britannica.com/37/189837-050-F0AF383E/New-Delhi-India-War-Memorial-arch-Sir.jpg",
    link: "/buses/delhi",
    categories: "Delhi → Jaipur, Delhi → Manali, Delhi → Lucknow, Delhi → Chandigarh",
  },
  {
    city: "Bangalore",
    img: "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?fm=jpg&q=60&w=3000",
    link: "/buses/bangalore",
    categories: "Bangalore → Chennai, Bangalore → Hyderabad, Bangalore → Goa, Bangalore → Coorg",
  },
  {
    city: "Jaipur",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuDD8CIjBDuVukV24jBDSDnW6-DUu3qrzpeQ&s",
    link: "/buses/jaipur",
    categories: "Jaipur → Delhi, Jaipur → Udaipur, Jaipur → Jodhpur, Jaipur → Agra",
  },
  {
    city: "Chennai",
    img: "https://cdn.britannica.com/13/100813-050-708D93FE/Kapaleeswarar-temple-Hindu-Mylapore-Chennai-India-Tamil.jpg",
    link: "/buses/chennai",
    categories: "Chennai → Bangalore, Chennai → Pondicherry, Chennai → Madurai, Chennai → Coimbatore",
  },
  {
    city: "Kolkata",
    img: "https://s7ap1.scene7.com/is/image/incredibleindia/howrah-bridge-howrah-west-bengal-city-1-hero?qlt=82&ts=1742154305591",
    link: "/buses/kolkata",
    categories: "Kolkata → Digha, Kolkata → Puri, Kolkata → Siliguri, Kolkata → Ranchi",
  },
  {
    city: "Singapore",
    img: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?fm=jpg&q=60&w=3000",
    link: "/buses/singapore",
    categories: "Singapore → Kuala Lumpur, Singapore → Malacca, Singapore → Johor Bahru",
  },
  {
    city: "Bangkok",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTqnfffLuR8KCxRAr8IDKCsRPJLWQseSXymg&s",
    link: "/buses/bangkok",
    categories: "Bangkok → Pattaya, Bangkok → Phuket, Bangkok → Chiang Mai, Bangkok → Hua Hin",
  },
  {
    city: "London",
    img: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?fm=jpg&q=60&w=3000",
    link: "/buses/london",
    categories: "London → Manchester, London → Birmingham, London → Oxford, London → Edinburgh",
  },
  {
    city: "Paris",
    img: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?fm=jpg&q=60&w=3000",
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
                className="rounded-lg object-cover"
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
