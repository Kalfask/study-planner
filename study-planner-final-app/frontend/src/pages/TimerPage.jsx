import React from "react";
import { usePlanner } from "../context/PlannerContext";
import CircularTimer from "../components/timer/CircularTimer";
import TimerControls from "../components/timer/TimerControls";
import FocusSessionCard from "../components/timer/FocusSessionCard";
import PomodoroPresets from "../components/timer/PomodoroPresets";
import DailyFocusSummary from "../components/timer/DailyFocusSummary";
import "../styles/timer.css";

const presets = [
    { id: 1, label: "Pomodoro", minutes: 25 },
    { id: 2, label: "Deep Focus", minutes: 50 },
    { id: 3, label: "Quick Review", minutes: 15 },
    { id: 4, label: "Long Session", minutes: 90 }
];

function TimerPage() {
    const {
        tasks,
        todayFocus,
        loading,
        error,
        selectedMinutes,
        remainingSeconds,
        isRunning,
        hasStarted,
        timerMode,
        totalSeconds,
        activeTask,
        activeTaskId,
        setActiveTaskId,
        handleSelectPreset,
        handleStartTimer,
        handlePauseTimer,
        handleResumeTimer,
        handleStopTimer
    } = usePlanner();

    // Φιλτράρουμε τα tasks που δεν έχουν ολοκληρωθεί
    const pendingTasks = tasks.filter((task) => task.status !== "Completed");

    if (loading) return <div className="timer-page"><h2>Loading timer...</h2></div>;
    if (error) return <div className="timer-page"><h2>{error}</h2></div>;

    return (
        <div className="timer-page">
            <div className="timer-page-header">
                <div>
                    <h1>{timerMode === "break" ? "☕ Break Time" : "Focus Timer"}</h1>
                    <p>
                        {timerMode === "break"
                            ? "Time to relax before your next session."
                            : "Stay concentrated with clean study sessions and Pomodoro presets."}
                    </p>
                </div>
            </div>

            <div className="timer-layout">
                <div className="timer-main-card">
                    <CircularTimer
                        totalSeconds={totalSeconds}
                        remainingSeconds={remainingSeconds}
                        isRunning={isRunning}
                    />

                    <TimerControls
                        isRunning={isRunning}
                        hasStarted={hasStarted}
                        onStart={handleStartTimer}
                        onPause={handlePauseTimer}
                        onResume={handleResumeTimer}
                        onStop={handleStopTimer}
                    />
                </div>

                <div className="timer-side-column">
                    {/* ΤΟ ΜΑΥΡΟ ΚΟΥΤΙ ΑΦΑΙΡΕΘΗΚΕ ΑΠΟ ΕΔΩ */}

                    {/* Περνάμε τα props στο FocusSessionCard */}
                    <FocusSessionCard
                        task={
                            timerMode === "break"
                                ? { title: "Relax", course: "Take a breather" }
                                : activeTask || { title: "General Focus", course: "No specific task selected" }
                        }
                        timerMode={timerMode} // Περνάμε το mode
                        activeTaskId={activeTaskId} // Περνάμε το id
                        setActiveTaskId={setActiveTaskId} // Περνάμε τη συνάρτηση
                        pendingTasks={pendingTasks} // Περνάμε τα tasks
                    />

                    <PomodoroPresets
                        presets={presets}
                        activeMinutes={selectedMinutes}
                        onSelectPreset={handleSelectPreset}
                    />

                    <DailyFocusSummary
                        totalMinutes={todayFocus.totalMinutes}
                        sessionsCompleted={todayFocus.sessionsCompleted}
                        dailyGoalMinutes={todayFocus.dailyGoalMinutes}
                    />
                </div>
            </div>
        </div>
    );
}

export default TimerPage;