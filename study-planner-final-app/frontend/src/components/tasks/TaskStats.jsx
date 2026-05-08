import React from "react";

function TaskStats({ tasks }) {
    const total = tasks.length;
    const pending = tasks.filter((task) => task.status === "Pending").length;
    const inProgress = tasks.filter((task) => task.status === "In Progress").length;
    const completed = tasks.filter((task) => task.status === "Completed").length;

    return (
        <div className="task-stats-grid">
            <div className="task-stat-card">
                <span>Total Tasks</span>
                <strong>{total}</strong>
            </div>

            <div className="task-stat-card">
                <span>Pending</span>
                <strong>{pending}</strong>
            </div>

            <div className="task-stat-card">
                <span>In Progress</span>
                <strong>{inProgress}</strong>
            </div>

            <div className="task-stat-card">
                <span>Completed</span>
                <strong>{completed}</strong>
            </div>
        </div>
    );
}

export default TaskStats;