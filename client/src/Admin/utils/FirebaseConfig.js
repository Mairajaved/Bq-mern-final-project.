// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBvjDLoMuOU_YuZZ98rI2GnCK1YGO0SqXk",
  authDomain: "mern-final-2e9b6.firebaseapp.com",
  projectId: "mern-final-2e9b6",
  storageBucket: "mern-final-2e9b6.appspot.com",
  messagingSenderId: "812917000273",
  appId: "1:812917000273:web:152df4ebc5078473a81070",
  measurementId: "G-0S07Z5YV58",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
