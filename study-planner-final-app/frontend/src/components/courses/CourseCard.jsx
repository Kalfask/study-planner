import React from "react";
import { Link } from "react-router-dom";

function CourseCard({ course, onDelete, onEdit, disableDelete = false }) {
    const handleDeleteClick = (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (disableDelete) return;
        onDelete(course.id);
    };

    const handleEditClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        onEdit();
    };

    return (
        <Link to={`/courses/${course.id}`} className="course-card-link">
            <div className="course-card">
                <div className="course-card-top">
                    <div className="course-card-top-left">
                        <div
                            className="course-color-dot"
                            style={{ backgroundColor: course.color }}
                        />
                        <span className="course-tasks-count">{course.tasksCount} tasks</span>
                    </div>

                    <div className="course-delete-wrapper" style={{ display: "flex", gap: "8px" }}>
                        <button
                            className="course-edit-btn"
                            onClick={handleEditClick}
                            type="button"
                            style={{ background: "transparent", border: "none", color: "#8b8994", cursor: "pointer", fontSize: "16px" }}
                        >
                            ✎
                        </button>

                        <button
                            className="course-delete-btn"
                            onClick={handleDeleteClick}
                            type="button"
                            disabled={disableDelete}
                        >
                            ×
                        </button>

                        {disableDelete && (
                            <div className="course-delete-tooltip">
                                Delete all tasks and study sessions linked to this course first.
                            </div>
                        )}
                    </div>
                </div>

                <h3>{course.title}</h3>
                <p className="course-deadline">Next deadline: {course.nextDeadline}</p>

                <div className="course-progress-row">
                    <span>Progress</span>
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
        </Link>
    );
}

export default CourseCard;
