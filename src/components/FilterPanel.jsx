"use client"

const FilterPanel = ({ activeFilters, onFiltersChange }) => {
  const categories = [
    { id: "work", label: "Work", color: "#3b82f6" },
    { id: "personal", label: "Personal", color: "#10b981" },
    { id: "meeting", label: "Meeting", color: "#f59e0b" },
    { id: "appointment", label: "Appointment", color: "#ef4444" },
  ]

  const toggleFilter = (categoryId) => {
    if (activeFilters.includes(categoryId)) {
      onFiltersChange(activeFilters.filter((id) => id !== categoryId))
    } else {
      onFiltersChange([...activeFilters, categoryId])
    }
  }

  const clearFilters = () => {
    onFiltersChange([])
  }

  return (
    <div className="filter-panel">
      <div className="filter-header">
        <span>Filter by Category:</span>
        {activeFilters.length > 0 && (
          <button className="clear-filters-btn" onClick={clearFilters}>
            Clear All
          </button>
        )}
      </div>

      <div className="filter-options">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`filter-option ${activeFilters.includes(category.id) ? "active" : ""}`}
            onClick={() => toggleFilter(category.id)}
            style={{
              "--category-color": category.color,
            }}
          >
            <span className="filter-color" style={{ backgroundColor: category.color }}></span>
            {category.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default FilterPanel
