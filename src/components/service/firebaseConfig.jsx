// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBDrejA2NFxiYmf-48ixMOkrIhGfzbeBec",
  authDomain: "travel-5d78b.firebaseapp.com",
  projectId: "travel-5d78b",
  storageBucket: "travel-5d78b.firebasestorage.app",
  messagingSenderId: "54902676930",
  appId: "1:54902676930:web:311a65e5fa4e302ecaca5b",
  measurementId: "G-LBQG1SKK04"
};


export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);