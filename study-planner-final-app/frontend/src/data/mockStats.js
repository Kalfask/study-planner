export const mockStats = {
    summary: {
        totalStudyHoursThisWeek: 14.5,
        completedTasks: 18,
        currentStreak: 6,
        bestDay: "Wednesday"
    },

    weeklyHours: [
        { label: "W1", hours: 7.5 },
        { label: "W2", hours: 9 },
        { label: "W3", hours: 8.5 },
        { label: "W4", hours: 11 },
        { label: "W5", hours: 13.5 },
        { label: "W6", hours: 14.5 }
    ],

    hoursByCourse: [
        { id: 1, course: "Physics", hours: 6.5, color: "#7c3aed" },
        { id: 2, course: "Databases", hours: 3.5, color: "#2563eb" },
        { id: 3, course: "Programming", hours: 4.5, color: "#059669" }
    ],

    productivityByDay: [
        { day: "Mon", score: 62, minutes: 75 },
        { day: "Tue", score: 78, minutes: 95 },
        { day: "Wed", score: 92, minutes: 120 },
        { day: "Thu", score: 70, minutes: 85 },
        { day: "Fri", score: 81, minutes: 100 },
        { day: "Sat", score: 44, minutes: 45 },
        { day: "Sun", score: 58, minutes: 60 }
    ],

    streak: {
        current: 6,
        best: 12,
        target: 7
    },

    completion: {
        completed: 18,
        pending: 7,
        overdue: 2
    }
};