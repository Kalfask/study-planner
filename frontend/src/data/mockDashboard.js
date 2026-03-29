export const mockDashboard = {
    weeklyStudyHours: 12.5,
    deadlinesSoon: 3,
    todayTasks: [
        {
            id: 1,
            title: "Finish Physics assignment",
            course: "Physics",
            priority: "High",
            dueDate: "Today"
        },
        {
            id: 2,
            title: "Read Database chapter 4",
            course: "Databases",
            priority: "Medium",
            dueDate: "Tomorrow"
        },
        {
            id: 3,
            title: "Practice Java exercises",
            course: "Programming",
            priority: "Low",
            dueDate: "In 2 days"
        }
    ],
    upcomingSessions: [
        {
            id: 1,
            title: "Physics Revision",
            time: "18:00 - 19:30",
            course: "Physics"
        },
        {
            id: 2,
            title: "Database Study",
            time: "20:00 - 21:00",
            course: "Databases"
        }
    ],
    courseProgress: [
        { id: 1, course: "Physics", progress: 72, color: "#7c3aed" },
        { id: 2, course: "Databases", progress: 54, color: "#2563eb" },
        { id: 3, course: "Programming", progress: 88, color: "#059669" }
    ]
};