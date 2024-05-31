import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isModalOpen: false,
	selectedEarning: null,
	earnings: [
		{ id: 1, date: '2024.05.30', type: '조회수', amount: 300000 },
		{ id: 2, date: '2024.05.30', type: '멤버십', amount: 50000 },
		{ id: 3, date: '2024.05.30', type: '광고', amount: 750000 },
		{ id: 4, date: '2024.05.30', type: '광고', amount: 750000 },
		{ id: 5, date: '2024.05.30', type: '광고', amount: 750000 }
	]
};

const earningsSlice = createSlice({
	name: 'earnings',
	initialState,
	reducers: {
		openModal: (state, action) => {
			state.isModalOpen = true;
			state.selectedEarning = action.payload;
		},
		closeModal: (state, action) => {
			state.isModalOpen = false;
			state.selectedEarning = null;
		}
	}
});

export const { openModal, closeModal } = earningsSlice.actions;

export default earningsSlice.reducer;
