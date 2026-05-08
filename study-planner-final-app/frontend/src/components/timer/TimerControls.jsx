import React from "react";

function TimerControls({
                           isRunning,
                           hasStarted,
                           onStart,
                           onPause,
                           onResume,
                           onStop
                       }) {
    return (
        <div className="timer-controls">
            {!hasStarted && (
                <button className="primary-btn" onClick={onStart}>
                    Start
                </button>
            )}

            {hasStarted && isRunning && (
                <button className="secondary-btn" onClick={onPause}>
                    Pause
                </button>
            )}

            {hasStarted && !isRunning && (
                <button className="primary-btn" onClick={onResume}>
                    Resume
                </button>
            )}

            <button className="danger-btn" onClick={onStop}>
                Stop
            </button>
        </div>
    );
}

export default TimerControls;