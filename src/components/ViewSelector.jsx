"use client"

const ViewSelector = ({ currentView, onViewChange }) => {
  const views = [
    { id: "month", label: "Month", icon: "📅" },
    { id: "week", label: "Week", icon: "📊" },
    { id: "day", label: "Day", icon: "📋" },
  ]

  return (
    <div className="view-selector">
      {views.map((view) => (
        <button
          key={view.id}
          className={`view-btn ${currentView === view.id ? "active" : ""}`}
          onClick={() => onViewChange(view.id)}
        >
          <span className="view-icon">{view.icon}</span>
          {view.label}
        </button>
      ))}
    </div>
  )
}

export default ViewSelector
