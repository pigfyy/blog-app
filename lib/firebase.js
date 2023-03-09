// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQOQLPisHZ_CcF0E6WqwNWeBenF0_o__8",
  authDomain: "blog-c2483.firebaseapp.com",
  projectId: "blog-c2483",
  storageBucket: "blog-c2483.appspot.com",
  messagingSenderId: "721044323809",
  appId: "1:721044323809:web:5cc3452254faeea350a6a0",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
