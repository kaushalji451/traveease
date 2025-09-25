"use client";
import React from "react";
import FlightCard from "./FlightCard";

const FlightsList = ({
  sortedData,
  dictionaries,
  expandedId,
  setExpandedId,
  formatTime,
  loading,
}) => {
  if (loading) return <div className="text-lg text-gray-500">Loading flights...</div>;

  return (
    <>
      {sortedData.map((offer) => (
        <FlightCard
          key={offer.id}
          offer={offer}
          dictionaries={dictionaries}
          expandedId={expandedId}
          setExpandedId={setExpandedId}
          formatTime={formatTime}
        />
      ))}
    </>
  );
};

export default FlightsList;
