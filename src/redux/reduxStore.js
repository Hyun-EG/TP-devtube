import { configureStore } from '@reduxjs/toolkit';
import earningsReducer from './reduxlSlice';

export const store = configureStore({
	reducer: {
		earnings: earningsReducer
	}
});
