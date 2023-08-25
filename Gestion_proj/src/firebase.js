import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth } from "firebase/auth";





// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:  import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "gepauthen.firebaseapp.com",
  projectId: "gepauthen",
  storageBucket: "gepauthen.appspot.com",
  messagingSenderId: "138986531640",
  appId: "1:138986531640:web:7a755313e389f016836fcd",
  measurementId: "G-92YHT7MH1V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);