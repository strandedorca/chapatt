// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8JGiNNzoWjWJSBeYsAiwWj10iZJuneJM",
  authDomain: "fa-messaging-app.firebaseapp.com",
  projectId: "fa-messaging-app",
  storageBucket: "fa-messaging-app.appspot.com",
  messagingSenderId: "1031167239340",
  appId: "1:1031167239340:web:35955e600ce170d9c32b09",
  measurementId: "G-QPKZMMK8DH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);