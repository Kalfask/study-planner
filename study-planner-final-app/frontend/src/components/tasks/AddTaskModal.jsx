import React, { useState, useEffect } from "react";
import { usePlanner } from "../../context/PlannerContext";

function AddTaskModal({ isOpen, onClose, onSave, initialData }) {
    const { courses } = usePlanner();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        courseId: "",
        priority: "Medium",
        status: "Pending",
        dueDate: ""
    });

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setFormData({
                    title: initialData.title || "",
                    description: initialData.description || "",
                    courseId: initialData.courseId || "",
                    priority: initialData.priority || "Medium",
                    status: initialData.status || "Pending",
                    dueDate: initialData.dueDate || ""
                });
            } else {
                setFormData({
                    title: "",
                    description: "",
                    courseId: "",
                    priority: "Medium",
                    status: "Pending",
                    dueDate: ""
                });
            }
        }
    }, [isOpen, initialData]);

    if (!isOpen) return null;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formData.title.trim()) return;
        if (!formData.courseId) return;

        const payload = {
            title: formData.title,
            description: formData.description,
            dueDate: formData.dueDate || null,
            priority: formData.priority,
            status: formData.status,
            courseId: Number(formData.courseId)
        };

        await onSave(payload);
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-card">
                <div className="modal-header">
                    <h2>{initialData ? "Edit Task" : "Add Task"}</h2>
                    <button
                        className="modal-close-btn"
                        onClick={onClose}
                        type="button"
                    >
                        ×
                    </button>
                </div>

                <form className="task-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Task Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g. Finish Physics assignment"
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Short task description"
                        />
                    </div>

                    <div className="form-group">
                        <label>Course</label>
                        <select
                            name="courseId"
                            value={formData.courseId}
                            onChange={handleChange}
                        >
                            <option value="">Select course</option>
                            {courses.map((course) => (
                                <option key={course.id} value={course.id}>
                                    {course.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Priority</label>
                            <select
                                name="priority"
                                value={formData.priority}
                                onChange={handleChange}
                            >
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                            >
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Due Date</label>
                            <input
                                type="date"
                                name="dueDate"
                                value={formData.dueDate}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="modal-actions">
                        <button
                            type="button"
                            className="secondary-btn"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button type="submit" className="primary-btn">
                            {initialData ? "Update Task" : "Save Task"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddTaskModal;