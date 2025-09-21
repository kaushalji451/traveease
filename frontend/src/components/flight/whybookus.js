import React,{useState} from 'react'

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
   
  // Features Section
  const features = [
    {
      title: "Easy Booking",
      desc: "We offer easy and convenient flight bookings with attractive offers.",
      icon: "📅",
    },
    {
      title: "Lowest Price",
      desc: "We ensure low rates on hotel reservation, holiday packages and on flight tickets.",
      icon: "💸",
    },
    {
      title: "Instant Refund",
      desc: "Get instant refunds effortlessly on your travel bookings with us.",
      icon: "💳",
    },
    {
      title: "24/7 Support",
      desc: "Get assistance 24/7 on any kind of travel related query. We are happy to assist you.",
      icon: "📞",
    },
    {
      title: "Exciting Deals",
      desc: "Enjoy exciting deals on flights, hotels, buses, car rental and tour packages.",
      icon: "🔥",
    },
  ];

  // Reviews Section (Carousel)
  const reviews = [
    {
      name: "Ravi",
      date: "September 11",
      title: "The most amazing prices",
      desc: "The most amazing prices on flight tickets, has been my go-to website for all",
    },
    {
      name: "Jagadeesh",
      date: "September 10",
      title: "Very Good platform",
      desc: "Very Good platform for ticket booking",
    },
    {
      name: "KartikChan",
      date: "September 10",
      title: "Very nice",
      desc: "Very good dealings",
    },
    {
      name: "Customer",
      date: "September 8",
      title: "My query was solved",
      desc: "My query was solved within very short period. Thank you easemytrip...",
    },
    {
      name: "Susan M",
      date: "September 7",
      title: "Easy to book",
      desc: "Easy to book",
    },
  ];
const Whybookus = () => {

  const [current, setCurrent] = useState(0);

  const nextReview = () => {
    setCurrent((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length);
  };
  return (
    <section className=" pt-12">
      <div className="px-6 md:px-16 lg:px-24">
          {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Why Book With Us?
        </h2>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 text-center">
          {features.map((f, i) => (
            <div key={i} className="flex flex-col items-center border-e px-4 border-slate-400">
              <div className="text-5xl mb-4">{f.icon}</div>
              <h3 className="font-semibold text-lg">{f.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Reviews Carousel */}
        <div className="relative mt-12">
          <div className="flex justify-between items-center">
            <button
              onClick={prevReview}
              className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
            >
              <FaChevronLeft />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1 px-6">
              {reviews.slice(current, current + 3).map((r, idx) => (
                <div
                  key={idx}
                  className="border rounded-lg p-4 border-slate-200  bg-slate-100 shadow hover:shadow-lg transition"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-gray-400 text-xs">Verified</span>
                  </div>
                  <h4 className="font-semibold">{r.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{r.desc}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {r.name}, {r.date}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={nextReview}
              className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

      </div>

        {/* Description Section */}
       <div className=" bg-slate-100">
         <div className="mt-16  max-w-7xl mx-auto py-10 max-md:px-4">
          <h3 className="text-2xl font-bold mb-4 text-center">
            Search Flights, Hotels, Bus and Holiday Packages
          </h3>
          <p className="text-gray-600 text-sm md:text-base">
            EaseMyTrip is one of the largest online travel platforms in India, and
            a trusted name in the Indian travel industry. We offer "end to end"
            travel solutions including air tickets, hotel booking, cab and bus
            booking, train tickets and holiday packages. Additionally, we offer
            ancillary value-added services.
            <br />
            We understand that planning a trip can be overwhelming, so we have
            simplified the process to make it easy for you to find the perfect
            travel deals that suit your needs. Our website is user-friendly and
            provides a wide range of options to choose from.
            <br />
            We believe in transparency and honesty in all our dealings. We do not
            charge any hidden fees, and our prices are always competitive. With
            EaseMyTrip, you can be assured of getting the best travel deals in the
            market. We promise to make your travel experience a memorable one.
          </p>
        </div>
       </div>
      </section>
  )
}

export default Whybookus
