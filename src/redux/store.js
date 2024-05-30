import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import userReducer from './userSlice';
import weekReducer from './weekSlice';

const store = configureStore({
	reducer: {
		auth: authReducer,
		user: userReducer,
		week: weekReducer
	}
});

export default store;
