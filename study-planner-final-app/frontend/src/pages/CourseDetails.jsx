
import React from "react";
import { Link, useParams } from "react-router-dom";
import { usePlanner } from "../context/PlannerContext";
import CourseOverview from "../components/courses/CourseOverview";
import CourseTasks from "../components/courses/CourseTasks";
import CourseSessions from "../components/courses/CourseSessions";
import CourseNotes from "../components/courses/CourseNotes";
import "../styles/courses.css";

function CourseDetails() {
    const { id } = useParams();
    const { getCourseById, getTasksForCourse, scheduleSlots } = usePlanner();

    const course = getCourseById(id);

    if (!course) {
        return (
            <div className="courses-page">
                <h2>Course not found</h2>
                <Link to="/courses" className="back-link">
                    Back to Courses
                </Link>
            </div>
        );
    }

    const courseSessions = scheduleSlots
        .filter((session) => session.courseId === course.id || session.course === course.title)
        .map((session) => ({
            id: session.id,
            title: session.title,
            date: session.day,
            time: `${session.startTime} - ${session.endTime}`
        }));

    const courseTasks = getTasksForCourse(Number(id));

    const completed = courseTasks.filter(
        (task) => task.status === "Completed"
    ).length;

    const progress =
        courseTasks.length > 0
            ? Math.round((completed / courseTasks.length) * 100)
            : 0;

    const nextDeadline =
        courseTasks
            .filter((task) => task.dueDate)
            .sort((a, b) => a.dueDate.localeCompare(b.dueDate))[0]?.dueDate || "—";

    const enrichedCourse = {
        ...course,
        tasksCount: courseTasks.length,
        progress,
        nextDeadline
    };

    return (
        <div className="courses-page">
            <div className="course-details-header">
                <div>
                    <Link to="/courses" className="back-link">
                        ← Back to Courses
                    </Link>

                    <div className="course-title-row">
                        <div
                            className="course-color-dot large"
                            style={{ backgroundColor: enrichedCourse.color }}
                        />
                        <h1>{enrichedCourse.title}</h1>
                    </div>

                    <p>{enrichedCourse.description || ""}</p>
                </div>
            </div>

            <div className="course-details-grid">
                <CourseOverview course={enrichedCourse} />

                {(enrichedCourse.notes || (enrichedCourse.targets || []).length > 0) && (
                    <CourseNotes
                        notes={enrichedCourse.notes || ""}
                        targets={enrichedCourse.targets || []}
                    />
                )}

                <CourseTasks tasks={courseTasks} />
                <CourseSessions sessions={courseSessions} />
            </div>
        </div>
    );
}

export default CourseDetails;