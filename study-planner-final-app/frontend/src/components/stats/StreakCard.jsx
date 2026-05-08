import React from "react";

function StreakCard({ streak }) {
    const progress = Math.min((streak.current / streak.target) * 100, 100);

    return (
        <div className="stats-widget-card">
            <div className="stats-widget-header">
                <h3>Study Streak</h3>
            </div>

            <div className="streak-stats-row">
                <div className="mini-stat-box">
                    <span>Current</span>
                    <strong>{streak.current} days</strong>
                </div>

                <div className="mini-stat-box">
                    <span>Best</span>
                    <strong>{streak.best} days</strong>
                </div>

                <div className="mini-stat-box">
                    <span>Target</span>
                    <strong>{streak.target} days</strong>
                </div>
            </div>

            <div className="goal-progress-row">
                <span>Target Progress</span>
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

export default StreakCard;