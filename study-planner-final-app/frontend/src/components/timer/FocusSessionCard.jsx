import React from "react";

function FocusSessionCard({ task, timerMode, activeTaskId, setActiveTaskId, pendingTasks }) {
    // Στυλ για το select (πιο μικρό μέγεθος και μαύρα γράμματα)
    const selectStyle = {
        background: "transparent",
        border: "none",
        color: "#000000", // Μαύρα γράμματα
        fontSize: "18px", // Πιο μικρό μέγεθος (ήταν 24px)
        fontWeight: "bold",
        fontFamily: "inherit",
        outline: "none",
        cursor: "pointer",
        width: "100%",
        padding: "0",
        margin: "10px 0", // Λίγο μικρότερο κενό
        appearance: "auto"
    };

    // Στυλ για τα στοιχεία της λίστας (ακόμα πιο μικρά)
    const optionStyle = {
        color: "#000000",
        fontSize: "15px" // Μικρότερο μέγεθος στη λίστα
    };

    return (
        <div className="timer-card">
            <div className="timer-card-header">
                <h3>{timerMode === "break" ? "Break Time" : "Current Focus"}</h3>
            </div>

            <div className="focus-session-content">
                <div className="focus-pill">
                    {timerMode === "break" ? "Relaxing" : "Active Task"}
                </div>

                {timerMode === "focus" ? (
                    <select
                        value={activeTaskId || ""}
                        onChange={(e) => setActiveTaskId(e.target.value ? Number(e.target.value) : null)}
                        style={selectStyle}
                        title="Click to select a task"
                    >
                        <option value="" style={optionStyle}>General Focus</option>
                        {pendingTasks && pendingTasks.map((taskItem) => (
                            <option key={taskItem.id} value={taskItem.id} style={optionStyle}>
                                {taskItem.title}
                            </option>
                        ))}
                    </select>
                ) : (
                    <h2 style={{ margin: "10px 0", fontSize: "18px", color: "#000000" }}>
                        {task?.title || "Relax"}
                    </h2>
                )}

                <p>{timerMode === "break" ? "Take a breather" : (task?.course || "No specific course")}</p>
            </div>
        </div>
    );
}

export default FocusSessionCard;