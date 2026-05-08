export function mapCourseFromApi(course) {
    return {
        id: course.id,
        title: course.name,
        color: course.color || "#7c3aed",
        professor: course.professor || "",
        semester: course.semester || "",
        description: "",
        notes: "",
        targets: [],
        sessions: []
    };
}

export function mapCourseToApi(course) {
    return {
        name: course.title,
        color: course.color || "#7c3aed",
        professor: course.professor || "",
        semester: course.semester || ""
    };
}

export function mapTaskFromApi(task) {
    return {
        id: task.id,
        title: task.title,
        description: task.description || "",
        dueDate: task.deadline || "",
        priority: task.priority || "Medium",
        status: task.status || "Pending",
        courseId: task.courseId || null,
        course: task.courseName || "Unassigned",
        courseColor: task.courseColor || "#7c3aed"
    };
}

export function mapTaskToApi(task) {
    return {
        title: task.title,
        description: task.description || "",
        deadline: task.dueDate || null,
        priority: task.priority || "Medium",
        status: task.status || "Pending",
        courseId: task.courseId || null
    };
}

export function mapSlotFromApi(slot) {
    return {
        id: slot.id,
        // ΔΙΑΒΑΖΕΙ ΤΟΝ ΤΙΤΛΟ: Αν δεν βρει title, βάζει το courseName
        title: slot.title || slot.courseName || "Study Session",
        isRecurring: slot.isRecurring || false,
        courseId: slot.courseId || null,
        course: slot.courseName || "General",
        color: slot.courseColor || "#7c3aed",
        // Μετατρέπει το MONDAY της Java σε Monday
        day: slot.dayOfWeek ? (slot.dayOfWeek.charAt(0) + slot.dayOfWeek.slice(1).toLowerCase()) : "Monday",
        startTime: slot.startTime?.slice(0, 5) || "",
        endTime: slot.endTime?.slice(0, 5) || "",
        location: slot.location || "",
        weekStart: slot.weekStart || null
    };
}

export function mapSlotToApi(session) {
    return {
        // ΣΤΕΛΝΕΙ ΤΟΝ ΤΙΤΛΟ ΣΤΗ JAVA
        title: session.title,
        isRecurring: session.isRecurring || false,
        courseId: session.courseId || null,
        // Στέλνει ΚΕΦΑΛΑΙΑ στη Java (MONDAY)
        dayOfWeek: session.day ? session.day.toUpperCase() : "MONDAY",
        startTime: session.startTime,
        endTime: session.endTime,
        location: session.location || "",
        weekStart: session.weekStart || null
    };
}

export function mapSessionFromApi(session) {
    return {
        id: session.id,
        durationMinutes: session.durationMinutes,
        startedAt: session.startedAt,
        taskId: session.taskId || null,
        taskTitle: session.taskTitle || "",
        courseName: session.courseName || "General",
        courseColor: session.courseColor || "#7c3aed",
        notes: session.notes || ""
    };
}