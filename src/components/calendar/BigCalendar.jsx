import React, { useCallback, useEffect, useState } from 'react';
import CalendarChild from './CalendarChild';
import EventModal from './EventModal';
import dayjs from 'dayjs';
import { useEvents } from './EventsContext';

const BigCalendar = () => {
	const { state, addEvent, updateEvent, deleteEvent } = useEvents();
	const { items: events, status } = state;

	const [selectedEvent, setSelectedEvent] = useState(null);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [headerTitle, setHeaderTitle] = useState('');

	useEffect(() => {
		console.log('Events state:', events);
	}, [events]);

	useEffect(() => {
		console.log('Status:', status);
	}, [status]);

	// drag, resize를 할 때 일정을 업데이트한다.
	const handleEventUpdate = useCallback(
		({ event, start, end }) => {
			const updatedEvent = {
				...event,
				start: dayjs(start).format('YYYY-MM-DDTHH:mm'),
				end: dayjs(end).format('YYYY-MM-DDTHH:mm')
			};
			updateEvent(updatedEvent);
		},
		[updateEvent]
	);

	// 새 일정 추가. 빈 칸을 클릭하면 새 일정을 추가하는 모달창이 뜬다.
	const newEvent = ({ start, end }) => {
		setSelectedEvent({
			title: '',
			start: dayjs(start).format('YYYY-MM-DDTHH:mm'),
			end: dayjs(end).format('YYYY-MM-DDTHH:mm'),
			note: '',
			colorbar: '',
		});
		setHeaderTitle('새 일정');
		setModalIsOpen(true);
	};

	// 일정 수정. 일정 막대를 클릭하면 일정을 수정하는 모달창이 뜬다.
	const handleSelectEvent = event => {
		setSelectedEvent({
			...event,
			start: dayjs(event.start).toDate(),
			end: dayjs(event.end).toDate()
		});
		setHeaderTitle('일정 수정하기');
		setModalIsOpen(true);
	};

	// 모달창 닫기.
	const handleModalClose = () => {
		setModalIsOpen(false);
		setSelectedEvent(null);
	};

	// 모달창에서 새 일정 또는 수정한 일정 저장하기.
	const handleModalSubmit = updatedEvent => {
		const eventToSave = {
			...updatedEvent,
			start: dayjs(updatedEvent.start).format('YYYY-MM-DDTHH:mm'),
			end: dayjs(updatedEvent.end).format('YYYY-MM-DDTHH:mm')
		};

		if (updatedEvent.id) {
			updateEvent(eventToSave);
		} else {
			addEvent(eventToSave);
		}
		setModalIsOpen(false);
	};

	// 모달창에서 삭제 버튼 눌러 일정 삭제하기.
	const handleDelete = id => {
		deleteEvent(id);
		setModalIsOpen(false);
	};

	// 파이어베이스에서 받아 온 dayjs의 문자열을 날짜로 고침
	const formattedEvents = events.map(event => ({
		...event,
		start: dayjs(event.start, 'YYYY-MM-DDTHH:mm').toDate(),
		end: dayjs(event.end, 'YYYY-MM-DDTHH:mm').toDate()
	}));

	// className customize
	const eventPropGetter = useCallback(
		(event, start, end, isSelected) => ({
			...(dayjs(start).hour() === 0 && // 시작 시간이 오전 12:00이고
				dayjs(end).hour() === 0 && // 종료 시간이 다음 날 오전 12:00이며
				dayjs(end).diff(dayjs(start), 'hours') <= 24 && { // 24시간 이하인 경우
				className: `one-day-schedule${event.colorbar.replace('#', '-')}`
			}),
			...(dayjs(start).isSame(end, 'day') && // 시작과 종료 날짜가 같고
				dayjs(end).diff(dayjs(start), 'hours') <= 24 && { // 그 기간이 24시간 이하인 경우
				className: `one-day-schedule${event.colorbar.replace('#', '-')}`
			}),
			...(dayjs(end).diff(dayjs(start), 'hours') > 24 && {
				className: `colorbar-${event.colorbar.replace('#', '')}`
			})

		}),
		[]
	);

	return (
		<>
			<CalendarChild
				events={formattedEvents}
				onEventDrop={handleEventUpdate}
				onEventResize={handleEventUpdate}
				onSelectSlot={newEvent} // 빈 칸 선택
				onSelectEvent={handleSelectEvent} // 일정 선택
				eventPropGetter={eventPropGetter}
			/>
			<EventModal
				isOpen={modalIsOpen}
				onRequestClose={handleModalClose}
				onSubmit={handleModalSubmit}
				onDelete={handleDelete}
				event={selectedEvent}
				headerTitle={headerTitle}
			/>
		</>
	);
};

export default BigCalendar;
