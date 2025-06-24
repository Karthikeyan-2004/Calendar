"use client"
import { addDays, format, isSameDay } from "date-fns"
import EventItem from "../EventItem"

const WeekView = ({ currentDate, events, onCreateEvent, onEditEvent, onDragEvent }) => {
  const timeSlots = []
  for (let hour = 0; hour < 24; hour++) {
    timeSlots.push(`${hour.toString().padStart(2, "0")}:00`)
    timeSlots.push(`${hour.toString().padStart(2, "0")}:30`)
  }

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(currentDate, i))

  const handleTimeSlotClick = (day, time) => {
    const dateStr = format(day, "yyyy-MM-dd")
    const dayEvents = events.filter((event) =>
      isSameDay(new Date(event.date), day)
    )

    const isConflict = dayEvents.some((event) => event.time === time)

    if (isConflict) {
      alert(`Conflict at ${time} on ${format(day, "EEE")}`)
      return
    }

    onCreateEvent(dateStr, time)
  }

  const handleDrop = (e, day, time) => {
    e.preventDefault()
    const eventData = JSON.parse(e.dataTransfer.getData("text/plain"))
    const newDate = format(day, "yyyy-MM-dd")
    onDragEvent(eventData.id, newDate, time)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  return (
    <div className="week-view">
      <div className="week-header">
        <div className="time-column" />
        {weekDays.map((day) => (
          <div key={day} className="day-header">
            {format(day, "EEE dd")}
          </div>
        ))}
      </div>

      <div className="week-body">
        <div className="time-column">
          {timeSlots.map((time) => (
            <div key={time} className="time-slot">
              {time}
            </div>
          ))}
        </div>

        {weekDays.map((day) => {
          const dayEvents = events.filter((event) =>
            isSameDay(new Date(event.date), day)
          )

          return (
            <div key={day} className="events-column">
              {timeSlots.map((time) => {
                const timeEvents = dayEvents.filter((event) => event.time === time)

                return (
                  <div
                    key={time}
                    className="time-slot-cell"
                    onClick={() => handleTimeSlotClick(day, time)}
                    onDrop={(e) => handleDrop(e, day, time)}
                    onDragOver={handleDragOver}
                  >
                    {timeEvents.map((event, idx) => (
                      <div
                        key={event.id}
                        style={{
                          width: `${100 / timeEvents.length}%`,
                          display: "inline-block",
                          verticalAlign: "top",
                        }}
                      >
                        <EventItem
                          event={event}
                          onEdit={onEditEvent}
                          draggable={true}
                          expanded={true}
                        />
                      </div>
                    ))}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default WeekView
