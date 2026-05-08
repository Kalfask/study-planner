import React from "react";

function TaskCompletionCard({ completion }) {
    const total =
        completion.completed + completion.pending + completion.overdue || 1;

    const completedWidth = (completion.completed / total) * 100;
    const pendingWidth = (completion.pending / total) * 100;
    const overdueWidth = (completion.overdue / total) * 100;

    return (
        <div className="stats-widget-card">
            <div className="stats-widget-header">
                <h3>Task Completion Overview</h3>
            </div>

            <div className="segmented-progress">
                <div
                    className="segment completed"
                    style={{ width: `${completedWidth}%` }}
                />
                <div
                    className="segment pending"
                    style={{ width: `${pendingWidth}%` }}
                />
                <div
                    className="segment overdue"
                    style={{ width: `${overdueWidth}%` }}
                />
            </div>

            <div className="completion-legend">
                <div className="legend-item">
                    <span className="legend-dot completed" />
                    <span>Completed: {completion.completed}</span>
                </div>

                <div className="legend-item">
                    <span className="legend-dot pending" />
                    <span>Pending: {completion.pending}</span>
                </div>

                <div className="legend-item">
                    <span className="legend-dot overdue" />
                    <span>Overdue: {completion.overdue}</span>
                </div>
            </div>
        </div>
    );
}

export default TaskCompletionCard;