// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import {
	getFirestore,
	collection,
	addDoc,
	doc,
	updateDoc,
	deleteDoc,
	getDocs
} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
	apiKey: 'AIzaSyBlO0XXeM-v_YEfxxGG5KL7AuKXUTAd3b4',
	authDomain: 'devtube-46156.firebaseapp.com',
	projectId: 'devtube-46156',
	storageBucket: 'devtube-46156.appspot.com',
	messagingSenderId: '909710707296',
	appId: '1:909710707296:web:4fdef9c8d68d9ada365105'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
