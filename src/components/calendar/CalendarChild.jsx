// CalendarComponent.js
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import './css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const CalendarComponent = ({ events, onEventDrop, onEventResize, onSelectSlot, onSelectEvent }) => {
  return (
    <Calendar
      localizer={localizer}
      events={events}
      onEventDrop={onEventDrop}
      onEventResize={onEventResize}
      selectable
      resizable
      onSelectSlot={onSelectSlot}
      onSelectEvent={onSelectEvent}
      style={{ height: 900 }}
    />
  );
};

export default CalendarComponent;
