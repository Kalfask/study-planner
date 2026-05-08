import React from "react";

function CourseTasks({ tasks }) {
    return (
        <div className="details-card">
            <div className="details-card-header">
                <h3>Tasks</h3>
            </div>

            <div className="details-list">
                {tasks.map((task) => (
                    <div key={task.id} className="details-list-item">
                        <div>
                            <h4>{task.title}</h4>
                            <p>Due: {task.dueDate}</p>
                        </div>
                        <span className={`status-badge ${task.status.toLowerCase().replace(" ", "-")}`}>
              {task.status}
            </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CourseTasks;
