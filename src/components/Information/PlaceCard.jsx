import React, { useEffect, useState } from 'react'
import placeholder from "../../assets/placeholder.jpeg";
import { FaMapLocationDot } from "react-icons/fa6";
import { Button } from '../ui/button';
import { GetPlacePhotos, GetPhotoUrl } from "../service/GlobalApi";


function PlaceCard({ place }) {
  const [placeImageUrl, setPlaceImageUrl] = useState(placeholder);

  useEffect(() => {
    const fetchPlacePhoto = async () => {
      try {
        const response = await GetPlacePhotos({
          textQuery: place.placeName,
        });
        const photo = response.data.places[0]?.photos[0];
        if (photo) {
          const photoUrl = GetPhotoUrl(photo.name);
          setPlaceImageUrl(photoUrl);
        }
      } catch (error) {
        console.error(`Error fetching photo for ${place.placeName}:`, error);
      }
    };

    fetchPlacePhoto();
  }, [place]);

  const onMapClick = () => {
    if (place?.geoCoordinates) {
      window.open(`https://www.google.com/maps/search/?api=1&query='+hotel.hotelName+${encodeURIComponent(place.geoCoordinates)}`, '_blank');
    } else {
      console.error('Geo-coordinates not available for this place.');
    }
  };

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer">
      <img 
        className='w-full h-[200px] object-cover rounded-xl mb-2' 
        src={placeImageUrl} 
        alt={place?.placeName || "Place"} 
      />
      <h2 className="font-medium text-sm text-orange-600">
        {place.bestTimeToVisit}
      </h2>
      <h3 className="font-semibold text-lg mt-2">{place?.placeName}</h3>
      <p className="text-gray-500 text-sm">{place?.placeDetails}</p>
      <h2 className="font-medium text-sm text-gray-400 mt-2">
        🕙{place?.travelTimeFromPrevious}
      </h2>
      <Button size="sm" onClick={onMapClick} className=" mt-2 bg-gray-100 text-gray-800 hover:bg-gray-200">
        <FaMapLocationDot />
      </Button>
    </div>
  )
}

export default PlaceCard;