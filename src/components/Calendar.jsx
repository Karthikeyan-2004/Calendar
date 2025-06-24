"use client"

import { useState } from "react"
import MonthView from "./views/MonthView"
import WeekView from "./views/WeekView"
import DayView from "./views/DayView"
import CalendarHeader from "./CalendarHeader"


const Calendar = ({ events, onCreateEvent, onEditEvent, onDragEvent, currentView }) => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const handleDateChange = (date) => {
  setCurrentDate(date);
};


  const navigateDate = (direction) => {
    const newDate = new Date(currentDate)

    switch (currentView) {
      case "month":
        newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1))
        break
      case "week":
        newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7))
        break
      case "day":
        newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1))
        break
      default:
        break
    }

    setCurrentDate(newDate)
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  const renderView = () => {
    const commonProps = {
      currentDate,
      events,
      onCreateEvent,
      onEditEvent,
      onDragEvent,
    }

    switch (currentView) {
      case "month":
        return <MonthView {...commonProps} />
      case "week":
        return <WeekView {...commonProps} />
      case "day":
        return <DayView {...commonProps} />
      default:
        return <MonthView {...commonProps} />
    }
  }

  return (
    <div className="calendar-container">
      <CalendarHeader
  currentDate={currentDate}
  currentView={currentView}
  onNavigate={navigateDate}
  onToday={goToToday}
  onDateChange={handleDateChange}
/>

      {renderView()}
    </div>
  )
}

export default Calendar
