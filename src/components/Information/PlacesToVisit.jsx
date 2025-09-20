import React from "react";
import PlaceCard from "./PlaceCard";

function PlacesToVisit({ tripData }) {
  const itineraryList = tripData?.tripData?.itinerary;

  return (
    <div>
      <h2 className="font-bold text-xl mt-5 mb-2">Places to Visit</h2>
      <div>
        {itineraryList && itineraryList.length > 0 ? (
          itineraryList.map((item, index) => (
            <div key={index} className="mb-6">
              <h3 className="font-bold text-lg mb-2"> {item.day}</h3>
              <p className="text-gray-500 mb-4">A day of adventure!</p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {item.places.map((place, placeIndex) => (
                  <div key={placeIndex}>
                    <PlaceCard place={place} />
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">
            No daily itinerary found for this trip.
          </p>
        )}
      </div>
    </div>
  );
}

export default PlacesToVisit;