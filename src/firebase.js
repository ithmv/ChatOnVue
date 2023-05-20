import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyC9yzfMV_wFE8MG1JIywfc23TYZaj5X8B4",
  authDomain: "chatithmv.firebaseapp.com",
  databaseURL: "https://chatithmv-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "chatithmv",
  storageBucket: "chatithmv.appspot.com",
  messagingSenderId: "451418735796",
  appId: "1:451418735796:web:968bab9072ea81c44903e1",
  measurementId: "G-HGKB8PW59Q"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, auth };