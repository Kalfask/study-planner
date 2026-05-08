import React from "react";

const DISPLAY_START_HOUR = 8;
const POSITION_START_HOUR = 7; // κράτα το offset που σου έφτιαξε την κατακόρυφη ευθυγράμμιση
const END_HOUR = 22;
const ROW_HEIGHT = 72;

const timeSlots = Array.from(
    { length: END_HOUR - DISPLAY_START_HOUR },
    (_, index) => `${String(DISPLAY_START_HOUR + index).padStart(2, "0")}:00`
);

function timeToMinutes(time) {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
}

function buildDayLayout(sessions) {
    const sorted = [...sessions]
        .map((session) => ({
            ...session,
            startMin: timeToMinutes(session.startTime),
            endMin: timeToMinutes(session.endTime)
        }))
        .sort((a, b) => a.startMin - b.startMin || a.endMin - b.endMin);

    if (sorted.length === 0) return [];

    const groups = [];
    let currentGroup = [];
    let currentGroupEnd = -1;

    for (const session of sorted) {
        if (currentGroup.length === 0) {
            currentGroup = [session];
            currentGroupEnd = session.endMin;
            continue;
        }

        // overlap ή chain-overlap group
        if (session.startMin < currentGroupEnd) {
            currentGroup.push(session);
            currentGroupEnd = Math.max(currentGroupEnd, session.endMin);
        } else {
            groups.push(currentGroup);
            currentGroup = [session];
            currentGroupEnd = session.endMin;
        }
    }

    if (currentGroup.length > 0) {
        groups.push(currentGroup);
    }

    const laidOut = [];

    for (const group of groups) {
        const columnEnds = [];
        const placed = [];

        for (const session of group) {
            let column = -1;

            for (let i = 0; i < columnEnds.length; i++) {
                // αν τελειώνει ακριβώς όταν αρχίζει το επόμενο, δεν θεωρείται overlap
                if (session.startMin >= columnEnds[i]) {
                    column = i;
                    break;
                }
            }

            if (column === -1) {
                column = columnEnds.length;
                columnEnds.push(session.endMin);
            } else {
                columnEnds[column] = session.endMin;
            }

            placed.push({
                ...session,
                column
            });
        }

        const totalColumns = columnEnds.length;

        for (const session of placed) {
            laidOut.push({
                ...session,
                totalColumns
            });
        }
    }

    return laidOut;
}

function getEventStyle(startMin, endMin, column, totalColumns) {
    const topPx = ((startMin - POSITION_START_HOUR * 60) / 60) * ROW_HEIGHT;
    const heightPx = Math.max(((endMin - startMin) / 60) * ROW_HEIGHT, 42);

    const gap = 6;
    const widthPercent = 100 / totalColumns;
    const leftPercent = column * widthPercent;

    return {
        top: `${topPx}px`,
        height: `${heightPx}px`,
        left: `calc(${leftPercent}% + ${gap}px)`,
        width: `calc(${widthPercent}% - ${gap * 2}px)`
    };
}

function ScheduleCalendarView({ weekDays, weekDates, groupedSessions, courseColors, onDeleteSession }) {
    return (
        <div className="calendar-view-wrapper">
            <div className="calendar-shell">
                <div className="calendar-header-row">
                    <div className="calendar-corner-cell" />
                    {weekDays.map((day, idx) => {
                        const date = weekDates?.[idx];
                        const dateLabel = date
                            ? date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
                            : null;

                        return (
                            <div key={day} className="calendar-day-header">
                                <strong>{day}</strong>
                                {dateLabel && <small>{dateLabel}</small>}
                            </div>
                        );
                    })}
                </div>

                <div className="calendar-body-row">
                    <div className="calendar-time-column">
                        {timeSlots.map((time) => (
                            <div key={time} className="calendar-time-cell">
                                {time}
                            </div>
                        ))}
                    </div>

                    {weekDays.map((day) => {
                        const laidOutSessions = buildDayLayout(groupedSessions[day] || []);

                        return (
                            <div key={day} className="calendar-day-column">
                                <div className="calendar-day-body">
                                    <div className="calendar-grid-lines">
                                        {timeSlots.map((time) => (
                                            <div key={time} className="calendar-hour-line" />
                                        ))}
                                    </div>

                                    {laidOutSessions.map((session) => {
                                        const style = getEventStyle(
                                            session.startMin,
                                            session.endMin,
                                            session.column,
                                            session.totalColumns
                                        );

                                        const color = session.color || courseColors?.[session.course] || "#7c3aed";

                                        return (
                                            <div
                                                key={session.id}
                                                className="calendar-event-block"
                                                style={{
                                                    ...style,
                                                    backgroundColor: `${color}18`,
                                                    borderLeft: `4px solid ${color}`
                                                }}
                                            >
                                                <button className="calendar-event-delete-btn" onClick={()=>onDeleteSession(session.id)} type="button">
                                                    ×
                                                </button>
                                                <strong>{session.title}</strong>
                                                <span>{session.course}</span>
                                                <small>
                                                    {session.startTime} - {session.endTime}
                                                </small>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default ScheduleCalendarView;