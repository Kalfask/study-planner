import React, { useState, useEffect } from "react";
import { usePlanner } from "../../context/PlannerContext";

function AddSessionModal({ isOpen, onClose, onSave, defaultDate }) {
    const { courses } = usePlanner();
    const today = new Date().toISOString().split("T")[0];

    const [formData, setFormData] = useState({
        title: "",
        courseId: "",
        date: defaultDate || today,
        startTime: "18:00",
        endTime: "19:00",
        location: "",
        isRecurring: false // Η ΝΕΑ ΕΠΙΛΟΓΗ
    });

    useEffect(() => {
        if (isOpen) {
            setFormData(prev => ({ ...prev, date: defaultDate || today, isRecurring: false }));
        }
    }, [isOpen, defaultDate, today]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const d = new Date(formData.date);
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const dayName = days[d.getDay()];

        // Υπολογισμός weekStart (Δευτέρα)
        const dayIndex = (d.getDay() + 6) % 7;
        const weekStartObj = new Date(d);
        weekStartObj.setDate(weekStartObj.getDate() - dayIndex);
        const weekStartIso = weekStartObj.toISOString().split("T")[0];

        await onSave({
            title: formData.title,
            courseId: Number(formData.courseId),
            day: dayName,
            startTime: formData.startTime,
            endTime: formData.endTime,
            location: formData.location || "",
            date: formData.isRecurring ? null : formData.date,
            weekStart: weekStartIso, // Η εβδομάδα που το έφτιαξες
            isRecurring: formData.isRecurring // True αν πάτησες το checkbox
        });
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-card">
                <div className="modal-header">
                    <h2>Add Study Session</h2>
                    <button className="modal-close-btn" onClick={onClose}>×</button>
                </div>
                <form className="session-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Title</label>
                        <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="e.g. Exam Prep" required />
                    </div>

                    <div className="form-group" style={{ flexDirection: 'row', gap: '10px', alignItems: 'center', marginBottom: '15px' }}>
                        <input
                            type="checkbox"
                            id="recurring"
                            checked={formData.isRecurring}
                            onChange={e => setFormData({...formData, isRecurring: e.target.checked})}
                            style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                        />
                        <label htmlFor="recurring" style={{ cursor: 'pointer', marginBottom: 0 }}>Recurring (Every Week)</label>
                    </div>

                    {!formData.isRecurring && (
                        <div className="form-group">
                            <label>Date</label>
                            <input type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} required />
                        </div>
                    )}

                    {formData.isRecurring && (
                        <div className="form-group">
                            <label>Day of Week</label>
                            <select value={new Date(formData.date).getDay()} onChange={e => {
                                // Απλά αλλάζουμε την ημερομηνία για να αντιστοιχεί στη μέρα
                                const newDate = new Date();
                                const currentDay = newDate.getDay();
                                const diff = e.target.value - currentDay;
                                newDate.setDate(newDate.getDate() + diff);
                                setFormData({...formData, date: newDate.toISOString().split("T")[0]});
                            }}>
                                <option value="1">Monday</option>
                                <option value="2">Tuesday</option>
                                <option value="3">Wednesday</option>
                                <option value="4">Thursday</option>
                                <option value="5">Friday</option>
                                <option value="6">Saturday</option>
                                <option value="0">Sunday</option>
                            </select>
                        </div>
                    )}

                    <div className="form-row">
                        <div className="form-group">
                            <label>Start</label>
                            <input type="time" value={formData.startTime} onChange={e => setFormData({...formData, startTime: e.target.value})} required />
                        </div>
                        <div className="form-group">
                            <label>End</label>
                            <input type="time" value={formData.endTime} onChange={e => setFormData({...formData, endTime: e.target.value})} required />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Course</label>
                        <select value={formData.courseId} onChange={e => setFormData({...formData, courseId: e.target.value})} required>
                            <option value="">Select Course</option>
                            {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                        </select>
                    </div>

                    <div className="modal-actions">
                        <button type="button" onClick={onClose} className="secondary-btn">Cancel</button>
                        <button type="submit" className="primary-btn">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddSessionModal;