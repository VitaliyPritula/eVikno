// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADNg1YdnJW61-bXWfvyZAGasgz7EknVug",
  authDomain: "evikno-app.firebaseapp.com",
  projectId: "evikno-app",
  storageBucket: "evikno-app.firebasestorage.app",
  messagingSenderId: "9906799108",
  appId: "1:9906799108:web:9dd116419274a3ede76b51",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
