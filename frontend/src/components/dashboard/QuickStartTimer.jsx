import React from "react";
import WidgetCard from "./WidgetCard";

function QuickStartTimer() {
    return (
        <WidgetCard title="Quick Start Timer" className="small-widget">
            <button className="primary-btn">Start Focus Session</button>
            <p className="stat-subtext">Launch a 25-minute study session.</p>
        </WidgetCard>
    );
}

export default QuickStartTimer;