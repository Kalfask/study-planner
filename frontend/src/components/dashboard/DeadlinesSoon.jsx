import React from "react";
import WidgetCard from "./WidgetCard";

function DeadlinesSoon({count}){
    return(
        <WidgetCard title="Deadlines Soon" className="small-widget">
            <div className="stat-number">{count}</div>
            <p className="stat-subtext">Tasks due in the next few days.</p>
        </WidgetCard>
    );
}

export default DeadlinesSoon;