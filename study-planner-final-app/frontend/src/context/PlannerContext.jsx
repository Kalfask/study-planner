import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
    useRef
} from "react";

import { getCourses, createCourse, deleteCourseApi, updateCourse as updateCourseApi } from "../api/coursesAPI";
import { getTasks, createTask, deleteTaskApi, updateTask as updateTaskApi } from "../api/tasksAPI";
import {
    getSchedules,
    createSchedule,
    activateSchedule,
    getScheduleSlots,
    addScheduleSlot as addScheduleSlotApi,
    deleteScheduleSlot as deleteScheduleSlotApi
} from "../api/schedulesAPI";
import { getSessions, getSessionStats, logSession } from "../api/sessionsAPI";

import {
    mapCourseFromApi,
    mapCourseToApi,
    mapTaskFromApi,
    mapTaskToApi,
    mapSlotFromApi,
    mapSlotToApi,
    mapSessionFromApi
} from "../api/mappers";

const PlannerContext = createContext(null);

function dayKey(dateValue) {
    const date = new Date(dateValue);
    date.setHours(0, 0, 0, 0);
    return date.toISOString().slice(0, 10);
}

function startOfWeek(dateValue) {
    const date = new Date(dateValue);
    const day = (date.getDay() + 6) % 7; // Monday = 0
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - day);
    return date;
}

function roundOne(value) {
    return Math.round(value * 10) / 10;
}

function calculateCurrentStreak(studySessions) {
    if (studySessions.length === 0) return 0;
    const uniqueDays = new Set(studySessions.map((session) => dayKey(session.startedAt)));
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let cursor = new Date(today);
    if (!uniqueDays.has(dayKey(cursor))) {
        cursor.setDate(cursor.getDate() - 1);
    }
    let streak = 0;
    while (uniqueDays.has(dayKey(cursor))) {
        streak += 1;
        cursor.setDate(cursor.getDate() - 1);
    }
    return streak;
}

function calculateBestStreak(studySessions) {
    if (studySessions.length === 0) return 0;
    const uniqueDays = [...new Set(studySessions.map((session) => dayKey(session.startedAt)))].sort();
    let best = 1;
    let current = 1;
    for (let i = 1; i < uniqueDays.length; i += 1) {
        const prev = new Date(uniqueDays[i - 1]);
        const curr = new Date(uniqueDays[i]);
        const diffDays = Math.round((curr - prev) / (1000 * 60 * 60 * 24));
        if (diffDays === 1) {
            current += 1;
            best = Math.max(best, current);
        } else {
            current = 1;
        }
    }
    return best;
}

function buildWeeklyHours(studySessions) {
    const currentWeekStart = startOfWeek(new Date());
    const result = [];
    for (let i = 5; i >= 0; i -= 1) {
        const weekStart = new Date(currentWeekStart);
        weekStart.setDate(weekStart.getDate() - i * 7);
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 7);
        const totalMinutes = studySessions
            .filter((session) => {
                const startedAt = new Date(session.startedAt);
                return startedAt >= weekStart && startedAt < weekEnd;
            })
            .reduce((sum, session) => sum + session.durationMinutes, 0);
        result.push({ label: `W${6 - i}`, hours: roundOne(totalMinutes / 60) });
    }
    return result;
}

function buildHoursByCourse(studySessions) {
    const grouped = {};
    studySessions.forEach((session) => {
        const courseName = session.courseName || "General";
        if (!grouped[courseName]) {
            grouped[courseName] = { minutes: 0, color: session.courseColor || "#7c3aed" };
        }
        grouped[courseName].minutes += session.durationMinutes;
    });
    return Object.entries(grouped).map(([course, data], index) => ({
        id: index + 1, course, hours: roundOne(data.minutes / 60), color: data.color
    }));
}

function buildProductivityByDay(studySessions) {
    const today = new Date();
    const result = [];
    for (let i = 6; i >= 0; i -= 1) {
        const current = new Date(today);
        current.setDate(today.getDate() - i);
        const key = dayKey(current);
        const totalMinutes = studySessions
            .filter((session) => dayKey(session.startedAt) === key)
            .reduce((sum, session) => sum + session.durationMinutes, 0);
        result.push({
            day: current.toLocaleDateString("en-US", { weekday: "short" }),
            score: Math.min(100, Math.round((totalMinutes / 120) * 100)),
            minutes: totalMinutes
        });
    }
    return result;
}

