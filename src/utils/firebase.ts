// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB02ekurM0-bJtP5jMny9OxQxOKdFvM5XI",
  authDomain: "tictactwo-6e672.firebaseapp.com",
  projectId: "tictactwo-6e672",
  storageBucket: "tictactwo-6e672.firebasestorage.app",
  messagingSenderId: "986639002931",
  appId: "1:986639002931:web:19edd8ec815fd9976b2246",
  measurementId: "G-RNK5LE4Q2K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);