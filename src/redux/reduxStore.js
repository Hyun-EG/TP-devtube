import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './reduxlSlice';

export const store = configureStore({
	reducer: {
		modal: modalReducer
	}
});
