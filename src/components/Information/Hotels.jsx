import React, { useEffect, useState } from "react";
import placeholder from "../../assets/placeholder.jpeg";
import { GetPlacePhotos, GetPhotoUrl } from "../service/GlobalApi";

function Hotels({ tripData }) {
  const hotelsList = tripData?.tripData?.hotels;
  const [hotelImages, setHotelImages] = useState({});
  const [imagesFetched, setImagesFetched] = useState(false);

  const onHotelClick = (address) => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        address
      )}`,
      "_blank"
    );
  };

  useEffect(() => {
    if (hotelsList && hotelsList.length > 0 && !imagesFetched) {
      const fetchImages = async () => {
        const newImages = {};
        for (const hotel of hotelsList) {
          try {
            const response = await GetPlacePhotos({
              textQuery: hotel.hotelName,
            });
            const photo = response.data.places[0]?.photos?.[0];
            if (photo) {
              const photoUrl = GetPhotoUrl(photo.name);
              newImages[hotel.hotelName] = photoUrl;
            }
          } catch (error) {
            console.error(`Error fetching photo for ${hotel.hotelName}:`, error);
          }
        }
        setHotelImages(newImages);
        setImagesFetched(true);
      };
      fetchImages();
    }
  }, [hotelsList, imagesFetched]);

  return (
    <div>
      <h2 className="font-bold text-xl mt-5 mb-2">Hotels Recommendations</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {hotelsList && hotelsList.length > 0 ? (
          hotelsList.map((hotel, index) => (
            <div
              key={index}
              className="hover:scale-105 transition-all cursor-pointer border p-4 rounded-lg"
              onClick={() => onHotelClick(hotel.address)}
            >
              <img
                src={hotelImages[hotel.hotelName] || placeholder}
                className="h-48 w-full object-cover rounded-lg"
                alt={hotel?.hotelName || "placeholder"}
              />
              <div className="p-4">
                <h2 className="font-medium">{hotel.hotelName}</h2>
                <h2 className="text-gray-500 text-xs">📍 {hotel.address}</h2>
                <h2 className="text-sm">💰 {hotel.price}</h2>
                <p className="text-sm">⭐ Rating: {hotel.rating}</p>
                <p className="text-sm mt-2">{hotel.description}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">
            No hotel recommendations found for this trip.
          </p>
        )}
      </div>
    </div>
  );
}

export default Hotels;
