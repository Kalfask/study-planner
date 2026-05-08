import React from "react";
import SessionCard from "./SessionCard";

function DayColumn({ day, date, sessions, courseColors, onAddSession, onDeleteSession }) {
    const dateLabel = date
        ? date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
        : null;

    return (
        <div className="day-column">
            <div className="day-column-header">
                <div className="day-column-title">
                    <h3>{day}</h3>
                    {dateLabel && <span className="day-column-date">{dateLabel}</span>}
                </div>
                <button className="mini-add-btn" onClick={() => onAddSession(day)}>
                    +
                </button>
            </div>

            <div className="day-column-body">
                {sessions.length === 0 ? (
                    <div className="empty-day-state">
                        <p>No sessions yet</p>
                    </div>
                ) : (
                    sessions.map((session) => (
                        <SessionCard
                            key={session.id}
                            session={session}
                            color={session.color || courseColors[session.course] || "#7c3aed"}
                            onDelete={() => onDeleteSession(session.id)}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default DayColumn;