// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA164JgPTgcAXiHvSiABj-E1cg4I-O42Uo",
  authDomain: "my-portfolio-ed3e0.firebaseapp.com",
  projectId: "my-portfolio-ed3e0",
  storageBucket: "my-portfolio-ed3e0.appspot.com",
  messagingSenderId: "550988259321",
  appId: "1:550988259321:web:f55120553fc4b4b2e2a728",
  measurementId: "G-W836BGF05L"
};
initializeApp(firebaseConfig);
// Initialize Firebase
export const db = getFirestore();