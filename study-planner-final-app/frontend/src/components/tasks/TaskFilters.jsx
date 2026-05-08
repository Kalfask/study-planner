import React from "react";

function TaskFilters({ activeFilter, setActiveFilter }) {
    const filters = ["All", "Pending", "In Progress", "Completed"];

    return (
        <div className="task-filters">
            {filters.map((filter) => (
                <button
                    key={filter}
                    className={`filter-btn ${activeFilter === filter ? "active" : ""}`}
                    onClick={() => setActiveFilter(filter)}
                >
                    {filter}
                </button>
            ))}
        </div>
    );
}

export default TaskFilters;