// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, collectionGroup } from "firebase/firestore";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA8gmmWtLf99ZACKM2Wk2EgKuk67yzZ_cM",
    authDomain: "tareas-roles.firebaseapp.com",
    projectId: "tareas-roles",
    storageBucket: "tareas-roles.appspot.com",
    messagingSenderId: "897313939552",
    appId: "1:897313939552:web:df041993416c5971616305",
    measurementId: "G-E8YCZH7EGP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);
export const tareas = collection(db, 'tareas');
export const usuarios = collection(db, 'usuarios');
