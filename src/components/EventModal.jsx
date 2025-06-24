"use client"

import { useState, useEffect } from "react"

const EventModal = ({ isOpen, mode, event, selectedDate, onSave, onDelete, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "09:00",
    duration: 60,
    category: "work",
    description: "",
  })

  useEffect(() => {
    if (mode === "edit" && event) {
      setFormData(event)
    } else if (mode === "create" && selectedDate) {
      setFormData((prev) => ({
        ...prev,
        date: selectedDate,
      }))
    }
  }, [mode, event, selectedDate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "duration" ? Number.parseInt(value) : value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.title.trim()) {
      onSave(formData)
    }
  }

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      onDelete(event.id)
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{mode === "create" ? "Create Event" : "Edit Event"}</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="event-form">
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Event title"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">Date *</label>
              <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="time">Time *</label>
              <input type="time" id="time" name="time" value={formData.time} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="duration">Duration (minutes)</label>
              <input
                type="number"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                min="15"
                step="15"
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select id="category" name="category" value={formData.category} onChange={handleChange}>
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="meeting">Meeting</option>
                <option value="appointment">Appointment</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              placeholder="Event description (optional)"
            />
          </div>

          <div className="form-actions">
            <div className="form-actions-left">
              {mode === "edit" && (
                <button type="button" className="delete-btn" onClick={handleDelete}>
                  Delete Event
                </button>
              )}
            </div>
            <div className="form-actions-right">
              <button type="button" className="cancel-btn" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="save-btn">
                {mode === "create" ? "Create Event" : "Save Changes"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EventModal
