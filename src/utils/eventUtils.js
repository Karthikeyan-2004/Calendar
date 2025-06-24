export const getEventColor = (category) => {
  const colors = {
    work: "#3b82f6",
    personal: "#10b981",
    meeting: "#f59e0b",
    appointment: "#ef4444",
    default: "#6b7280",
  }
  return colors[category] || colors.default
}

export const hasTimeConflicts = (events) => {
  if (events.length <= 1) return false

  for (let i = 0; i < events.length; i++) {
    for (let j = i + 1; j < events.length; j++) {
      const event1 = events[i]
      const event2 = events[j]

      const start1 = new Date(`${event1.date} ${event1.time}`)
      const end1 = new Date(start1.getTime() + event1.duration * 60000)
      const start2 = new Date(`${event2.date} ${event2.time}`)
      const end2 = new Date(start2.getTime() + event2.duration * 60000)

      if (start1 < end2 && start2 < end1) {
        return true
      }
    }
  }
  return false
}

export const sortEventsByTime = (events) => {
  return events.sort((a, b) => {
    const timeA = new Date(`${a.date} ${a.time}`)
    const timeB = new Date(`${b.date} ${b.time}`)
    return timeA - timeB
  })
}
