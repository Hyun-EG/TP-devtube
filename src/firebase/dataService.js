import {
	getFirestore,
	collection,
	query,
	where,
	getDocs
} from 'firebase/firestore';
import { db } from './config';

export const getUserByEmail = async email => {
	try {
		const q = query(collection(db, 'users'), where('email', '==', email));
		const querySnapshot = await getDocs(q);
		if (!querySnapshot.empty) {
			let userData = null;
			querySnapshot.forEach(doc => {
				userData = doc.data();
			});
			return userData;
		} else {
			return null;
		}
	} catch (error) {
		console.error('Error getting user by email: ', error);
		throw error;
	}
};
