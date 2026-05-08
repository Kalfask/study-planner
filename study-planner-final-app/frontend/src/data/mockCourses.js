export const mockCourses = [
    {
        id: 1,
        title: "Physics",
        color: "#7c3aed",
        tasksCount: 5,
        progress: 72,
        nextDeadline: "2026-04-03",
        description: "Weekly study plan for mechanics, relativity and exercises.",
        targets: [
            "Finish chapter 4 exercises",
            "Review lecture notes",
            "Complete 2 mock problems"
        ],
        notes: "Focus more on time management and weekly repetition.",
        tasks: [
            { id: 1, title: "Finish assignment 2", status: "Pending", dueDate: "2026-04-03" },
            { id: 2, title: "Read relativity notes", status: "In Progress", dueDate: "2026-04-05" },
            { id: 3, title: "Solve tutorial sheet", status: "Completed", dueDate: "2026-04-01" }
        ],
        sessions: [
            { id: 1, title: "Mechanics Revision", time: "18:00 - 19:30", date: "Mon" },
            { id: 2, title: "Problem Solving", time: "20:00 - 21:00", date: "Wed" }
        ]
    },
    {
        id: 2,
        title: "Databases",
        color: "#2563eb",
        tasksCount: 3,
        progress: 54,
        nextDeadline: "2026-04-06",
        description: "SQL, schema design and normalization study tracking.",
        targets: [
            "Practice joins",
            "Finish ER diagram",
            "Revise normalization rules"
        ],
        notes: "Need more practice with complex SQL queries.",
        tasks: [
            { id: 1, title: "Write SQL queries", status: "Pending", dueDate: "2026-04-06" },
            { id: 2, title: "Prepare ER model", status: "Pending", dueDate: "2026-04-08" }
        ],
        sessions: [
            { id: 1, title: "SQL Practice", time: "17:00 - 18:00", date: "Tue" },
            { id: 2, title: "Schema Review", time: "19:00 - 20:00", date: "Thu" }
        ]
    },
    {
        id: 3,
        title: "Programming",
        color: "#059669",
        tasksCount: 4,
        progress: 88,
        nextDeadline: "2026-04-02",
        description: "Java, backend logic and project tasks.",
        targets: [
            "Complete REST endpoints",
            "Refactor frontend pages",
            "Test authentication flow"
        ],
        notes: "Almost on track. Only polish and testing left.",
        tasks: [
            { id: 1, title: "Fix login page", status: "Completed", dueDate: "2026-03-30" },
            { id: 2, title: "Test course routes", status: "In Progress", dueDate: "2026-04-02" }
        ],
        sessions: [
            { id: 1, title: "Frontend Refactor", time: "16:00 - 17:30", date: "Fri" }
        ]
    }
];

export function getCourseById(id) {
    return mockCourses.find((course) => course.id === Number(id));
}
