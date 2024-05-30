import { createAsyncThunk } from '@reduxjs/toolkit';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

export const fetchUserData = createAsyncThunk(
	'user/fetchUserData',
	async (email, thunkAPI) => {
		try {
			const q = query(collection(db, 'users'), where('email', '==', email));
			const querySnapshot = await getDocs(q);
			let userData = null;
			querySnapshot.forEach(doc => {
				userData = doc.data();
			});
			if (!userData) {
				throw new Error('No user data found');
			}
			return userData;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);
