import React from 'react';
import { Calendar, dayjsLocalizer, Views } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import dayjs from 'dayjs';
import 'dayjs/locale/ko'
// drag and drop 관련 CSS(없으면 dragAndDrop도 resize도 잘 안 됩니다.)
import '../css/dragAndDrop/styles.css';
// 달력, 주력 스타일 교체용 css 파일입니다. 이 파일을 scss 형식으로 고쳐야 합니다. 일부분은 figma 디자인에 따라 수정하고, // 표시를 붙였습니다.
import '../css/csstest.css';
// 번역어 정리
import { messages, formats } from '../KoreanLang'

// ▼ 로컬라이저(지역화)
dayjs.locale('ko')
const localizer = dayjsLocalizer(dayjs);

// ▼ event bar의 드래그 앤 드롭 기능이 붙어 있는 함수
const DragAndDropCalendar = withDragAndDrop(Calendar)

const CalendarChildWeek = ({ events, onEventDrop, onEventResize, onSelectSlot, onSelectEvent, eventPropGetter }) => {

  return (
    <DragAndDropCalendar
      defaultView={Views.WEEK} // 일주일 뷰를 기본으로 설정
      views={[Views.WEEK]} // 사용 가능한 뷰를 일주일 뷰로 제한
      culture='ko'
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
      // showAllEvents={true}
      style={{ height: '100vh', width: '80%', margin: 'auto' }} // 임시로 지정한 스타일.

    />
  );
};

export default CalendarChildWeek;
