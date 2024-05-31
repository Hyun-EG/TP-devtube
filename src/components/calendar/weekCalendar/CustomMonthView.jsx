import React from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(weekday);
dayjs.extend(localizedFormat);

const CustomMonthView = ({ date, localizer }) => {
  const events = useSelector((state) => state.events.items);
  const today = dayjs();

  const startOfCurrentWeek = today.startOf('week');
  const endOfCurrentWeek = today.endOf('week');

  const filterEventsForCurrentWeek = events.filter(event => {
    const eventStart = dayjs(event.start);
    return eventStart.isBetween(startOfCurrentWeek, endOfCurrentWeek, null, '[]');
  });

  const renderWeek = (date) => {
    const start = dayjs(date).startOf('week');
    const end = dayjs(date).endOf('week');

    const weekEvents = filterEventsForCurrentWeek.filter(event => {
      const eventStart = dayjs(event.start);
      return eventStart.isBetween(start, end, null, '[]');
    });

    return (
      <div className="custom-week-row">
        {Array.from({ length: 7 }).map((_, i) => {
          const day = start.add(i, 'day');
          return (
            <div key={i} className="day-column">
              <div className={`day-label ${day.isSame(today, 'day') ? 'today' : ''}`}>
                {day.format('D ddd')}
              </div>
              <div className="day-events">
                {weekEvents.filter(event => dayjs(event.start).isSame(day, 'day')).map((event, index) => (
                  <div key={index} className="event">
                    {event.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="custom-month-view">
      {renderWeek(today)}
    </div>
  );
};

export default CustomMonthView;
