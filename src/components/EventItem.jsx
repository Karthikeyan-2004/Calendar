"use client"
import { getEventColor } from "../utils/eventUtils"

const EventItem = ({ event, hasConflict, onEdit, draggable = false, compact = false, expanded = false }) => {
  const handleClick = (e) => {
    e.stopPropagation()
    onEdit(event)
  }

  const handleDragStart = (e) => {
    if (draggable) {
      e.dataTransfer.setData("text/plain", JSON.stringify(event))
    }
  }

  const eventStyle = {
    backgroundColor: getEventColor(event.category),
    borderLeft: hasConflict ? "3px solid #ef4444" : "none",
  }

  const className = `event-item ${hasConflict ? "conflict" : ""} ${compact ? "compact" : ""} ${expanded ? "expanded" : ""}`

  return (
    <div
      className={className}
      style={eventStyle}
      onClick={handleClick}
      draggable={draggable}
      onDragStart={handleDragStart}
      title={`${event.title}\n${event.time} (${event.duration}min)\n${event.description || ""}`}
    >
      {!compact && <div className="event-time">{event.time}</div>}
      <div className="event-title">{event.title}</div>
      {expanded && event.description && <div className="event-description">{event.description}</div>}
    </div>
  )
}

export default EventItem
