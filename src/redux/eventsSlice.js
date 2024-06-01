import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
	try {
		const eventsCollection = collection(db, 'my-schedules');
		const eventsSnapshot = await getDocs(eventsCollection);
		return eventsSnapshot.docs.map(doc => {
			const data = doc.data();

			return { id: doc.id, ...data, start: data.start, end: data.end };
		});
	} catch (error) {
		console.error('에러 발생', error);
		throw error;
	}
});

const eventsSlice = createSlice({
	name: 'events',
	initialState: {
		events: [],
		status: null
	},
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchEvents.pending, state => {
				state.status = 'loading';
			})
			.addCase(fetchEvents.fulfilled, (state, action) => {
				state.status = 'success';
				state.events = action.payload;
			})
			.addCase(fetchEvents.rejected, state => {
				state.status = 'failed';
			});
	}
});

export default eventsSlice.reducer;
