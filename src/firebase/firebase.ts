// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {

  // apiKey: "AIzaSyCaJu5yqfqbmslIl5RppMBLzACoCFmudUg",
  // authDomain: "fa-chapatt.firebaseapp.com",
  // projectId: "fa-chapatt",
  // storageBucket: "fa-chapatt.appspot.com",
  // messagingSenderId: "680980722099",
  // appId: "1:680980722099:web:fc2b8e583710a569775bc6",
  // measurementId: "G-VX20TNY3VT"

  apiKey: "AIzaSyC8JGiNNzoWjWJSBeYsAiwWj10iZJuneJM",
  authDomain: "fa-messaging-app.firebaseapp.com",
  projectId: "fa-messaging-app",
  storageBucket: "fa-messaging-app.appspot.com",
  messagingSenderId: "1031167239340",
  appId: "1:1031167239340:web:35955e600ce170d9c32b09",
  measurementId: "G-QPKZMMK8DH"
};


// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Initialize SDKs
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider, analytics };


