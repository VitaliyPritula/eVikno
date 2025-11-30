// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Конфігурація Firebase для твого проєкту
const firebaseConfig = {
  apiKey: "AIzaSyD-xKAvBP8hyVXS7Opbo-MBnkn0XWar0U0",
  authDomain: "ivolga-6d3dd.firebaseapp.com",
  projectId: "ivolga-6d3dd",
  storageBucket: "ivolga-6d3dd.appspot.com",
  messagingSenderId: "33697798039",
  appId: "1:33697798039:android:6b82b8bcf3cab49e03d6d2",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const GOOGLE_PROVIDER = new GoogleAuthProvider();