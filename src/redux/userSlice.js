import { createSlice } from '@reduxjs/toolkit';
import { fetchUserData } from './userAction';

const userSlice = createSlice({
	name: 'user',
	initialState: {
		data: null,
		loading: false,
		error: null
	},
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchUserData.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchUserData.fulfilled, (state, action) => {
				state.loading = false;
				state.data = action.payload;
			})
			.addCase(fetchUserData.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	}
});

export default userSlice.reducer;
