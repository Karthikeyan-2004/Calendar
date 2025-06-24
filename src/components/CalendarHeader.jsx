"use client"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./CalendarHeader.css"
import { format } from "date-fns"


const CalendarHeader = ({ currentDate, currentView, onNavigate, onToday, onDateChange }) => {
  const getDateFormat = () => {
    switch (currentView) {
      case "month":
        return "MMMM yyyy"
      case "week":
        return "MMM dd, yyyy"
      case "day":
        return "EEEE, MMMM dd, yyyy"
      default:
        return "MMMM yyyy"
    }
  }

  return (
    <div className="calendar-header">
      <div className="calendar-header-left">
        <button className="today-btn" onClick={onToday}>
          📅 Today
        </button>
      </div>

      <div className="calendar-header-center">
        <button className="nav-btn" onClick={() => onNavigate("prev")}>
          ‹
        </button>
        {/* <h2 className="calendar-title">{format(currentDate, getDateFormat())}</h2> */}
        <DatePicker
        selected={currentDate}
        onChange={onDateChange}
        dateFormat={getDateFormat()}
        showMonthYearPicker={currentView === "month"}
        className="custom-datepicker"
        calendarClassName="custom-calendar-popup"

      />
        <button className="nav-btn" onClick={() => onNavigate("next")}>
          ›
        </button>
      </div>

      <div className="calendar-header-right">{/* Additional controls can go here */}</div>
    </div>
  )
}

export default CalendarHeader
