import React from 'react'
import BigCalendar from '../components/calendar/BigCalendar'
import Header from '../components/Header'
import Sidebar from '../components/SideBar'

const Calendar = () => {
  return (
    <div className='calendar'>
      <Header />
      <Sidebar />
      <BigCalendar />
    </div>
  )
}

export default Calendar