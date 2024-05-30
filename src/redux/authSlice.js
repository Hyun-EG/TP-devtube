import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		user: null,
		loading: false,
		error: null,
		signUpError: null,
		signUpSuccess: false
	},
	reducers: {
		setUser(state, action) {
			state.user = action.payload;
		},
		setLoading(state, action) {
			state.loading = action.payload;
		},
		setError(state, action) {
			state.error = action.payload;
		},
		clearError(state) {
			state.error = null;
		},
		setSignUpError(state, action) {
			state.signUpError = action.payload;
		},
		setSignUpSuccess(state, action) {
			state.signUpSuccess = action.payload;
		},
		clearSignUpSuccess(state) {
			state.signUpSuccess = false;
		}
	}
});

export const {
	setUser,
	setLoading,
	setError,
	clearError,
	setSignUpError,
	setSignUpSuccess,
	clearSignUpSuccess
} = authSlice.actions;

export default authSlice.reducer;
