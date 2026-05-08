import React from "react";
import WidgetCard from "./WidgetCard";

function TodayTasks({ tasks }) {
    return (
        <WidgetCard title="Today’s Tasks" className="large-widget">
            <div className="list">
                {tasks.map((task) => (
                    <div key={task.id} className="list-item">
                        <div>
                            <h4>{task.title}</h4>
                            <p>{task.course} • {task.dueDate}</p>
                        </div>
                        <span className={`badge ${task.priority.toLowerCase()}`}>
              {task.priority}
            </span>
                    </div>
                ))}
            </div>
        </WidgetCard>
    );
}

export default TodayTasks;