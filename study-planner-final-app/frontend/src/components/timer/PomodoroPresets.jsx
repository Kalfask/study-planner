import React from "react";

function PomodoroPresets({ presets, activeMinutes, onSelectPreset }) {
    return (
        <div className="timer-card">
            <div className="timer-card-header">
                <h3>Focus Presets</h3>
            </div>

            <div className="preset-grid">
                {presets.map((preset) => (
                    <button
                        key={preset.id}
                        className={`preset-btn ${
                            activeMinutes === preset.minutes ? "active" : ""
                        }`}
                        onClick={() => onSelectPreset(preset.minutes)}
                    >
                        <strong>{preset.label}</strong>
                        <span>{preset.minutes} min</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default PomodoroPresets;