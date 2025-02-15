// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyBLCoUBnk1y1Dmoz6wBqKDf7xgTPQ2ac0I",
	authDomain: "expense-tracker-5163a.firebaseapp.com",
	projectId: "expense-tracker-5163a",
	storageBucket: "expense-tracker-5163a.firebasestorage.app",
	messagingSenderId: "449993753481",
	appId: "1:449993753481:web:7a2e4799e53e40bf4f5758",
	measurementId: "G-R6XRKDHZ7H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
