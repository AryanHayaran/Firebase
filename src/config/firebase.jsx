// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import {getStorage} from "firebase/storage"
const firebaseConfig = {
  apiKey: "AIzaSyDzGGNPClkbLCCR5-C_6_uvhrYhKX0jiSo",
  authDomain: "fir-basic-fc89f.firebaseapp.com",
  projectId: "fir-basic-fc89f",
  storageBucket: "fir-basic-fc89f.appspot.com",
  messagingSenderId: "435167557516",
  appId: "1:435167557516:web:3becb40134cb0163a4c8a9",
  measurementId: "G-XM1BZ97J6S",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const GoogleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);