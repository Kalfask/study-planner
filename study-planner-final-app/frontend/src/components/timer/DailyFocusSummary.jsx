import React from "react";

function DailyFocusSummary({ totalMinutes, sessionsCompleted, dailyGoalMinutes }) {
    const progress = Math.min((totalMinutes / dailyGoalMinutes) * 100, 100);

    return (
        <div className="timer-card">
            <div className="timer-card-header">
                <h3>Today’s Focus Summary</h3>
            </div>

            <div className="summary-stats">
                <div className="summary-stat">
                    <span>Total Focus</span>
                    <strong>{totalMinutes} min</strong>
                </div>

                <div className="summary-stat">
                    <span>Sessions</span>
                    <strong>{sessionsCompleted}</strong>
                </div>

                <div className="summary-stat">
                    <span>Goal</span>
                    <strong>{dailyGoalMinutes} min</strong>
                </div>
            </div>

            <div className="goal-progress-row">
                <span>Daily Goal Progress</span>
                <span>{Math.round(progress)}%</span>
            </div>

            <div className="goal-progress-bar">
                <div
                    className="goal-progress-fill"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
}

export default DailyFocusSummary;