import React, { useState, useEffect } from "react";

function AddCourseModal({ isOpen, onClose, onSave, initialData }) {
    const [formData, setFormData] = useState({
        title: "",
        color: "#7c3aed"
    });

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setFormData({
                    title: initialData.title || "",
                    color: initialData.color || "#7c3aed"
                });
            } else {
                setFormData({
                    title: "",
                    color: "#7c3aed"
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

        await onSave(formData);
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-card">
                <div className="modal-header">
                    <h2>{initialData ? "Edit Course" : "Add Course"}</h2>
                    <button className="modal-close-btn" onClick={onClose} type="button">
                        ×
                    </button>
                </div>

                <form className="task-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Course Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g. Machine Learning"
                        />
                    </div>

                    <div className="form-group">
                        <label>Color</label>
                        <input
                            type="color"
                            name="color"
                            value={formData.color}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="secondary-btn" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="primary-btn">
                            {initialData ? "Update Course" : "Save Course"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddCourseModal;