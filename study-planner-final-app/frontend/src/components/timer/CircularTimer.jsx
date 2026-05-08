import React from "react";

function CircularTimer({ totalSeconds, remainingSeconds, isRunning }) {
    const radius = 110;
    const stroke = 12;
    const normalizedRadius = radius - stroke / 2;
    const circumference = normalizedRadius * 2 * Math.PI;

    const progress =
        totalSeconds > 0 ? (totalSeconds - remainingSeconds) / totalSeconds : 0;

    const strokeDashoffset = circumference - progress * circumference;

    const minutes = String(Math.floor(remainingSeconds / 60)).padStart(2, "0");
    const seconds = String(remainingSeconds % 60).padStart(2, "0");

    return (
        <div className="circular-timer">
            <svg height={radius * 2} width={radius * 2} className="timer-svg">
                <circle
                    stroke="#e5e7eb"
                    fill="transparent"
                    strokeWidth={stroke}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
                <circle
                    stroke="#7c3aed"
                    fill="transparent"
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    strokeDasharray={`${circumference} ${circumference}`}
                    style={{ strokeDashoffset }}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                    className="timer-progress-circle"
                />
            </svg>

            <div className="timer-center">
                <div className="timer-time">
                    {minutes}:{seconds}
                </div>
                <p className="timer-status">
                    {isRunning ? "Focus session in progress" : "Ready to start"}
                </p>
            </div>
        </div>
    );
}

export default CircularTimer;