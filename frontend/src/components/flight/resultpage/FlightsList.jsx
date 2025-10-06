"use client";
import React,{useEffect} from "react";
import FlightCard from "./FlightCard";
import Loader from "@/components/Loader";

const FlightsList = ({
  sortedData,
  dictionaries,
  expandedId,
  setExpandedId,
  formatTime,
  loading,
}) => {
  if (loading) return <Loader/>;
  
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
