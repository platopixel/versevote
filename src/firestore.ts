// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyATPHV-Jl3Btfs1UVcSTW8BcaHi-7FYDGw",
    authDomain: "versevote.firebaseapp.com",
    projectId: "versevote",
    storageBucket: "versevote.firebasestorage.app",
    messagingSenderId: "889835303779",
    appId: "1:889835303779:web:1df535c69a73764f4d5956",
    measurementId: "G-558NCJZ1MX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
