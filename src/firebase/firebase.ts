// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXQWDZ2sAMjL5lu02kE5R4KJxjITNyI7Y",
  authDomain: "discord-clone-td.firebaseapp.com",
  projectId: "discord-clone-td",
  storageBucket: "discord-clone-td.appspot.com",
  messagingSenderId: "342810131440",
  appId: "1:342810131440:web:832140dc1c0d09b4cafb35",
  measurementId: "G-8XH2LVEVTK",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { db, auth, provider };