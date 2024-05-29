import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase/config';

export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
  const eventsCollection = collection(db, 'my-schedules');
  const eventsSnapshot = await getDocs(eventsCollection);
  return eventsSnapshot.docs.map(doc => {
    const data = doc.data();
    return { id: doc.id, ...data, start: data.start, end: data.end };
  });
});

export const addEvent = createAsyncThunk('events/addEvent', async (event) => {
  const newEvent = {
    ...event,
    start: event.start,
    end: event.end,
    memo: event.memo || ''
  };
  const docRef = await addDoc(collection(db, 'my-schedules'), newEvent);
  return { ...newEvent, id: docRef.id };
});

export const updateEvent = createAsyncThunk('events/updateEvent', async (event) => {
  const updatedEvent = {
    ...event,
    start: event.start,
    end: event.end,
    memo: event.memo || ''
  };
  await updateDoc(doc(db, 'my-schedules', event.id), updatedEvent);
  return updatedEvent;
});

export const deleteEvent = createAsyncThunk('events/deleteEvent', async (id) => {
  await deleteDoc(doc(db, 'my-schedules', id));
  return id;
});

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addEvent.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        const index = state.items.findIndex(event => event.id === action.payload.id);
        state.items[index] = action.payload;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.items = state.items.filter(event => event.id !== action.payload);
      });
  },
});

export default eventsSlice.reducer;
