
// 직렬화(Serialization)는 데이터 구조나 객체 상태를 저장하거나 전송할 수 있는 형식으로 변환하는 과정입니다. 역직렬화(Deserialization)는 이 형식에서 다시 원래의 데이터 구조나 객체 상태로 변환하는 과정입니다. 직렬화된 데이터는 일반적으로 문자열 형식으로, 네트워크를 통해 전송하거나 파일에 저장할 수 있습니다.

// 왜 직렬화가 중요한가요?
// 디버깅: 직렬화된 상태를 쉽게 검사하고, 저장하고, 로그로 남길 수 있습니다. 이는 디버깅 과정에서 매우 유용합니다.
// 상태 복원: 애플리케이션의 상태를 저장하고 나중에 복원할 수 있습니다. 예를 들어, 사용자가 앱을 닫았다가 다시 열 때 상태를 그대로 유지할 수 있습니다.
// 타임 트래블 디버깅: Redux DevTools 같은 도구는 애플리케이션의 상태를 시간 순서대로 탐색하고, 이전 상태로 되돌리거나 다시 재생할 수 있게 합니다. 이는 상태가 직렬화 가능할 때 가능해집니다.
// 왜 Redux는 직렬화를 권장하나요?
// Redux는 상태 관리를 위한 라이브러리로, 애플리케이션의 상태를 예측 가능하게 관리하는 것이 중요합니다. 상태가 직렬화 가능하면, 상태를 쉽게 저장하고 로드할 수 있으며, 상태 변경을 추적하고 재현할 수 있습니다. 이는 특히 큰 애플리케이션에서 상태 관리의 복잡성을 줄이고, 디버깅과 테스트를 더 쉽게 만듭니다.

// Redux에서는 어떤 방식으로 직렬화를 하나요?
// Redux 자체는 직렬화와 직렬화 해제 과정에 관여하지 않습니다. 대신, 상태와 액션이 직렬화 가능하도록 설계하는 것은 사용자의 몫입니다. Redux에서 직렬화 가능한 상태를 유지하기 위한 몇 가지 권장 사항은 다음과 같습니다:

// 직렬화 가능한 값만 사용: 상태와 액션에는 기본 데이터 타입(숫자, 문자열, 배열, 객체 등)만 포함되도록 합니다. 날짜 객체(Date object)나 함수 같은 직렬화 불가능한 값을 포함하지 않습니다.
// JSON 형식 사용: 상태를 저장하거나 전송할 때 JSON 형식을 사용합니다. JSON.stringify()와 JSON.parse()를 이용해 쉽게 직렬화와 역직렬화를 할 수 있습니다.
// 데이터 변환: 필요할 때 상태를 직렬화 가능하게 변환합니다. 예를 들어, 날짜 객체를 문자열 형식으로 변환해 저장하고, 사용할 때 다시 날짜 객체로 변환할 수 있습니다.
// 예제 코드
// 다음은 날짜 객체를 직렬화 가능한 문자열 형식으로 변환하는 예제 코드입니다:

// javascript
// 코드 복사
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import moment from 'moment';

// Fetch events from Firebase and convert dates to strings
export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
  try {
    const eventsCollection = collection(db, 'my-schedules');
    const eventsSnapshot = await getDocs(eventsCollection);
    return eventsSnapshot.docs.map(doc => {
      const data = doc.data();
      return { id: doc.id, ...data, start: moment(data.start).format(), end: moment(data.end).format() };
    });
  } catch (error) {
    console.error("Error fetching events: ", error);
    throw error;
  }
});

// Add event with dates as strings
export const addEvent = createAsyncThunk('events/addEvent', async (event) => {
  const newEvent = {
    ...event,
    start: moment(event.start).format(),
    end: moment(event.end).format(),
    note: event.note || ''
  };
  const docRef = await addDoc(collection(db, 'my-schedules'), newEvent);
  return { ...newEvent, id: docRef.id };
});

// Update event with dates as strings
export const updateEvent = createAsyncThunk('events/updateEvent', async (event) => {
  const updatedEvent = {
    ...event,
    start: moment(event.start).format(),
    end: moment(event.end).format(),
    note: event.note || ''
  };
  await updateDoc(doc(db, 'my-schedules', event.id), updatedEvent);
  return updatedEvent;
});

// Delete event
export const deleteEvent = createAsyncThunk('events/deleteEvent', async (id) => {
  await deleteDoc(doc(db, 'my-schedules', id));
  return id;
});

// Events slice
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
        state.items = action.payload.map(event => ({
          ...event,
          start: moment(event.start).toDate(),
          end: moment(event.end).toDate()
        }));
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addEvent.fulfilled, (state, action) => {
        state.items.push({
          ...action.payload,
          start: moment(action.payload.start).toDate(),
          end: moment(action.payload.end).toDate()
        });
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        const index = state.items.findIndex(event => event.id === action.payload.id);
        state.items[index] = {
          ...action.payload,
          start: moment(action.payload.start).toDate(),
          end: moment(action.payload.end).toDate()
        };
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.items = state.items.filter(event => event.id !== action.payload);
      });
  },
});

export default eventsSlice.reducer;
// 이 예제에서는 Firebase에서 날짜를 가져올 때, 날짜 문자열을 moment를 사용하여 변환한 후 다시 날짜 객체로 변환합니다.이로써 상태와 액션이 직렬화 가능한 형식을 유지하면서, 사용할 때는 날짜 객체로 쉽게 변환할 수 있습니다.