import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore'



const firebaseConfig = {
    apiKey: "AIzaSyCpzB_couUUIBdgMGjfQteyYF-qqYDUx2o",
    authDomain: "discord-clone-3dd4c.firebaseapp.com",
    projectId: "discord-clone-3dd4c",
    storageBucket: "discord-clone-3dd4c.appspot.com",
    messagingSenderId: "233880754512",
    appId: "1:233880754512:web:4b7bd311142ec5f3243455",
    measurementId: "G-W496M42XNY"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.getAnalytics(app);

  