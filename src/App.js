"use client"

import { useState, useEffect } from "react"
import Calendar from "./components/Calendar"
import EventModal from "./components/EventModal"
import FilterPanel from "./components/FilterPanel"
import ViewSelector from "./components/ViewSelector"
import { eventsData } from "./data/events"
import { generateId } from "./utils/helpers"
import "./App.css"

function App() {
  const [events, setEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState("create") // 'create' or 'edit'
  const [selectedDate, setSelectedDate] = useState(null)
  const [currentView, setCurrentView] = useState("month") // 'month', 'week', 'day'
  const [activeFilters, setActiveFilters] = useState([])

  useEffect(() => {
    setEvents(eventsData)
  }, [])

  const handleCreateEvent = (date) => {
    setSelectedDate(date)
    setSelectedEvent(null)
    setModalMode("create")
    setIsModalOpen(true)
  }

  const handleEditEvent = (event) => {
    setSelectedEvent(event)
    setModalMode("edit")
    setIsModalOpen(true)
  }

  const handleSaveEvent = (eventData) => {
    if (modalMode === "create") {
      const newEvent = {
        ...eventData,
        id: generateId(),
      }
      setEvents((prev) => [...prev, newEvent])
    } else {
      setEvents((prev) =>
        prev.map((event) => (event.id === selectedEvent.id ? { ...eventData, id: selectedEvent.id } : event)),
      )
    }
    setIsModalOpen(false)
    setSelectedEvent(null)
  }

  const handleDeleteEvent = (eventId) => {
    setEvents((prev) => prev.filter((event) => event.id !== eventId))
    setIsModalOpen(false)
    setSelectedEvent(null)
  }

  const handleDragEvent = (eventId, newDate, newTime) => {
    setEvents((prev) =>
      prev.map((event) => (event.id === eventId ? { ...event, date: newDate, time: newTime } : event)),
    )
  }

  const filteredEvents =
    activeFilters.length > 0 ? events.filter((event) => activeFilters.includes(event.category)) : events

  return (
    <div className="app">
      <header className="app-header">
        <h1>Calendar Application</h1>
        <div className="header-controls">
          <ViewSelector currentView={currentView} onViewChange={setCurrentView} />
          <FilterPanel activeFilters={activeFilters} onFiltersChange={setActiveFilters} />
        </div>
      </header>

      <main className="app-main">
        <Calendar
          events={filteredEvents}
          onCreateEvent={handleCreateEvent}
          onEditEvent={handleEditEvent}
          onDragEvent={handleDragEvent}
          currentView={currentView}
        />
      </main>

      {isModalOpen && (
        <EventModal
          isOpen={isModalOpen}
          mode={modalMode}
          event={selectedEvent}
          selectedDate={selectedDate}
          onSave={handleSaveEvent}
          onDelete={handleDeleteEvent}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  )
}

export default App
