import React from "react";
import TaskItem from "./TaskItem";

function TaskList({ tasks, onDeleteTask, onEditTask }) {
    if (tasks.length === 0) {
        return (
            <div className="tasks-empty-state">
                <h3>No tasks found</h3>
                <p>Try changing the filter or add a new task.</p>
            </div>
        );
    }

    return (
        <div className="tasks-list">
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onDelete={() => onDeleteTask(task.id)}
                    onEdit={() => onEditTask(task)}
                />
            ))}
        </div>
    );
}

export default TaskList;