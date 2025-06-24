"use client"
import { format, isSameDay } from "date-fns"
import EventItem from "../EventItem"

const DayView = ({ currentDate, events, onCreateEvent, onEditEvent, onDragEvent }) => {
  const timeSlots = []
  for (let hour = 0; hour < 24; hour++) {
    timeSlots.push(`${hour.toString().padStart(2, "0")}:00`)
    timeSlots.push(`${hour.toString().padStart(2, "0")}:30`)
  }

  const dayEvents = events.filter((event) =>
    isSameDay(new Date(event.date), currentDate)
  )

  const handleTimeSlotClick = (time) => {
    const dateStr = format(currentDate, "yyyy-MM-dd")
    const isConflict = dayEvents.some((event) => event.time === time)

    if (isConflict) {
      alert(`Conflict detected at ${time}. Please choose another time.`)
      return
    }

    onCreateEvent(dateStr, time)
  }

  const handleDrop = (e, time) => {
    e.preventDefault()
    const eventData = JSON.parse(e.dataTransfer.getData("text/plain"))
    const newDate = format(currentDate, "yyyy-MM-dd")
    onDragEvent(eventData.id, newDate, time)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  return (
    <div className="day-view">
      <div className="day-header">
        <h3>{format(currentDate, "EEEE, MMMM dd, yyyy")}</h3>
      </div>

      <div className="day-body">
        <div className="time-column">
          {timeSlots.map((time) => (
            <div key={time} className="time-slot">
              {time}
            </div>
          ))}
        </div>

        <div className="events-column">
          {timeSlots.map((time) => {
            const timeEvents = dayEvents.filter((event) => event.time === time)

            return (
              <div
                key={time}
                className="time-slot-cell"
                onClick={() => handleTimeSlotClick(time)}
                onDrop={(e) => handleDrop(e, time)}
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
      </div>
    </div>
  )
}

export default DayView
