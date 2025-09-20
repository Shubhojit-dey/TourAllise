// option.jsx
export const selectTravelList = [
  {
    id: 1,
    title: "Just Me",
    desc: "A solo trip made just for you.",
    icon: "👤",
    people: "1",
  },
  {
    id: 2,
    title: "A Couple",
    desc: "Perfect for two travelers together.",
    icon: "💑",
    people: "2",
  },
  {
    id: 3,
    title: "Family",
    desc: "Fun and bonding for the whole family.",
    icon: "👨‍👩‍👧‍👦",
    people: "3-6",
  },
  {
    id: 4,
    title: "Friends",
    desc: "Enjoy adventures with your friends group.",
    icon: "🧑‍🤝‍🧑",
    people: "3-10",
  },
];

export const selectBudgetsOptions = [
  {
    id: 1,
    title: "Cheap",
    desc: "Stay conscious of costs with budget-friendly options.",
    icon: "💵",
  },
  {
    id: 2,
    title: "Moderate",
    desc: "Keep expenses on the average side for balanced comfort.",
    icon: "💰",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Enjoy premium experiences without worrying about cost.",
    icon: "💸",
  },
];

// Structured prompt for Gemini JSON output
export const AI_PROMPT = `
Generate a detailed travel plan for:

- 📍 Location: {location}
- 📅 Duration: {duration}
- 👥 Travelers: {traveler}
- 💰 Budget: {budget}

Requirements:
1. **Hotels Options** → Return an array of objects with:
   - hotelName
   - address
   - price
   - imageUrl
   - geoCoordinates
   - rating
   - description

2. **Itinerary (per day)** → Return an array of objects with:
   - day
   - places: [
       {
         placeName,
         placeDetails,
         imageUrl,
         geoCoordinates,
         ticketPricing,
         rating,
         bestTimeToVisit,
         travelTimeFromPrevious
       }
     ]

Format the response strictly as **valid JSON**.
`;