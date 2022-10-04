// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  QueryDocumentSnapshot,
  Timestamp,
  type FirestoreDataConverter,
  type WithFieldValue,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
console.log(import.meta.env.VITE_PROJECT_ID);
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY || "",
  authDomain: import.meta.env.authDomain || "",
  projectId: import.meta.env.VITE_PROJECT_ID || "",
  storageBucket: import.meta.env.storageBucket || "",
  messagingSenderId: import.meta.env.messagingSenderId || "",
  appId: import.meta.env.VITE_APP_ID || "",
  measurementId: import.meta.env.measurementId || "",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);

interface IUser {
  uid: string;
  name: string;
  email: string;
  photoUrl: string;
  createdAt: Date;
}

export class User implements IUser {
  uid: string;
  name: string;
  email: string;
  photoUrl: string;
  createdAt: Date;

  constructor({ uid, name, email, photoUrl, createdAt = new Date() }: IUser) {
    this.uid = uid;
    this.name = name;
    this.email = email;
    this.photoUrl = photoUrl;
    if (createdAt instanceof Date) {
      this.createdAt = createdAt;
    } else {
      const _purchaseDate = createdAt as Timestamp;
      this.createdAt = _purchaseDate.toDate();
    }
    this.createdAt = createdAt;
  }
}

export const userConverter: FirestoreDataConverter<User> = {
  toFirestore: (user: WithFieldValue<User>) => {
    return {
      uid: user.uid,
      name: user.name,
      email: user.email,
      photoUrl: user.photoUrl,
      createdAt: user.createdAt,
    };
  },
  fromFirestore: (docSnap: QueryDocumentSnapshot<User>) => {
    return new User(docSnap.data());
  },
};
