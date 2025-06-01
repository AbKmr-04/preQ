import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCp42XF3hsBomanyWeTL3jjXtK-q4rsKfo",
  authDomain: "preq-99dc7.firebaseapp.com",
  projectId: "preq-99dc7",
  storageBucket: "preq-99dc7.firebasestorage.app",
  messagingSenderId: "650516738834",
  appId: "1:650516738834:web:4ae2fbb31903398189f9cb",
  measurementId: "G-G3JC3EFGV1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, analytics, db, auth }; 