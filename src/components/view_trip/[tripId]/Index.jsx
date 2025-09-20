import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../service/firebaseConfig';
import TripInfo from '@/components/Information/TripInfo';
import Hotels from '@/components/Information/Hotels';
import PlacesToVisit from '@/components/Information/PlacesToVisit';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Viewtrip() {
  const { tripId } = useParams();
  const [tripData, setTripData] = useState(null);

  useEffect(() => {
    const getTripData = async () => {
      const docRef = doc(db, "AiTrips", tripId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setTripData(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    if (tripId) {
      getTripData();
    }
  }, [tripId]);

  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
      {tripData ? (
        <>
          <TripInfo tripData={tripData} />
          <Hotels tripData={tripData} />
          <PlacesToVisit tripData={tripData} />
        </>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <AiOutlineLoading3Quarters className="h-12 w-12 animate-spin text-gray-400" />
        </div>
      )}
    </div>
  );
}

export default Viewtrip;