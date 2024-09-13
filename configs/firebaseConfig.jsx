// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-course-generator-prav.firebaseapp.com",
  projectId: "ai-course-generator-prav",
  storageBucket: "ai-course-generator-prav.appspot.com",
  messagingSenderId: "469794820113",
  appId: "1:469794820113:web:45f6c5332165abf27821b0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage=getStorage(app);