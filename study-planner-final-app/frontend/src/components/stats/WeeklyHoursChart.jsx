import React from "react";

function WeeklyHoursChart({ data }) {
    const maxHours = Math.max(...data.map((item) => item.hours), 1);

    return (
        <div className="stats-widget-card">
            <div className="stats-widget-header">
                <h3>Weekly Study Hours</h3>
            </div>

            <div className="vertical-chart">
                {data.map((item) => {
                    const heightPercent = Math.max((item.hours / maxHours) * 100, 8);

                    return (
                        <div key={item.label} className="vertical-chart-item">
                            <div className="vertical-chart-bar-wrap">
                                <div
                                    className="vertical-chart-bar"
                                    style={{ height: `${heightPercent}%` }}
                                />
                            </div>
                            <strong>{item.hours}h</strong>
                            <span>{item.label}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default WeeklyHoursChart;