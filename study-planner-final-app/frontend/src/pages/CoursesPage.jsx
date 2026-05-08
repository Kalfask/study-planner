import React, { useState } from "react";
import { usePlanner } from "../context/PlannerContext";
import CourseCard from "../components/courses/CourseCard";
import AddCourseModal from "../components/courses/AddCourseModal";
import ConfirmModal from "../components/ui/ConfirmModal";
import "../styles/courses.css";
import "../styles/confirmModal.css";

function CoursesPage() {
    // Φέραμε και το updateCourse από το Context
    const { courses, tasks, scheduleSlots, addCourse, updateCourse, deleteCourse, loading, error } = usePlanner();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Νέο state για το Edit
    const [editingCourse, setEditingCourse] = useState(null);
    const [courseToDelete, setCourseToDelete] = useState(null);
    const [deleteError, setDeleteError] = useState("");

    const enrichedCourses = courses.map((course) => {
        const courseTasks = tasks.filter(
            (task) => task.courseId === course.id || task.course === course.title
        );

        const courseSessions = scheduleSlots.filter(
            (session) => session.courseId === course.id || session.course === course.title
        );

        const nextDeadline =
            courseTasks
                .filter((task) => task.dueDate)
                .sort((a, b) => a.dueDate.localeCompare(b.dueDate))[0]?.dueDate || "—";

        const completed = courseTasks.filter(
            (task) => task.status === "Completed"
        ).length;

        const progress =
            courseTasks.length > 0
                ? Math.round((completed / courseTasks.length) * 100)
                : 0;

        return {
            ...course,
            tasksCount: courseTasks.length,
            sessionsCount: courseSessions.length,
            nextDeadline,
            progress,
            hasLinkedData: courseTasks.length > 0 || courseSessions.length > 0
        };
    });

    // Συνάρτηση για άνοιγμα σαν Add (κενό Modal)
    const handleOpenAddModal = () => {
        setEditingCourse(null);
        setIsModalOpen(true);
    };

    // Συνάρτηση για άνοιγμα σαν Edit (γεμάτο Modal)
    const handleOpenEditModal = (course) => {
        setEditingCourse(course);
        setIsModalOpen(true);
    };

    // Διαχωρισμός Save σε Add ή Update
    const handleSaveCourse = async (data) => {
        if (editingCourse) {
            await updateCourse(editingCourse.id, data);
        } else {
            await addCourse(data);
        }
        setIsModalOpen(false);
    };

    const handleAskDeleteCourse = (courseId) => {
        setDeleteError("");
        setCourseToDelete(courseId);
    };

    const handleConfirmDeleteCourse = async () => {
        if (!courseToDelete) return;

        const selectedCourse = enrichedCourses.find(
            (course) => course.id === courseToDelete
        );

        if (!selectedCourse) {
            setCourseToDelete(null);
            return;
        }

        if (selectedCourse.hasLinkedData) {
            setDeleteError(
                "You cannot delete a course that still has tasks or study sessions. Delete them first."
            );
            setCourseToDelete(null);
            return;
        }

        try {
            setDeleteError("");
            await deleteCourse(courseToDelete);
            setCourseToDelete(null);
        } catch (err) {
            setDeleteError(
                err?.response?.data?.message ||
                err?.response?.data?.error ||
                "This course could not be deleted."
            );
            setCourseToDelete(null);
        }
    };

    const handleCloseDeleteModal = () => {
        setCourseToDelete(null);
    };

    if (loading) {
        return (
            <div className="courses-page">
                <h2>Loading courses...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="courses-page">
                <h2>{error}</h2>
            </div>
        );
    }

    return (
        <div className="courses-page">
            <div className="courses-header">
                <div>
                    <h1>Courses</h1>
                    <p>Track your subjects, tasks and overall study progress.</p>
                </div>

                <button className="primary-btn" onClick={handleOpenAddModal}>
                    + Add Course
                </button>
            </div>

            {deleteError && <p className="form-error-text">{deleteError}</p>}

            <div className="courses-grid">
                {enrichedCourses.map((course) => (
                    <CourseCard
                        key={course.id}
                        course={course}
                        onDelete={handleAskDeleteCourse}
                        onEdit={() => handleOpenEditModal(course)} // Προστέθηκε το prop onEdit
                        disableDelete={course.hasLinkedData}
                    />
                ))}
            </div>

            <AddCourseModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveCourse}
                initialData={editingCourse} // Περνάμε το course που κάνουμε edit
            />

            <ConfirmModal
                isOpen={!!courseToDelete}
                title="Delete course"
                message="Are you sure you want to delete this course?"
                confirmText="Delete Course"
                cancelText="Cancel"
                onConfirm={handleConfirmDeleteCourse}
                onClose={handleCloseDeleteModal}
            />
        </div>
    );
}

export default CoursesPage;