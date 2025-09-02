// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOK4xzo9bYatcPjRO9BBNGDA7BHlkgdUI",
  authDomain: "parche-food-ordering-app.firebaseapp.com",
  projectId: "parche-food-ordering-app",
  storageBucket: "parche-food-ordering-app.firebasestorage.app",
  messagingSenderId: "996447201925",
  appId: "1:996447201925:web:64c88fa10185794cf917ec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { ref, push, onValue };