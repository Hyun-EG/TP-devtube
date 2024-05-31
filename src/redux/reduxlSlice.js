import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	earnings: [
		{ date: '2024.05.30', type: '조회수', amount: 300000 },
		{ date: '2024.05.30', type: '멤버십', amount: 50000 },
		{ date: '2024.05.30', type: '광고', amount: 750000 },
		{ date: '2024.05.30', type: '광고', amount: 750000 },
		{ date: '2024.05.30', type: '광고', amount: 750000 }
	],
	isModalOpen: false
};

const earningsSlice = createSlice({
	name: 'earnings',
	initialState,
	reducers: {
		openModal: state => {
			state.isModalOpen = true;
		},
		closeModal: state => {
			state.isModalOpen = false;
		}
	}
});

export const { openModal, closeModal } = earningsSlice.actions;

export default earningsSlice.reducer;
