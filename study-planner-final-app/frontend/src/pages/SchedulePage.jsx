import React, { useMemo, useState } from "react";
import { usePlanner } from "../context/PlannerContext";
import { weekDays } from "../data/mockSchedule";
import WeekHeader from "../components/schedule/WeekHeader";
import DayColumn from "../components/schedule/DayColumn";
import AddSessionModal from "../components/schedule/AddSessionModal";
import ScheduleCalendarView from "../components/schedule/ScheduleCalendarView";
import ConfirmModal from "../components/ui/ConfirmModal";
import "../styles/schedule.css";

/**
 * Βοηθητικές συναρτήσεις για διαχείριση ημερομηνιών
 */
function getMondayOfWeek(weekOffset) {
    const date = new Date();
    const day = (date.getDay() + 6) % 7; // Monday = 0
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - day + weekOffset * 7);
    return date;
}

function toIsoDate(date) {
    if (!date) return "";
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
}

function SchedulePage() {
    const {
        courses,
        scheduleSlots,
        addSessionSlot,
        removeSessionSlot,
        loading,
        error
    } = usePlanner();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDay, setSelectedDay] = useState("Monday");
    const [viewMode, setViewMode] = useState("list");
    const [sessionToDeleteId, setSessionToDeleteId] = useState(null);
    const [weekOffset, setWeekOffset] = useState(0);

    // Υπολογισμός ημερομηνιών τρέχουσας εβδομάδας προβολής
    const weekStart = useMemo(() => getMondayOfWeek(weekOffset), [weekOffset]);
    const weekStartIso = useMemo(() => toIsoDate(weekStart), [weekStart]);

    const weekDates = useMemo(() => {
        return weekDays.map((_, idx) => {
            const d = new Date(weekStart);
            d.setDate(d.getDate() + idx);
            return d;
        });
    }, [weekStart]);

    const courseColors = useMemo(() => {
        return courses.reduce((acc, course) => {
            acc[course.title] = course.color || "#7c3aed";
            return acc;
        }, {});
    }, [courses]);

    /**
     * Η ΚΡΙΣΙΜΗ ΛΟΓΙΚΗ ΦΙΛΤΡΑΡΙΣΜΑΤΟΣ:
     * Ένα slot εμφανίζεται αν:
     * 1. Είναι Recurring (δεν έχει weekStart/date)
     * 2. Η ημερομηνία του (date) ταιριάζει με τη μέρα που βλέπουμε
     * 3. Το weekStart του ταιριάζει με τη Δευτέρα της εβδομάδας που βλέπουμε
     */
    const groupedSessions = useMemo(() => {
        return weekDays.reduce((acc, dayName) => {
            acc[dayName] = scheduleSlots
                .filter((session) => {
                    // 1. Ελέγχουμε αν ταιριάζει η μέρα (π.χ. Monday)
                    if (session.day !== dayName) return false;

                    // 2. Αν είναι "Μία φορά" (!isRecurring): Πρέπει η εβδομάδα να ταυτίζεται ΑΚΡΙΒΩΣ
                    if (!session.isRecurring) {
                        return session.weekStart === weekStartIso;
                    }

                    // 3. Αν είναι "Επαναλαμβανόμενο" (Recurring):
                    // Εμφανίζεται από την εβδομάδα που το έφτιαξες (weekStart) ΚΑΙ σε όλες τις μελλοντικές (>=)
                    return !session.weekStart || weekStartIso >= session.weekStart;
                })
                .sort((a, b) => a.startTime.localeCompare(b.startTime));
            return acc;
        }, {});
    }, [scheduleSlots, weekStartIso]);

    const handleOpenModal = (day = "Monday") => {
        setSelectedDay(day);
        setIsModalOpen(true);
    };

    const handleSaveSession = async (newSession) => {
        await addSessionSlot(newSession);
        setIsModalOpen(false);
    };

    const handleConfirmDeleteSession = async () => {
        if (!sessionToDeleteId) return;
        try {
            await removeSessionSlot(sessionToDeleteId);
        } finally {
            setSessionToDeleteId(null); // Κλείνει το modal οπωσδήποτε
        }
    };

    if (loading) return <div className="schedule-page"><h2>Loading schedule...</h2></div>;
    if (error) return <div className="schedule-page"><h2>{error}</h2></div>;

    return (
        <div className="schedule-page">
            <WeekHeader
                weekOffset={weekOffset}
                weekStart={weekStart}
                onPrevWeek={() => setWeekOffset(v => Math.max(v - 1, -10))}
                onNextWeek={() => setWeekOffset(v => Math.min(v + 1, 10))}
                onThisWeek={() => setWeekOffset(0)}
            />

            <div className="schedule-toolbar">
                <button className="primary-btn" onClick={() => handleOpenModal("Monday")}>
                    + Add Session
                </button>

                <div className="schedule-view-toggle">
                    <button
                        className={viewMode === "list" ? "toggle-btn active" : "toggle-btn"}
                        onClick={() => setViewMode("list")}
                    >
                        List
                    </button>
                    <button
                        className={viewMode === "calendar" ? "toggle-btn active" : "toggle-btn"}
                        onClick={() => setViewMode("calendar")}
                    >
                        Calendar
                    </button>
                </div>
            </div>

            {viewMode === "list" ? (
                <div className="schedule-grid">
                    {weekDays.map((day, idx) => (
                        <DayColumn
                            key={day}
                            day={day}
                            date={weekDates[idx]}
                            sessions={groupedSessions[day]}
                            courseColors={courseColors}
                            onAddSession={handleOpenModal}
                            onDeleteSession={setSessionToDeleteId}
                        />
                    ))}
                </div>
            ) : (
                <ScheduleCalendarView
                    weekDays={weekDays}
                    weekDates={weekDates}
                    groupedSessions={groupedSessions}
                    courseColors={courseColors}
                    onDeleteSession={setSessionToDeleteId}
                />
            )}

            <AddSessionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveSession}
                defaultDay={selectedDay}
                displayedWeekStart={weekStart}
                displayedWeekOffset={weekOffset}
            />

            <ConfirmModal
                isOpen={!!sessionToDeleteId}
                title="Delete session"
                message="Are you sure you want to delete this study session?"
                confirmText="Delete Session"
                cancelText="Cancel"
                onConfirm={handleConfirmDeleteSession}
                onClose={() => setSessionToDeleteId(null)}
            />
        </div>
    );
}

export default SchedulePage;