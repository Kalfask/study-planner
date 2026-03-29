import React from "react";
import {mockDashboard} from "../data/mockDashboard";
import WeeklyStudyHours from "../components/dashboard/WeeklyStudyHours";
import DeadlinesSoon from  "../components/dashboard/DeadlinesSoon";
import TodayTasks from "../components/dashboard/TodayTasks";
import UpcomingSessions from "../components/dashboard/UpcomingSessions";
import CourseProgress from "../components/dashboard/CourseProgress";
import QuickStartTimer from "../components/dashboard/QuickStartTimer";
import "../styles/dashboard.css";

function DashboardPage(){
    return(
        <div className="dashboard-page">
            <div className="dashboard-header">
                <div>
                    <h1>Dashboard</h1>
                    <p>Stay organized and focused on your study goals.</p>
                </div>
            </div>
            <div className="dashboard-grid">
                <WeeklyStudyHours hours={mockDashboard.weeklyStudyHours}/>
                <DeadlinesSoon count={mockDashboard.deadlinesSoon}/>
                <QuickStartTimer/>

                <TodayTasks tasks={mockDashboard.todayTasks}/>
                <UpcomingSessions sessions={mockDashboard.upcomingSessions}/>
                <CourseProgress courses={mockDashboard.courseProgress}/>
            </div>
        </div>
    );
}

export default DashboardPage;