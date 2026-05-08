import React from "react";

function CourseOverview({ course }) {
    return (
        <div className="details-card">
            <div className="details-card-header">
                <h3>Overview</h3>
            </div>

            <p className="details-description">{course.description}</p>

            <div className="overview-stats">
                <div className="overview-stat">
                    <span>Tasks</span>
                    <strong>{course.tasksCount}</strong>
                </div>
                <div className="overview-stat">
                    <span>Progress</span>
                    <strong>{course.progress}%</strong>
                </div>
                <div className="overview-stat">
                    <span>Deadline</span>
                    <strong>{course.nextDeadline}</strong>
                </div>
            </div>

            <div className="course-progress-row">
                <span>Course Progress</span>
                <span>{course.progress}%</span>
            </div>

            <div className="course-progress-bar">
                <div
                    className="course-progress-fill"
                    style={{
                        width: `${course.progress}%`,
                        backgroundColor: course.color
                    }}
                />
            </div>
        </div>
    );
}

export default CourseOverview;
