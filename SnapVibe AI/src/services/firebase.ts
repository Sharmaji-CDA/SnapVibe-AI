// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCw49XEt79Ddek9LvurIGVtPDvlk4cL-G0",
  authDomain: "snapvibeai.firebaseapp.com",
  projectId: "snapvibeai",
  storageBucket: "snapvibeai.firebasestorage.app",
  messagingSenderId: "458905588550",
  appId: "1:458905588550:web:06ed13a5b628194bca8b47",
  measurementId: "G-JLLD2G76D8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);