import React, { useMemo } from "react";
import { usePlanner } from "../context/PlannerContext";
import WeeklyStudyHours from "../components/dashboard/WeeklyStudyHours";
import DeadlinesSoon from "../components/dashboard/DeadlinesSoon";
import TodayTasks from "../components/dashboard/TodayTasks";
import UpcomingSessions from "../components/dashboard/UpcomingSessions";
import CourseProgress from "../components/dashboard/CourseProgress";
import QuickStartTimer from "../components/dashboard/QuickStartTimer";
import "../styles/dashboard.css";

const dayOrder = {
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
    Sunday: 7
};

function DashboardPage() {
    const { tasks, courses, scheduleSlots, statsData, loading, error } = usePlanner();

    const dashboardData = useMemo(() => {
        const today = new Date();
        const todayKey = today.toISOString().slice(0, 10);

        const nextThreeDays = new Date();
        nextThreeDays.setDate(today.getDate() + 3);
        const nextThreeDaysKey = nextThreeDays.toISOString().slice(0, 10);

        const deadlinesSoonCount = tasks.filter(
            (task) =>
                task.dueDate &&
                task.status !== "Completed" &&
                task.dueDate >= todayKey &&
                task.dueDate <= nextThreeDaysKey
        ).length;

        const todayTasks = [...tasks]
            .filter((task) => task.status !== "Completed")
            .sort((a, b) => {
                if (!a.dueDate && !b.dueDate) return 0;
                if (!a.dueDate) return 1;
                if (!b.dueDate) return -1;
                return a.dueDate.localeCompare(b.dueDate);
            })
            .slice(0, 4)
            .map((task) => ({
                ...task,
                dueDate: task.dueDate === todayKey ? "Today" : task.dueDate
            }));

        const upcomingSessions = [...scheduleSlots]
            .sort((a, b) => {
                const dayDiff = (dayOrder[a.day] || 99) - (dayOrder[b.day] || 99);
                if (dayDiff !== 0) return dayDiff;
                return a.startTime.localeCompare(b.startTime);
            })
            .slice(0, 4)
            .map((session) => ({
                id: session.id,
                title: session.title,
                course: session.course,
                time: `${session.day} • ${session.startTime} - ${session.endTime}`
            }));

        const courseProgress = courses.map((course) => {
            const courseTasks = tasks.filter(
                (task) => task.courseId === course.id || task.course === course.title
            );

            const completed = courseTasks.filter(
                (task) => task.status === "Completed"
            ).length;

            const progress =
                courseTasks.length > 0
                    ? Math.round((completed / courseTasks.length) * 100)
                    : 0;

            return {
                id: course.id,
                course: course.title,
                progress,
                color: course.color || "#7c3aed"
            };
        });

        return {
            weeklyStudyHours: statsData?.summary?.totalStudyHoursThisWeek || 0,
            deadlinesSoon: deadlinesSoonCount,
            todayTasks,
            upcomingSessions,
            courseProgress
        };
    }, [tasks, courses, scheduleSlots, statsData]);

    if (loading) {
        return (
            <div className="dashboard-page">
                <h2>Loading dashboard...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="dashboard-page">
                <h2>{error}</h2>
            </div>
        );
    }

    return (
        <div className="dashboard-page">
            <div className="dashboard-header">
                <div>
                    <h1>Dashboard</h1>
                    <p>Stay organized and focused on your study goals.</p>
                </div>
            </div>

            <div className="dashboard-grid">
                <WeeklyStudyHours hours={dashboardData.weeklyStudyHours} />
                <DeadlinesSoon count={dashboardData.deadlinesSoon} />
                <QuickStartTimer />

                <TodayTasks tasks={dashboardData.todayTasks} />
                <UpcomingSessions sessions={dashboardData.upcomingSessions} />
                <CourseProgress courses={dashboardData.courseProgress} />
            </div>
        </div>
    );
}

export default DashboardPage;