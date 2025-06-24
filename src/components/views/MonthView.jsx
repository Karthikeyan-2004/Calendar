"use client"
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  isToday,
} from "date-fns"
import EventItem from "../EventItem"
import './MonthView.css';
import { hasTimeConflicts } from "../../utils/eventUtils"

const MonthView = ({ currentDate, events, onCreateEvent, onEditEvent, onDragEvent }) => {
  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(monthStart)
  const startDate = startOfWeek(monthStart)
  const endDate = endOfWeek(monthEnd)

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const rows = []
  let days = []
  let day = startDate

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      const cloneDay = new Date(day)
      const dayEvents = events.filter((event) => isSameDay(new Date(event.date), day))

      days.push({
        date: cloneDay,
        formattedDate: format(day, "d"),
        isCurrentMonth: isSameMonth(day, monthStart),
        isToday: isToday(day),
        events: dayEvents,
        hasConflicts: hasTimeConflicts(dayEvents),
      })
      day = addDays(day, 1)
    }
    rows.push(days)
    days = []
  }

  const handleDayClick = (date) => {
    onCreateEvent(format(date, "yyyy-MM-dd"))
  }

  const handleDrop = (e, date) => {
    e.preventDefault()
    const eventData = JSON.parse(e.dataTransfer.getData("text/plain"))
    const newDate = format(date, "yyyy-MM-dd")
    onDragEvent(eventData.id, newDate, eventData.time)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  return (
    <div className="month-view">
      {/* Week days header */}
      <div className="calendar-weekdays">
        {weekDays.map((day) => (
          <div key={day} className="weekday-header">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar days */}
      <div className="calendar-days">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="calendar-row">
            {row.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className={`calendar-day ${!day.isCurrentMonth ? "other-month" : ""} ${
                  day.isToday ? "today" : ""
                } ${day.hasConflicts ? "has-conflicts" : ""}`}
                onClick={() => handleDayClick(day.date)}
                onDrop={(e) => handleDrop(e, day.date)}
                onDragOver={handleDragOver}
              >
                <div className="day-number">{day.formattedDate}</div>

                <div className="day-events">
                  {day.events.slice(0, 3).map((event, eventIndex) => (
                    <EventItem
                      key={`${event.id}-${eventIndex}`}
                      event={event}
                      hasConflict={day.hasConflicts}
                      onEdit={onEditEvent}
                      draggable={true}
                    />
                  ))}

                  {day.events.length > 3 && <div className="more-events">+{day.events.length - 3} more</div>}
                </div>

                {day.hasConflicts && (
                  <div className="conflict-indicator" title="Time conflicts detected">
                    ⚠️
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default MonthView
