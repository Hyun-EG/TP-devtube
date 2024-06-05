import React from 'react';
import BigCalendar from '../components/calendar/BigCalendar';
import Header from '../components/Header';
import Sidebar from '../components/SideBar';
import { EventsProvider } from '../components/calendar/EventsContext';

const Calendar = () => {
	return (
		<EventsProvider>
			<div className="calendar">
				<Header />
				<Sidebar />
				<BigCalendar />
			</div>
		</EventsProvider>
	);
};

export default Calendar;
