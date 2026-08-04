// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "portfolio-smaran.firebaseapp.com",
  projectId: "portfolio-smaran",
  storageBucket: "portfolio-smaran.firebasestorage.app",
  messagingSenderId: "464622813877",
  appId: "1:464622813877:web:fe8a9a73064d5e05c034fc",
  measurementId: "G-05X8R5NDNT",
};

// Initialize Firebase

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);
export const rtdb = getDatabase(app);
