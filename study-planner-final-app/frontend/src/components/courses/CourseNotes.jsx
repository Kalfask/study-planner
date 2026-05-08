import React from "react";

function CourseNotes({ notes, targets }) {
    return (
        <div className="details-card">
            <div className="details-card-header">
                <h3>Notes & Targets</h3>
            </div>

            <p className="details-description">{notes}</p>

            <div className="targets-list">
                {targets.map((target, index) => (
                    <div key={index} className="target-item">
                        {target}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CourseNotes;
