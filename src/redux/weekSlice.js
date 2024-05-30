import { createSlice } from '@reduxjs/toolkit';

const getWeekDates = (date, weekOffset = 0) => {
	const currentDate = new Date(date);
	currentDate.setDate(currentDate.getDate() + weekOffset * 7);
	const day = currentDate.getDay();
	const diff = currentDate.getDate() - day + (day === 0 ? -6 : 1);
	const startOfWeek = new Date(currentDate.setDate(diff));
	const dates = Array.from({ length: 7 }).map((_, i) => {
		const d = new Date(startOfWeek);
		d.setDate(d.getDate() + i);
		return d;
	});
	return dates;
};

const weekSlice = createSlice({
	name: 'week',
	initialState: {
		weekOffset: 0,
		weekDates: getWeekDates(new Date(), 0)
	},
	reducers: {
		setWeekOffset: (state, action) => {
			state.weekOffset = action.payload;
			state.weekDates = getWeekDates(new Date(), state.weekOffset);
		},
		incrementWeekOffset: state => {
			state.weekOffset += 1;
			state.weekDates = getWeekDates(new Date(), state.weekOffset);
		},
		decrementWeekOffset: state => {
			state.weekOffset -= 1;
			state.weekDates = getWeekDates(new Date(), state.weekOffset);
		}
	}
});

export const { setWeekOffset, incrementWeekOffset, decrementWeekOffset } =
	weekSlice.actions;

export default weekSlice.reducer;
