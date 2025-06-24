export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

export const formatDuration = (minutes) => {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60

  if (hours === 0) {
    return `${mins}min`
  } else if (mins === 0) {
    return `${hours}h`
  } else {
    return `${hours}h ${mins}min`
  }
}

export const parseTime = (timeString) => {
  const [hours, minutes] = timeString.split(":").map(Number)
  return { hours, minutes }
}

export const formatTime = (hours, minutes) => {
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`
}
