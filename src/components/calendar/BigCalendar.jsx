import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import { fetchEvents, addEvent, updateEvent, deleteEvent } from './eventsSlice';
import EventModal from './EventModal';

const DragAndDropCalendar = withDragAndDrop(Calendar);

moment.locale('ko-KR');
const localizer = momentLocalizer(moment);

const BigCalendar = () => {
  const dispatch = useDispatch();
  const events = useSelector(state => state.events.items);
  const status = useSelector(state => state.events.status);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchEvents());
    }
  }, [status, dispatch]);

  const moveEvent = ({ event, start, end }) => {
    const updatedEvent = { ...event, start: start.toISOString(), end: end.toISOString() };
    dispatch(updateEvent(updatedEvent));
  };

  const resizeEvent = ({ event, start, end }) => {
    const updatedEvent = { ...event, start: start.toISOString(), end: end.toISOString() };
    dispatch(updateEvent(updatedEvent));
  };

  const newEvent = ({ start, end }) => {
    const title = window.prompt('New Event name');
    if (title) {
      const newEvent = {
        title,
        start: start.toISOString(),
        end: end.toISOString(),
        memo: ''
      };
      dispatch(addEvent(newEvent));
    }
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
    setSelectedEvent(null);
  };

  const handleModalSubmit = (updatedEvent) => {
    dispatch(updateEvent(updatedEvent));
  };

  return (
    <>
      <DragAndDropCalendar
        localizer={localizer}
        events={events}
        onEventDrop={moveEvent}
        onEventResize={resizeEvent}
        selectable
        resizable
        onSelectSlot={newEvent}
        onSelectEvent={handleSelectEvent}
        style={{ height: 900 }}
      />
      <EventModal
        isOpen={modalIsOpen}
        onRequestClose={handleModalClose}
        onSubmit={handleModalSubmit}
        event={selectedEvent}
      />
    </>
  );
};

export default BigCalendar;
