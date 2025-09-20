// Index.jsx
import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Input } from "../ui/input";
import {
  AI_PROMPT,
  selectBudgetsOptions,
  selectTravelList,
} from "../constants/option";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { sendMessage } from "../service/AiModel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../service/firebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function Index() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState({});
  const [tripPlan, setTripPlan] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const getUserProfile = async (accessToken) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("User Profile:", response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      setUser(response.data);
      setOpenDialog(false);
      toast.success("Successfully signed in!");
    } catch (error) {
      console.error("Error fetching user profile:", error);
      toast.error("Error fetching user profile.");
    }
  };

  const login = useGoogleLogin({
    onSuccess: (codeResp) => {
      console.log("Login Success:", codeResp);
      getUserProfile(codeResp.access_token);
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  const onGenerateTrip = async () => {
    // Show a loading toast and set loading state
    setLoading(true);
    toast.loading("Generating your trip...", { duration: 10000 });

    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData.location.label
    )
      .replace("{duration}", `${formData.duration} Days`)
      .replace("{traveler}", formData.traveler)
      .replace("{budget}", formData.budget);

    try {
      const result = await sendMessage(FINAL_PROMPT);
      console.log("AI Trip Plan:", result);

      await saveAITrip(result);

      setTripPlan(result);
      setLoading(false);
      setOpenDialog(true);
      toast.dismiss();
      toast.success("Trip plan generated and saved successfully!");
    } catch (error) {
      console.error("Error generating trip:", error);
      toast.error("Failed to generate trip plan.");
      setLoading(false);
    }
  };
  
  const saveAITrip = async (TripData) => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    
    try {
      await setDoc(doc(db, "AiTrips", docId), {
        userSelection: formData,
        tripData: TripData,
        userEmail: localUser?.email,
        id: docId,
      });
      navigate(`/view-trip/${docId}`);
    } catch (error) {
      console.error("Error saving trip to database:", error);
      toast.error("Failed to save trip to database.");
    }
  };
  
  const handleButtonClick = () => {
    if (!user) {
      toast("⚠️ Please sign in to generate a trip.");
      setOpenDialog(true);
      return;
    }
    
    if (!formData?.location || !formData?.duration || !formData?.budget || !formData?.traveler) {
        toast("⚠️ Please fill in all fields.");
        return;
    }
    
    if (formData?.duration > 5) {
        toast("⚠️ Duration cannot be more than 5 days.");
        return;
    }
    
    onGenerateTrip();
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">
        Tell us your travel preferences 🏕️ 🌴
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>

      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is destination of choice?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACES_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange("location", v);
              },
            }}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning your trip?
          </h2>
          <Input
            type="number"
            placeholder="E.g., 5"
            onChange={(e) => handleInputChange("duration", e.target.value)}
          />
        </div>
      </div>
      <div>
        <h2 className="text-xl my-3 font-medium">What is Your Budget?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {selectBudgetsOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("budget", item.title)}
              className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${
                formData?.budget == item.title && "shadow-lg border-black"
              }`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl my-3 font-medium">
          Who do you plan on traveling with on your next adventure?
        </h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {selectTravelList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("traveler", item.people)}
              className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${
                formData?.traveler == item.people && "shadow-lg border-black"
              }`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className="my-10 justify-end flex">
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button
              disabled={loading}
              onClick={handleButtonClick}
            >
              {loading ? (
                <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
              ) : (
                "Generate Trip Plan"
              )}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {loading ? "Generating Trip..." : tripPlan ? "Your AI Trip Plan" : "Sign in with Google"}
              </DialogTitle>
              <DialogDescription>
                {!user ? (
                  // Show sign-in form if no user is found
                  <>
                    <img src="/logo.svg" alt="logo" />
                    <h2 className="font-bold text-lg mt-7">Sign in with Google</h2>
                    <p>Sign in to access your trip plans and preferences.</p>
                    <Button onClick={login} className="mt-5 w-full flex gap-4 items-center">
                      <FcGoogle className="h-7 w-7" />
                      Sign in with Google
                    </Button>
                  </>
                ) : loading ? (
                  // Show loading message while generating
                  <p>Please wait while we create your customized itinerary.</p>
                ) : tripPlan ? (
                  // Show trip plan if it exists
                  <div>
                    <pre>{JSON.stringify(tripPlan, null, 2)}</pre>
                  </div>
                ) : (
                  // Fallback message, shouldn't be seen with this logic
                  <p>Something went wrong. Please try again.</p>
                )}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default Index;