export function PlannerProvider({ children }) {
    const [courses, setCourses] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [activeSchedule, setActiveSchedule] = useState(null);
    const [scheduleSlots, setScheduleSlots] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [sessionStats, setSessionStats] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // --- Global Timer State (Pomodoro + Active Task) ---
    const defaultMinutes = 25;
    const [selectedMinutes, setSelectedMinutes] = useState(defaultMinutes);
    const [breakMinutes, setBreakMinutes] = useState(5);
    const [timerMode, setTimerMode] = useState("focus");

    const [remainingSeconds, setRemainingSeconds] = useState(defaultMinutes * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    // Το id του task που επέλεξε ο χρήστης
    const [activeTaskId, setActiveTaskId] = useState(null);

    const totalSeconds = useMemo(() => {
        return timerMode === "focus" ? selectedMinutes * 60 : breakMinutes * 60;
    }, [timerMode, selectedMinutes, breakMinutes]);

    // Βρίσκουμε το επιλεγμένο task (ή το πρώτο διαθέσιμο αν δεν έχει επιλέξει κάτι)
    const activeTask = useMemo(() => {
        if (activeTaskId) {
            return tasks.find(t => t.id === activeTaskId) || null;
        }
        return tasks.find((task) => task.status !== "Completed") || null;
    }, [tasks, activeTaskId]);

    useEffect(() => {
        if (!hasStarted) {
            setRemainingSeconds(timerMode === "focus" ? selectedMinutes * 60 : breakMinutes * 60);
        }
    }, [selectedMinutes, breakMinutes, timerMode, hasStarted]);

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setRemainingSeconds((prev) => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        setIsRunning(false);
                        setIsFinished(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    const completeFocusSession = useCallback(
        async (taskInfo, durationMinutes) => {
            const payload = {
                durationMinutes,
                taskId: taskInfo?.id || null,
                notes: ""
            };
            await logSession(payload);
            await Promise.all([refreshSessions(), refreshTasks()]);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    const refreshCourses = useCallback(async () => {
        const res = await getCourses();
        setCourses(res.data.map(mapCourseFromApi));
    }, []);

    const refreshTasks = useCallback(async () => {
        const res = await getTasks();
        setTasks(res.data.map(mapTaskFromApi));
    }, []);

    const refreshSessions = useCallback(async () => {
        const [sessionsRes, statsRes] = await Promise.all([getSessions(), getSessionStats()]);
        setSessions(sessionsRes.data.map(mapSessionFromApi));
        setSessionStats(statsRes.data);
    }, []);

    const refreshSchedule = useCallback(async () => {
        const schedulesRes = await getSchedules();
        const allSchedules = schedulesRes.data;
        setSchedules(allSchedules);
        const activeSchedules = allSchedules.filter((schedule) => schedule.active);
        let active = activeSchedules.sort((a, b) => b.id - a.id)[0] || allSchedules[0] || null;
        if (!active) {
            const created = await createSchedule({ name: "My Schedule" });
            const activated = await activateSchedule(created.data.id);
            active = activated.data;
            setSchedules([active]);
        }
        setActiveSchedule(active);
        const slotsRes = await getScheduleSlots(active.id);
        setScheduleSlots(slotsRes.data.map(mapSlotFromApi));
    }, []);

    // POMODORO: Handle timer end
    useEffect(() => {
        if (isFinished && remainingSeconds === 0) {
            if (timerMode === "focus") {
                completeFocusSession(
                    activeTask // Χρησιμοποιούμε το επιλεγμένο/ενεργό task
                        ? { id: activeTask.id, title: activeTask.title, course: activeTask.course, estimatedTime: activeTask.estimatedTime }
                        : { title: "Focus Session", course: "General", estimatedTime: "" },
                    selectedMinutes
                );
                setTimerMode("break");
                setRemainingSeconds(breakMinutes * 60);
            } else {
                setTimerMode("focus");
                setRemainingSeconds(selectedMinutes * 60);
            }
            setIsFinished(false);
            setIsRunning(true);
            setHasStarted(true);
        }
    }, [isFinished, remainingSeconds, timerMode, selectedMinutes, breakMinutes, completeFocusSession, activeTask]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;
        const bootstrap = async () => {
            try {
                setLoading(true);
                setError("");
                await Promise.all([refreshCourses(), refreshTasks(), refreshSessions(), refreshSchedule()]);
            } catch (err) {
                console.error(err);
                setError("Failed to load planner data");
            } finally {
                setLoading(false);
            }
        };
        bootstrap();
    }, [refreshCourses, refreshTasks, refreshSessions, refreshSchedule]);

    const addCourse = useCallback(async (courseData) => { await createCourse(mapCourseToApi(courseData)); await refreshCourses(); }, [refreshCourses]);
    const updateCourse = useCallback(async (id, courseData) => { await updateCourseApi(id, mapCourseToApi(courseData)); await refreshCourses(); }, [refreshCourses]);
    const deleteCourse = useCallback(async (courseId) => { await deleteCourseApi(courseId); await Promise.all([refreshCourses(), refreshTasks(), refreshSchedule()]); }, [refreshCourses, refreshTasks, refreshSchedule]);

    const addTask = useCallback(async (taskData) => { await createTask(mapTaskToApi(taskData)); await refreshTasks(); }, [refreshTasks]);
    const updateTask = useCallback(async (id, taskData) => { await updateTaskApi(id, mapTaskToApi(taskData)); await refreshTasks(); }, [refreshTasks]);
    const deleteTask = useCallback(async (taskId) => { await deleteTaskApi(taskId); await refreshTasks(); }, [refreshTasks]);

    const addSessionSlot = useCallback(async (sessionData) => { if (!activeSchedule) return; await addScheduleSlotApi(activeSchedule.id, mapSlotToApi(sessionData)); await refreshSchedule(); }, [activeSchedule, refreshSchedule]);
    const removeSessionSlot = useCallback(async (slotId) => { if (!activeSchedule) return; await deleteScheduleSlotApi(activeSchedule.id, slotId); await refreshSchedule(); }, [activeSchedule, refreshSchedule]);
    const getCourseById = useCallback((id) => courses.find((course) => course.id === Number(id)), [courses]);
    const getTasksForCourse = useCallback((courseTitleOrId) => {
        if (typeof courseTitleOrId === "number") return tasks.filter((task) => task.courseId === courseTitleOrId);
        const courseMatch = courses.find((course) => course.title === courseTitleOrId);
        if (courseMatch) return tasks.filter((task) => task.courseId === courseMatch.id || task.course === courseMatch.title);
        return tasks.filter((task) => task.course === courseTitleOrId);
    }, [tasks, courses]);

    const todayFocus = useMemo(() => {
        const today = dayKey(new Date());
        const todaySessions = sessions.filter((session) => dayKey(session.startedAt) === today);
        const derivedMinutes = todaySessions.reduce((sum, session) => sum + session.durationMinutes, 0);
        return { totalMinutes: sessionStats?.todayMinutes ?? derivedMinutes, sessionsCompleted: todaySessions.length, dailyGoalMinutes: 180 };
    }, [sessions, sessionStats]);

    const statsData = useMemo(() => {
        const productivityByDay = buildProductivityByDay(sessions);
        const bestDay = productivityByDay.reduce((best, item) => (item.minutes > best.minutes ? item : best), { day: "—", minutes: 0 }).day || "—";
        const completedTasks = tasks.filter((task) => task.status === "Completed").length;
        const pendingTasks = tasks.filter((task) => task.status === "Pending").length;
        return {
            summary: { totalStudyHoursThisWeek: roundOne((sessionStats?.weekMinutes ?? 0) / 60), completedTasks, currentStreak: calculateCurrentStreak(sessions), bestDay },
            weeklyHours: buildWeeklyHours(sessions),
            hoursByCourse: buildHoursByCourse(sessions),
            productivityByDay,
            streak: { current: calculateCurrentStreak(sessions), best: calculateBestStreak(sessions), target: 7 },
            completion: { completed: completedTasks, pending: pendingTasks, overdue: 0 }
        };
    }, [sessions, sessionStats, tasks]);

    const handleSelectPreset = useCallback((minutes) => {
        setTimerMode("focus");
        setSelectedMinutes(minutes);
        setRemainingSeconds(minutes * 60);
        setIsRunning(false);
        setHasStarted(false);
        setIsFinished(false);
    }, []);

    const handleStartTimer = useCallback(() => {
        setRemainingSeconds(timerMode === "focus" ? selectedMinutes * 60 : breakMinutes * 60);
        setHasStarted(true);
        setIsRunning(true);
        setIsFinished(false);
    }, [selectedMinutes, breakMinutes, timerMode]);

    const handlePauseTimer = useCallback(() => { setIsRunning(false); }, []);

    const handleResumeTimer = useCallback(() => {
        setHasStarted(true);
        setIsRunning(true);
        setIsFinished(false);
    }, []);

    const handleStopTimer = useCallback(() => {
        setIsRunning(false);
        setHasStarted(false);
        setIsFinished(false);
        setTimerMode("focus");
        setRemainingSeconds(selectedMinutes * 60);
    }, [selectedMinutes]);

    const value = {
        courses, tasks, schedules, activeSchedule, scheduleSlots, sessions, sessionStats, todayFocus, statsData, loading, error,

        // Timer Values
        timerMode, selectedMinutes, breakMinutes, remainingSeconds, isRunning, hasStarted, isFinished, totalSeconds,
        activeTask, activeTaskId, setActiveTaskId, // Εξαγωγή του activeTask

        handleSelectPreset, handleStartTimer, handlePauseTimer, handleResumeTimer, handleStopTimer,
        refreshCourses, refreshTasks, refreshSessions, refreshSchedule,
        addCourse, updateCourse, deleteCourse,
        addTask, updateTask, deleteTask,
        addSessionSlot, removeSessionSlot, getCourseById, getTasksForCourse, completeFocusSession
    };

    return <PlannerContext.Provider value={value}>{children}</PlannerContext.Provider>;
}

export function usePlanner() {
    const context = useContext(PlannerContext);
    if (!context) throw new Error("usePlanner must be used inside PlannerProvider");
    return context;
}