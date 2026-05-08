import React from "react";
import WidgetCard from "./WidgetCard";

function CourseProgress({ courses }) {
    return (
        <WidgetCard title="Course Progress" className="medium-widget">
            <div className="progress-list">
                {courses.map((item) => (
                    <div key={item.id} className="progress-item">
                        <div className="progress-top">
                            <span>{item.course}</span>
                            <span>{item.progress}%</span>
                        </div>
                        <div className="progress-bar">
                            <div
                                className="progress-fill"
                                style={{ width: `${item.progress}%`, backgroundColor: item.color }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </WidgetCard>
    );
}

export default CourseProgress;