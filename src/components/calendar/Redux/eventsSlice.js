import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase/config';

// 파이어베이스에서 데이터 가져오기
export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
  try {
    const eventsCollection = collection(db, 'my-schedules');
    const eventsSnapshot = await getDocs(eventsCollection);
    return eventsSnapshot.docs.map(doc => {
      const data = doc.data();
      // Firebase에서 가져온 문자열을 그대로 사용하기
      return { id: doc.id, ...data, start: data.start, end: data.end };
    });
  } catch (error) {
    console.error("에러 발생", error);
    throw error;
  }
});

// 데이터 추가
export const addEvent = createAsyncThunk('events/addEvent', async (event) => {
  const newEvent = {
    ...event,
    start: event.start,
    end: event.end,
    note: event.note || ''
  };
  const docRef = await addDoc(collection(db, 'my-schedules'), newEvent);
  return { ...newEvent, id: docRef.id };
});

// 업데이트
export const updateEvent = createAsyncThunk('events/updateEvent', async (event) => {
  const updatedEvent = {
    ...event,
    start: event.start,
    end: event.end,
    note: event.note || ''
  };
  await updateDoc(doc(db, 'my-schedules', event.id), updatedEvent);
  return updatedEvent;
});

// 삭제
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
