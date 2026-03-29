import React from "react";
import WidgetCard from "./WidgetCard";

function WeeklyStudyHours({hours}){
    return(
        <WidgetCard title={"Weekly Study Hours"} className="small-widget">
            <div className="start-number">{hours}h</div>
            <p className="start-subtext">Great progress this week.</p>
        </WidgetCard>
    );
}

export default WeeklyStudyHours;