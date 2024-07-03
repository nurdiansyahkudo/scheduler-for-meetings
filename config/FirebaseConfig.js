// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: 'yann-projects.firebaseapp.com',
	projectId: 'yann-projects',
	storageBucket: 'yann-projects.appspot.com',
	messagingSenderId: '746779393461',
	appId: '1:746779393461:web:3337fdc80a7fc8da7dedfc',
	measurementId: 'G-R67K7JFWTS',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
