// BigCalendar.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents, addEvent, updateEvent, deleteEvent } from './Redux/eventsSlice';
import CalendarChild from './CalendarChild';
import EventModal from './EventModal';

const BigCalendar = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.items);
  const status = useSelector((state) => state.events.status);
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
    setSelectedEvent({
      title: '',
      start: start.toISOString(),
      end: end.toISOString(),
      note: ''
    });
    setModalIsOpen(true);
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
    if (updatedEvent.id) {
      dispatch(updateEvent(updatedEvent));
    } else {
      dispatch(addEvent(updatedEvent));
    }
    setModalIsOpen(false);
  };

  const handleDelete = (id) => {
    dispatch(deleteEvent(id));
    setModalIsOpen(false);
  };

  return (
    <>
      <CalendarChild
        events={events}
        onEventDrop={moveEvent}
        onEventResize={resizeEvent}
        onSelectSlot={newEvent}
        onSelectEvent={handleSelectEvent}
      />
      <EventModal
        isOpen={modalIsOpen}
        onRequestClose={handleModalClose}
        onSubmit={handleModalSubmit}
        onDelete={handleDelete}
        event={selectedEvent}
      />
    </>
  );
};

export default BigCalendar;
