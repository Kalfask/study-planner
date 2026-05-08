import React from "react";
import { usePlanner } from "../../context/PlannerContext";
import WidgetCard from "./WidgetCard";

function QuickStartTimer() {
    const {
        todayFocus,
        remainingSeconds,
        isRunning,
        hasStarted,
        isFinished,
        timerMode,
        activeTask, // Παίρνουμε το ενεργό task από το context
        handleStartTimer,
        handlePauseTimer,
        handleResumeTimer,
        handleStopTimer
    } = usePlanner();

    const minutes = String(Math.floor(remainingSeconds / 60)).padStart(2, "0");
    const seconds = String(remainingSeconds % 60).padStart(2, "0");

    return (
        <WidgetCard title="Quick Start Timer" className="small-widget quick-timer-widget">
            <div className="quick-timer-content">
                <div className="quick-timer-time">
                    {minutes}:{seconds}
                </div>

                <div className="quick-timer-task">
                    <strong>
                        {timerMode === "break"
                            ? "☕ Break Time"
                            : (activeTask ? activeTask.title : "Focus Session")}
                    </strong>
                    <p>
                        {timerMode === "break"
                            ? "Relax and recharge!"
                            : (activeTask ? activeTask.course : "General")}
                    </p>
                </div>

                {!hasStarted && !isRunning && !isFinished && (
                    <button className="primary-btn" onClick={handleStartTimer}>
                        {timerMode === "break" ? "Start Break" : "Start Focus Session"}
                    </button>
                )}

                {hasStarted && isRunning && (
                    <div className="quick-timer-actions">
                        <button className="secondary-btn" onClick={handlePauseTimer}>
                            Pause
                        </button>
                        <button className="danger-btn" onClick={handleStopTimer}>
                            Stop
                        </button>
                    </div>
                )}

                {hasStarted && !isRunning && remainingSeconds > 0 && (
                    <div className="quick-timer-actions">
                        <button className="primary-btn" onClick={handleResumeTimer}>
                            Resume
                        </button>
                        <button className="danger-btn" onClick={handleStopTimer}>
                            Stop
                        </button>
                    </div>
                )}

                <p className="stat-subtext">
                    Today: {todayFocus.totalMinutes} min • {todayFocus.sessionsCompleted} sessions
                </p>
            </div>
        </WidgetCard>
    );
}

export default QuickStartTimer;