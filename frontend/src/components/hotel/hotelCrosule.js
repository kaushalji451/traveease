import React from 'react'
import Image from 'next/image';

const cards = [
  {
    title: "Mountains Calling",
    description: "Explore More",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Beach Vacations",
    description: "Explore More",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Weekend Getaways",
    description: "Explore More",
    img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Monsoon Magic",
    description: "Explore More",
    img: "https://images.unsplash.com/photo-1504415724575-56cef5e3da72?auto=format&fit=crop&w=800&q=80",
  },
];
const HotelCrosule = () => {
  return (
    <div className="relative py-20 bg-gray-100 flex flex-col items-center justify-center overflow-hidden">
      {/* Background image overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80" // background hotel/pool image
          alt=""
          className="w-full h-full object-cover opacity-30"
          width={1500}
          height={1000}
        />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-12 mb-2 text-center">
          Book Hotels For Every Mood
        </h2>
        <p className="text-xl text-gray-600 font-medium mb-8 text-center">
          Curated Escapes for Your Curious Soul!
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-6xl">
          {cards.map((card, i) => (
            <div
              key={i}
              className="relative rounded-xl overflow-hidden shadow-lg group min-h-[260px] flex flex-col bg-white/20 backdrop-blur-sm"
            >
              <Image
                src={card.img}
                alt={card.title}
                className="absolute inset-0 w-full h-full object-cover"
                width={800}
                height={600}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="relative z-10 p-6 flex flex-col justify-end h-full">
                <h3 className="text-2xl font-bold text-white mb-2 drop-shadow">
                  {card.title}
                </h3>
                <button className="flex items-center gap-2 text-white text-lg font-semibold hover:underline">
                  {card.description}
                  <span className="inline-block translate-x-0 group-hover:translate-x-1 transition-transform duration-200">
                    →
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HotelCrosule
