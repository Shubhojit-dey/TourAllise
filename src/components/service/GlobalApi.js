import axios from "axios";

const SEARCH_BASE_URL = "https://places.googleapis.com/v1/places:searchText";
const PHOTO_BASE_URL = "https://places.googleapis.com/v1/";

const config = {
  headers: {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": import.meta.env.VITE_GOOGLE_PLACES_API_KEY,
    "X-Goog-FieldMask": [
      "places.photos",
      "places.displayName",
      "places.id",
      "places.formattedAddress",
      "places.rating",
      "places.priceLevel",
      "places.userRatingCount",
    ],
  },
};

// 🔹 Search place details
export const GetPlaceDetails = (data) =>
  axios.post(SEARCH_BASE_URL, data, config);

// 🔹 Search place photos
export const GetPlacePhotos = (data) =>
  axios.post(SEARCH_BASE_URL, data, config);

// 🔹 Build photo URL
export const GetPhotoUrl = (photoRef) => {
  return `${PHOTO_BASE_URL}${photoRef}/media?key=${
    import.meta.env.VITE_GOOGLE_PLACES_API_KEY
  }&max_width_px=1024`;
};
