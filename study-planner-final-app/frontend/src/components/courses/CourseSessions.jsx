import React from "react";

function CourseSessions({ sessions }) {
    return (
        <div className="details-card">
            <div className="details-card-header">
                <h3>Study Sessions</h3>
            </div>

            <div className="details-list">
                {sessions.map((session) => (
                    <div key={session.id} className="details-list-item">
                        <div>
                            <h4>{session.title}</h4>
                            <p>{session.date}</p>
                        </div>
                        <span className="session-time">{session.time}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CourseSessions;
