// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { User, userConverter } from "./user";
import { Route, routeConverter } from "./route";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY || "",
  authDomain: import.meta.env.VITE_AUTH_DOAMIN || "",
  projectId: import.meta.env.VITE_PROJECT_ID || "",
  storageBucket: import.meta.env.STORAGE_BUCKET || "",
  messagingSenderId: import.meta.env.MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_APP_ID || "",
  measurementId: import.meta.env.MEASUREMENT_ID || "",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export { User, Route, userConverter, routeConverter };
