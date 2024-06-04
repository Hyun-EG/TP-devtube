import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import userReducer from './userSlice';
import eventsReducer from './eventsSlice';

const store = configureStore({
	reducer: {
		auth: authReducer,
		user: userReducer,
		events: eventsReducer
	}
});

export default store;
