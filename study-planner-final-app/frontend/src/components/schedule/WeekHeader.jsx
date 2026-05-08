import React from "react";

function formatRange(weekStart) {
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);

    const fmt = { month: "short", day: "numeric" };
    const startStr = weekStart.toLocaleDateString("en-US", fmt);
    const endStr = weekEnd.toLocaleDateString("en-US", fmt);

    return `${startStr} – ${endStr}`;
}

function getLabel(weekOffset) {
    if (weekOffset === 0) return "This Week";
    if (weekOffset === -1) return "Last Week";
    if (weekOffset === 1) return "Next Week";
    if (weekOffset < 0) return `${-weekOffset} weeks ago`;
    return `${weekOffset} weeks ahead`;
}

function WeekHeader({ weekOffset, weekStart, onPrevWeek, onNextWeek, onThisWeek }) {
    const label = getLabel(weekOffset);
    const range = weekStart ? formatRange(weekStart) : "";

    return (
        <div className="schedule-week-header">
            <div>
                <h1>Schedule</h1>
                <p>Plan your study sessions across the week with a clean calendar view.</p>
            </div>

            <div className="week-nav-pill">
                <button
                    className="week-nav-arrow"
                    onClick={onPrevWeek}
                    type="button"
                    aria-label="Previous week"
                >
                    ‹
                </button>
                <button
                    className={`week-nav-current ${weekOffset === 0 ? "is-current" : ""}`}
                    onClick={onThisWeek}
                    type="button"
                    title={weekOffset === 0 ? "Current week" : "Jump to this week"}
                >
                    <strong>{label}</strong>
                    <span>{range}</span>
                </button>
                <button
                    className="week-nav-arrow"
                    onClick={onNextWeek}
                    type="button"
                    aria-label="Next week"
                >
                    ›
                </button>
            </div>
        </div>
    );
}

export default WeekHeader;
