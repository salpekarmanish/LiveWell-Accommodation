import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCYizDoOIaOoSvNDVDlDsYg00QOtT9kAW8",  
    authDomain: "liveness-4dece.firebaseapp.com",
    projectId: "liveness-4dece",
    storageBucket: "liveness-4dece.firebasestorage.app",
    messagingSenderId: "308456137518",
    appId: "1:308456137518:web:c081bc9a5362045e6b10bf"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'it';

export { auth };
