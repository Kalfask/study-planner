import React from "react";
import WidgetCard from "./WidgetCard";

function UpcomingSessions({ sessions }) {
    return (
        <WidgetCard title="Upcoming Sessions" className="medium-widget">
            <div className="list">
                {sessions.map((session) => (
                    <div key={session.id} className="list-item">
                        <div>
                            <h4>{session.title}</h4>
                            <p>{session.course}</p>
                        </div>
                        <span className="session-time">{session.time}</span>
                    </div>
                ))}
            </div>
        </WidgetCard>
    );
}

export default UpcomingSessions;