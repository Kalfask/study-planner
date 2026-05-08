import React from "react";

function TaskItem({ task, onDelete, onEdit }) { // Προσθέσαμε το onEdit εδώ
    return (
        <div className="task-item">
            <div className="task-item-left">
                <h3>{task.title}</h3>
                <p>
                    {task.course || "Unassigned"}
                    {task.dueDate ? ` • Due: ${task.dueDate}` : ""}
                    {task.estimatedTime ? ` • ${task.estimatedTime}` : ""}
                </p>
            </div>

            <div className="task-item-right">
                <span className={`priority-badge ${task.priority.toLowerCase()}`}>
                    {task.priority}
                </span>

                <span className={`status-badge ${task.status.toLowerCase().replace(" ", "-")}`}>
                    {task.status}
                </span>

                {/* ΠΡΟΣΘΗΚΗ: Κουμπί Edit */}
                <button
                    className="task-edit-btn"
                    onClick={onEdit}
                    type="button"
                    style={{ background: "transparent", border: "none", color: "#8b8994", cursor: "pointer", fontSize: "16px", marginRight: "8px" }}
                >
                    ✎
                </button>

                <button className="task-delete-btn" onClick={onDelete} type="button">
                    ×
                </button>
            </div>
        </div>
    );
}

export default TaskItem;