import React, { useEffect, useMemo, useRef, useState } from "react";
import { usePlanner } from "../context/PlannerContext";
import StatsSummaryCards from "../components/stats/StatsSummaryCards";
import WeeklyHoursChart from "../components/stats/WeeklyHoursChart";
import CourseHoursChart from "../components/stats/CourseHoursChart";
import ProductivityByDay from "../components/stats/ProductivityByDay";
import StreakCard from "../components/stats/StreakCard";
import TaskCompletionCard from "../components/stats/TaskCompletionCard";
import "../styles/stats.css";

const PERIOD_OPTIONS = [
    { value: "week", label: "This Week" },
    { value: "month", label: "This Month" },
    { value: "year", label: "This Year" },
    { value: "all", label: "All Time" }
];

function getPeriodStart(period) {
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    if (period === "week") {
        const day = (now.getDay() + 6) % 7; // Monday = 0
        now.setDate(now.getDate() - day);
        return now;
    }
    if (period === "month") {
        now.setDate(1);
        return now;
    }
    if (period === "year") {
        now.setMonth(0, 1);
        return now;
    }
    return null; // all time
}

function roundOne(value) {
    return Math.round(value * 10) / 10;
}

function dayKey(dateValue) {
    const date = new Date(dateValue);
    date.setHours(0, 0, 0, 0);
    return date.toISOString().slice(0, 10);
}

function buildHoursByCourse(sessions) {
    const grouped = {};

    sessions.forEach((session) => {
        const courseName = session.courseName || "General";

        if (!grouped[courseName]) {
            grouped[courseName] = {
                minutes: 0,
                color: session.courseColor || "#7c3aed"
            };
        }

        grouped[courseName].minutes += session.durationMinutes;
    });

    return Object.entries(grouped).map(([course, data], index) => ({
        id: index + 1,
        course,
        hours: roundOne(data.minutes / 60),
        color: data.color
    }));
}

function getBestDayLabel(sessions) {
    if (sessions.length === 0) return "—";

    const minutesByDay = {};

    sessions.forEach((session) => {
        const key = dayKey(session.startedAt);
        minutesByDay[key] = (minutesByDay[key] || 0) + session.durationMinutes;
    });

    let bestKey = null;
    let bestMinutes = 0;

    Object.entries(minutesByDay).forEach(([key, minutes]) => {
        if (minutes > bestMinutes) {
            bestMinutes = minutes;
            bestKey = key;
        }
    });

    if (!bestKey) return "—";
    return new Date(bestKey).toLocaleDateString("en-US", { weekday: "short" });
}

function StatsPage() {
    const { statsData, sessions, loading, error } = usePlanner();
    const [period, setPeriod] = useState("month");
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handler = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const filteredSessions = useMemo(() => {
        const start = getPeriodStart(period);
        if (!start) return sessions;
        return sessions.filter(
            (session) => new Date(session.startedAt) >= start
        );
    }, [sessions, period]);

    const filteredStats = useMemo(() => {
        if (!statsData) return null;

        const totalMinutes = filteredSessions.reduce(
            (sum, session) => sum + session.durationMinutes,
            0
        );

        const periodLabel =
            PERIOD_OPTIONS.find((option) => option.value === period)?.label || "";

        return {
            ...statsData,
            summary: {
                ...statsData.summary,
                totalStudyHoursPeriod: roundOne(totalMinutes / 60),
                periodLabel,
                bestDay: getBestDayLabel(filteredSessions)
            },
            hoursByCourse: buildHoursByCourse(filteredSessions)
        };
    }, [statsData, filteredSessions, period]);

    if (loading) {
        return (
            <div className="stats-page">
                <h2>Loading stats...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="stats-page">
                <h2>{error}</h2>
            </div>
        );
    }

    if (!filteredStats) {
        return (
            <div className="stats-page">
                <h2>No stats available yet.</h2>
            </div>
        );
    }

    const currentLabel =
        PERIOD_OPTIONS.find((option) => option.value === period)?.label || "";

    return (
        <div className="stats-page">
            <div className="stats-page-header">
                <div>
                    <h1>Stats & Progress</h1>
                    <p>Track your study momentum, productivity and overall performance.</p>
                </div>

                <div className="period-selector" ref={dropdownRef}>
                    <button
                        type="button"
                        className="primary-btn period-trigger"
                        onClick={() => setOpen((value) => !value)}
                        aria-haspopup="menu"
                        aria-expanded={open}
                    >
                        {currentLabel}
                        <span className="period-caret">▾</span>
                    </button>

                    {open && (
                        <div className="period-menu" role="menu">
                            {PERIOD_OPTIONS.map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    role="menuitem"
                                    className={`period-menu-item ${period === option.value ? "active" : ""}`}
                                    onClick={() => {
                                        setPeriod(option.value);
                                        setOpen(false);
                                    }}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <StatsSummaryCards summary={filteredStats.summary} />

            <div className="stats-grid">
                <div className="stats-col-span-7">
                    <WeeklyHoursChart data={filteredStats.weeklyHours} />
                </div>

                <div className="stats-col-span-5">
                    <StreakCard streak={filteredStats.streak} />
                </div>

                <div className="stats-col-span-6">
                    <CourseHoursChart data={filteredStats.hoursByCourse} />
                </div>

                <div className="stats-col-span-6">
                    <TaskCompletionCard completion={filteredStats.completion} />
                </div>

                <div className="stats-col-span-12">
                    <ProductivityByDay data={filteredStats.productivityByDay} />
                </div>
            </div>
        </div>
    );
}

export default StatsPage;
