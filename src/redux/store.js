import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import userReducer from './userSlice';
import eventsReducer from './eventsSlice';
import earningsReducer from './earningsSlice';

const store = configureStore({
	reducer: {
		auth: authReducer,
		user: userReducer,
		events: eventsReducer,
		earnings: earningsReducer
	}
});

export default store;
