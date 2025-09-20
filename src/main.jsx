import { StrictMode } from 'react'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'

import { GoogleOAuthProvider } from '@react-oauth/google';
import Navbar from './components/Navbar';
import { Toaster } from "sonner";


import Homepage from './components/home/Homepage';
import Index from './components/createTrip/Index';
import Viewtrip from './components/view_trip/[tripId]/Index';
import NotFound from './components/NotFound';



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <Navbar />
      <Toaster />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/create-trip" element={<Index />} />
        <Route path="/view-trip/:tripId" element={<Viewtrip />} />
        {/* <Route path="/products" element={<ProductPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/support" element={<SupportPage />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* <Footer /> */}
    </GoogleOAuthProvider>
  </BrowserRouter>
);