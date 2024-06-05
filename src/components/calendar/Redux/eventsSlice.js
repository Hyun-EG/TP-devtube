import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase/config';

// 파이어베이스에서 데이터 가져오기
// 이메일 정보를 가져오기
// 아이디(이메일)을 바탕으로 일정 가져오기

// 파이어베이스의 users 문서 이름과 아이디가 일치하는 게 있는지 확인한다.
// 일치하는 id의 문서에 my-schedulse 콜렉션 crud를 넣는다.

// 로컬 스토리지의 userData에서 아이디만 가져온다.
const LocalStorageUserData = () => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  return userData ? userData.id : null;
};

// users 콜렉션 > users의 문서 이름(즉, userData.id) > my-schedules 콜렉션 > 문서 이름
export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {

  const userId = LocalStorageUserData();
  if (!userId) {
    throw new Error('로그인 사용자 없음.');
  }

  const eventsCollection = collection(db, `users/${userId}/my-schedules`);
  const eventsSnapshot = await getDocs(eventsCollection);
  return eventsSnapshot.docs.map(doc => {
    const data = doc.data();
    return { id: doc.id, ...data, start: data.start, end: data.end };
  });
});

export const addEvent = createAsyncThunk('events/addEvent', async (event) => {
  const userId = LocalStorageUserData();
  if (!userId) {
    throw new Error('로그인 사용자 없음.');
  }

  const newEvent = {
    ...event,
    start: event.start,
    end: event.end,
    note: event.note || ''
  };
  const docRef = await addDoc(collection(db, `users/${userId}/my-schedules`), newEvent);
  return { ...newEvent, id: docRef.id };
});

export const updateEvent = createAsyncThunk('events/updateEvent', async (event) => {
  const userId = LocalStorageUserData();
  if (!userId) {
    throw new Error('로그인된 사용자가 없습니다.');
  }

  const updatedEvent = {
    ...event,
    start: event.start,
    end: event.end,
    note: event.note || ''
  };
  await updateDoc(doc(db, `users/${userId}/my-schedules`, event.id), updatedEvent);
  return updatedEvent;
});

export const deleteEvent = createAsyncThunk('events/deleteEvent', async (id) => {
  const userId = LocalStorageUserData();
  if (!userId) {
    throw new Error('로그인된 사용자가 없습니다.');
  }

  await deleteDoc(doc(db, `users/${userId}/my-schedules`, id));
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
