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
  apiKey: "AIzaSyCFgQIDxv42OHPIIwOAabFrwb8J7FDxQYg",
  authDomain: "climbing-app-9a84a.firebaseapp.com",
  projectId: "climbing-app-9a84a",
  storageBucket: "climbing-app-9a84a.appspot.com",
  messagingSenderId: "257482866336",
  appId: "1:257482866336:web:c11cd33965f46f0235d3c5",
  measurementId: "G-1DBK8FJ4F9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export { User, Route, userConverter, routeConverter };
