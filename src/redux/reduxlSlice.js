import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isModalOpen: false,
	selectedEarning: null,
	currentPage: 1,
	earnings: [
		{ id: 1, date: '2024.05.30', type: '조회수', amount: 300000 },
		{ id: 2, date: '2024.05.30', type: '멤버십', amount: 50000 },
		{ id: 3, date: '2024.05.30', type: '광고', amount: 750000 },
		{ id: 4, date: '2024.05.30', type: '광고', amount: 750000 },
		{ id: 5, date: '2024.05.30', type: '광고', amount: 750000 },
		{ id: 6, date: '2024.05.30', type: '슈퍼챗', amount: 5000 },
		{ id: 7, date: '2024.05.30', type: '슈퍼챗', amount: 5000 },
		{ id: 8, date: '2024.05.30', type: '슈퍼챗', amount: 10000 }
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
		closeModal: state => {
			state.isModalOpen = false;
			state.selectedEarning = null;
		},
		setCurrentPage: (state, action) => {
			state.currentPage = action.payload;
		}
	}
});

export const { openModal, closeModal, setCurrentPage } = earningsSlice.actions;

export default earningsSlice.reducer;
