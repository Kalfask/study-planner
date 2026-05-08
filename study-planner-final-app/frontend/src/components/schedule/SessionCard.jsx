import React from "react";

function SessionCard({ session, color, onDelete }) {
    return (
        <div className="session-card" style={{ borderLeft: `5px solid ${color}` }}>
            <div className="session-card-top">
                <span
                    className="session-course-tag"
                    style={{ backgroundColor: `${color}15`, color }}
                >
                    {session.course}
                </span>

                <button className="session-delete-btn" onClick={onDelete} type= "button">
                    ×
                </button>
            </div>

            <h4>{session.title}</h4>
            <p>
                {session.startTime} - {session.endTime}
            </p>
        </div>
    );
}

export default SessionCard;