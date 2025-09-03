// src/firebase.js
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  RecaptchaVerifier, 
  signInWithPhoneNumber,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";

// ✅ Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAEZcPLSKepF8TfgZzPC4Dm267f0q34axE",
  authDomain: "food-ordering-app-a48cf.firebaseapp.com",
  projectId: "food-ordering-app-a48cf",
  storageBucket: "food-ordering-app-a48cf.firebasestorage.app",
  messagingSenderId: "1098604277037",
  appId: "1:1098604277037:web:8052fe1b005f54b3ceb7a4"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Auth instance (use this everywhere)
const auth = getAuth(app);

// ✅ Export everything you need
export { 
  auth, 
  RecaptchaVerifier, 
  signInWithPhoneNumber,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
};
