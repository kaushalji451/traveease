"use client";
import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Link from 'next/link';
import Image from 'next/image';

const data = [
    {
        id: 1,
        title: "Activity Bookings",
        count: 0,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQasKPDCewT1v2j4mJjfCN1rqH2SczejiwkoA&s",
        link: "/activities",
    },
    {
        id: 2,
        title: "Cities Visited",
        count: 0,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQasKPDCewT1v2j4mJjfCN1rqH2SczejiwkoA&s",
        link: "/cities",
    },
    {
        id: 3,
        title: "Countries Visited",
        count: 0,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQasKPDCewT1v2j4mJjfCN1rqH2SczejiwkoA&s",
        link: "/countries",
    },
    {
        id: 4,
        title: "Countries Visited",
        count: 0,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQasKPDCewT1v2j4mJjfCN1rqH2SczejiwkoA&s",
        link: "/countries",
    },
    {
        id: 5,
        title: "Countries Visited",
        count: 0,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQasKPDCewT1v2j4mJjfCN1rqH2SczejiwkoA&s",
        link: "/countries",
    },
];
const Cursole = () => {
  return (
    <div>
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={10}
        slidesPerView={3}
        breakpoints={{
          320: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {data.map((item) => (
          <SwiperSlide key={item.id}>
            <Link
              href={item.link}
              className="block relative rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <Image
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
                width={500}
                height={300}
              />
              <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white">
                <span className="text-2xl font-bold">{item.count}</span>
                <span className="text-lg">{item.title}</span>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Cursole
