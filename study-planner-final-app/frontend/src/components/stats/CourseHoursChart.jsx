import React from "react";

function CourseHoursChart({ data }) {
    const maxHours = Math.max(...data.map((item) => item.hours), 1);

    return (
        <div className="stats-widget-card">
            <div className="stats-widget-header">
                <h3>Hours by Course</h3>
            </div>

            <div className="horizontal-stats-list">
                {data.map((item) => (
                    <div key={item.id} className="horizontal-stats-item">
                        <div className="horizontal-stats-top">
                            <span>{item.course}</span>
                            <span>{item.hours}h</span>
                        </div>

                        <div className="horizontal-stats-track">
                            <div
                                className="horizontal-stats-fill"
                                style={{
                                    width: `${(item.hours / maxHours) * 100}%`,
                                    backgroundColor: item.color
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CourseHoursChart;