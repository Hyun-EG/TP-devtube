import React from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
// ▼ React Big Calendar의 addon. available drag and drop, and resize events
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import dayjs from 'dayjs';
// ▼ KST timezone
import 'dayjs/locale/ko';
// ▼ drag and drop 관련 CSS(없으면 dragAndDrop도 resize도 잘 안 됩니다.)
import '../../styles/components/calendar/_dragAndDrop.scss';
import '../../styles/components/calendar/_bigCalendar.scss';
// ▼ 번역어 정리
import { messages, formats } from './KoreanLang';

// ▼ 로컬라이저(지역화)
dayjs.locale('ko');
const localizer = dayjsLocalizer(dayjs);

// ▼ event bar의 드래그 앤 드롭 기능이 붙어 있는 함수
const DragAndDropCalendar = withDragAndDrop(Calendar);

const CalendarChild = ({
	events,
	onEventDrop,
	onEventResize,
	onSelectSlot,
	onSelectEvent,
	eventPropGetter
}) => {
	// ReactBigCalendar 중 dragAndDrop add-on의 기본 양식에 일부 추가함.
	return (
		<DragAndDropCalendar
			culture="ko"
			localizer={localizer}
			events={events}
			onEventDrop={onEventDrop}
			onEventResize={onEventResize}
			selectable
			resizable
			onSelectSlot={onSelectSlot}
			onSelectEvent={onSelectEvent}
			popup
			eventPropGetter={eventPropGetter}
			messages={messages}
			formats={formats}
		/>
	);
};

export default CalendarChild;
