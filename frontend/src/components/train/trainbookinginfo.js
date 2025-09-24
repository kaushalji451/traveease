"use client";

import React from "react";

const Trainbookinginfo = () => {
  return (
   <div className="bg-green-50">
     <div className=" min-h-screen max-w-7xl mx-auto px-6 md:px-20 py-10 text-gray-800">
      {/* Page Header */}
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
        Book Train Tickets Online With <span className="text-green-700">RudrabhishekTravels</span>
      </h1>

      <p className="mb-6 text-justify">
        <strong>RudrabhishekTravels</strong> is one of the most leading and trusted travel platforms in India that offers online train booking services to millions of users. As a fast-growing company, we aim to provide users with multiple benefits and make their train travel hassle-free. Advantages of booking train tickets with <strong>RudrabhishekTravels</strong> include wallet-friendly prices, optimal convenience, customer assistance, and an opportunity to spend quality time with family. 
      </p>
      <p className="mb-6 text-justify">
        With <strong>RudrabhishekTravels</strong>, you can select and track different train routes, timings, fares, and seat details for your tickets. Our platform also integrates next-generation e-ticketing and e-catering services offered by IRCTC. Additional features include live station/train status, 24/7 customer support, instant cancellations, and refund options. Customize your journey by selecting train type, seat, category, or quota to ensure convenience every step of the way.
      </p>

      {/* Benefits Section */}
      <h2 className="text-2xl  font-bold mt-8 mb-4">Benefits of Online Train Ticket Booking</h2>
      <ul className="list-disc list-inside mb-6 space-y-2">
        <li><strong>Convenience:</strong> Book train tickets in just a few clicks, saving time and effort.</li>
        <li><strong>Time-Saving:</strong> No long queues; book tickets even during high travel seasons.</li>
        <li><strong>Easy Accessibility:</strong> Access the platform from any location across India.</li>
        <li><strong>Wide Range of Options:</strong> Compare prices, check seat availability, and train schedules.</li>
        <li><strong>Real-Time Updates:</strong> Track train status and schedules for informed travel decisions.</li>
      </ul>

      {/* Tatkal Booking Strategies */}
      <h2 className="text-2xl font-bold mt-8 mb-4">Best Strategies to Book Tatkal Train Tickets with RudrabhishekTravels</h2>
      <ul className="list-disc list-inside mb-6 space-y-2">
        <li><strong>Prefer Advance Preparation:</strong> Keep names, age, and identity details ready for smooth booking.</li>
        <li><strong>Rely on Better Network Connections:</strong> Use fast, efficient internet to avoid delays during booking.</li>
        <li><strong>Search for the Best Payment Options:</strong> Choose one reliable payment method for instant transactions.</li>
        <li><strong>Create a Back-Up Plan:</strong> Have an alternate train option in case your first choice isn’t available.</li>
        <li><strong>Monitor Seat Availability:</strong> Keep an eye on last-minute cancellations to get your preferred Tatkal ticket.</li>
      </ul>

      {/* Documents Required */}
      <h2 className="text-2xl font-bold mt-8 mb-4">Crucial Documents Required in Trains</h2>
      <p className="mb-6 text-justify">
        During your IRCTC train journey, passengers should carry at least one of the following documents:
      </p>
      <ul className="list-disc list-inside mb-6 space-y-2">
        <li>Aadhar Card</li>
        <li>Voter ID</li>
        <li>PAN Card</li>
        <li>Passport</li>
        <li>Driving Licence</li>
        <li>Bank Passbook with Photograph</li>
        <li>Nationalised Bank Passbooks</li>
        <li>Student ID Card with Photograph, issued by recognized school/college</li>
      </ul>

      {/* How to Book */}
      <h2 className="text-2xl font-bold mt-8 mb-4">How to Book Train Ticket Online on RudrabhishekTravels</h2>
      <ol className="list-decimal list-inside mb-6 space-y-2 text-justify">
        <li>Visit <strong>RudrabhishekTravels.com</strong> and click on the Trains tab.</li>
        <li>Enter departure and destination points, select departure date, and click Search.</li>
        <li>Choose a train and seat based on your preference. Use filters for seat type or category.</li>
        <li>Confirm your departure and destination stations and click Continue.</li>
        <li>Fill in mandatory details: IRCTC user ID, boarding point, contact details, and traveller info for each passenger.</li>
        <li>Review all details on the Review & Travellers page. Check price summary and proceed to payment.</li>
        <li>Enter any coupon codes to save money.</li>
        <li>Make payment using preferred options: Debit/Credit card, UPI, net banking, or wallet money.</li>
        <li>Complete IRCTC authentication and receive your e-ticket on your mobile and email.</li>
      </ol>

      {/* Why RudrabhishekTravels */}
      <h2 className="text-2xl font-bold mt-8 mb-4">Book Train Easily with RudrabhishekTravels</h2>
      <p className="mb-6 text-justify">
        Travelling across India by train is cost-effective and convenient. Trains cover long distances quickly, have large capacities, and provide comfort and reliability. <strong>RudrabhishekTravels</strong> empowers passengers to book online tickets effortlessly and enjoy a seamless travel experience. Choose RudrabhishekTravels, your most trusted train booking platform, to make your journey safe, fast, and convenient.
      </p>

      {/* Disclaimer */}
      <p className="text-sm text-gray-500 mt-6">
        Disclaimer: Train running or station information is not affiliated with or endorsed by Indian Railways or IRCTC.
      </p>
    </div>
   </div>
  );
};

export default Trainbookinginfo;
