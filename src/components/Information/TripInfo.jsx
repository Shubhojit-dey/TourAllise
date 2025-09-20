import React, { useEffect, useState } from "react";
import placeholder from "../../assets/placeholder.jpeg";
import { Button } from "../ui/button";
import { IoIosSend } from "react-icons/io";
import { GetPlaceDetails, GetPhotoUrl } from "../service/GlobalApi";

function TripInfo({ tripData }) {
  const [tripImageUrl, setTripImageUrl] = useState(placeholder);

  useEffect(() => {
    const fetchTripImage = async () => {
      if (tripData?.userSelection?.location?.label) {
        try {
          const data = {
            textQuery: tripData.userSelection.location.label,
          };
          console.log("Searching for:", data.textQuery);

          const res = await GetPlaceDetails(data);
          console.log("API Response:", res.data);

          const photos = res.data.places[0]?.photos;
          if (photos && photos.length > 0) {
            console.log("Photo found:", photos[0].name);
            setTripImageUrl(GetPhotoUrl(photos[0].name));
          } else {
            console.log("No photos found, using placeholder.");
            setTripImageUrl(placeholder);
          }
        } catch (error) {
          console.error("Error fetching place photo:", error);
          setTripImageUrl(placeholder);
        }
      }
    };
    fetchTripImage();
  }, [tripData]);

  const onSendTrip = () => {
    console.log("Trip data sent!");
  };

  return (
    <div>
      <img
        src={tripImageUrl}
        className="h-[340px] w-full object-cover rounded-xl"
        alt={tripData?.userSelection?.location?.label || "placeholder"}
      />
      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">
            {tripData?.userSelection?.location?.label}
          </h2>
          <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              📅 {tripData?.userSelection?.duration} Days
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              💰 {tripData?.userSelection?.budget} Budget
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              🥂 No. Of Travelers: {tripData?.userSelection?.traveler}
            </h2>
          </div>
        </div>
        <Button onClick={onSendTrip}>
          <IoIosSend />
        </Button>
      </div>
    </div>
  );
}

export default TripInfo;
