// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhRNPTmSM3sZHs0LOhVQqw5fppCBVETEI",
  authDomain: "ecommerce-b2816.firebaseapp.com",
  projectId: "ecommerce-b2816",
  storageBucket: "ecommerce-b2816.appspot.com",
  messagingSenderId: "755967104871",
  appId: "1:755967104871:web:e43afeb635016e647d81c2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const storage=getStorage(app)
export const db=getFirestore(app)


