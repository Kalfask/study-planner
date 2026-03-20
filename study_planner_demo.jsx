import { useState, useEffect, useRef } from "react";

const COLORS = {
  bg: "#0F0F12",
  surface: "#1A1A22",
  surfaceHover: "#22222D",
  border: "#2A2A36",
  borderLight: "#3A3A48",
  text: "#E8E6E1",
  textMuted: "#8B8994",
  textDim: "#5C5A66",
  accent: "#7C6AFF",
  accentLight: "#9B8AFF",
  accentDim: "rgba(124,106,255,0.12)",
  green: "#3DD68C",
  greenDim: "rgba(61,214,140,0.12)",
  amber: "#F5A524",
  amberDim: "rgba(245,165,36,0.12)",
  red: "#F5564A",
  redDim: "rgba(245,86,74,0.12)",
  blue: "#4A9EF5",
  blueDim: "rgba(74,158,245,0.12)",
  pink: "#E45FAA",
  pinkDim: "rgba(228,95,170,0.12)",
};

const COURSES = [
  { id: 1, name: "Database Systems", color: "#7C6AFF", professor: "Dr. Papadopoulos", semester: "Spring 2026" },
  { id: 2, name: "Software Engineering", color: "#3DD68C", professor: "Dr. Alexiou", semester: "Spring 2026" },
  { id: 3, name: "Computer Networks", color: "#F5A524", professor: "Dr. Nikolaou", semester: "Spring 2026" },
  { id: 4, name: "Operating Systems", color: "#4A9EF5", professor: "Dr. Stavrou", semester: "Spring 2026" },
  { id: 5, name: "Linear Algebra", color: "#E45FAA", professor: "Dr. Georgiou", semester: "Spring 2026" },
];

const TASKS = [
  { id: 1, title: "ER diagram for library system", courseId: 1, deadline: "2026-03-22", priority: "HIGH", status: "IN_PROGRESS" },
  { id: 2, title: "UML class diagram", courseId: 2, deadline: "2026-03-24", priority: "HIGH", status: "TODO" },
  { id: 3, title: "TCP/IP protocol analysis", courseId: 3, deadline: "2026-03-26", priority: "MEDIUM", status: "TODO" },
  { id: 4, title: "Process scheduling simulation", courseId: 4, deadline: "2026-03-28", priority: "MEDIUM", status: "TODO" },
  { id: 5, title: "SQL normalization exercises", courseId: 1, deadline: "2026-03-21", priority: "HIGH", status: "DONE" },
  { id: 6, title: "Matrix operations homework", courseId: 5, deadline: "2026-03-30", priority: "LOW", status: "TODO" },
  { id: 7, title: "Design patterns report", courseId: 2, deadline: "2026-03-20", priority: "MEDIUM", status: "DONE" },
  { id: 8, title: "Subnetting worksheet", courseId: 3, deadline: "2026-03-25", priority: "LOW", status: "IN_PROGRESS" },
];

const SESSIONS = [
  { id: 1, taskId: 1, duration: 45, date: "2026-03-19", notes: "Finished entities" },
  { id: 2, taskId: 1, duration: 30, date: "2026-03-18", notes: "Started relationships" },
  { id: 3, taskId: 5, duration: 50, date: "2026-03-17", notes: "3NF exercises" },
  { id: 4, taskId: 7, duration: 60, date: "2026-03-16", notes: "Observer + Strategy" },
  { id: 5, taskId: 3, duration: 25, date: "2026-03-19", notes: "Read chapter 4" },
  { id: 6, taskId: 2, duration: 40, date: "2026-03-15", notes: "Use case diagrams" },
];

const SCHEDULE = [
  { id: 1, courseId: 1, day: "Monday", start: "09:00", end: "11:00", location: "Room A3" },
  { id: 2, courseId: 2, day: "Monday", start: "13:00", end: "15:00", location: "Lab B2" },
  { id: 3, courseId: 3, day: "Tuesday", start: "10:00", end: "12:00", location: "Room C1" },
  { id: 4, courseId: 4, day: "Tuesday", start: "14:00", end: "16:00", location: "Lab A1" },
  { id: 5, courseId: 5, day: "Wednesday", start: "09:00", end: "11:00", location: "Room D4" },
  { id: 6, courseId: 1, day: "Wednesday", start: "13:00", end: "14:00", location: "Lab B2" },
  { id: 7, courseId: 2, day: "Thursday", start: "11:00", end: "13:00", location: "Room A3" },
  { id: 8, courseId: 3, day: "Thursday", start: "15:00", end: "17:00", location: "Lab C1" },
  { id: 9, courseId: 4, day: "Friday", start: "09:00", end: "11:00", location: "Room A1" },
  { id: 10, courseId: 5, day: "Friday", start: "13:00", end: "15:00", location: "Room D4" },
];

const getCourse = (id) => COURSES.find((c) => c.id === id);
const priorityColor = (p) => p === "HIGH" ? COLORS.red : p === "MEDIUM" ? COLORS.amber : COLORS.textMuted;
const priorityBg = (p) => p === "HIGH" ? COLORS.redDim : p === "MEDIUM" ? COLORS.amberDim : "rgba(140,137,148,0.1)";
const statusColor = (s) => s === "DONE" ? COLORS.green : s === "IN_PROGRESS" ? COLORS.accent : COLORS.textMuted;

function Icon({ name, size = 18 }) {
  const paths = {
    dashboard: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>,
    book: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></>,
    tasks: <><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></>,
    timer: <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>,
    calendar: <><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></>,
    logout: <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></>,
    play: <polygon points="5 3 19 12 5 21 5 3" />,
    pause: <><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></>,
    reset: <><polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" /></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
}

function Sidebar({ page, setPage }) {
  const items = [
    { id: "dashboard", icon: "dashboard", label: "Dashboard" },
    { id: "courses", icon: "book", label: "Courses" },
    { id: "tasks", icon: "tasks", label: "Tasks" },
    { id: "timer", icon: "timer", label: "Timer" },
    { id: "schedule", icon: "calendar", label: "Schedule" },
  ];
  return (
    <div style={{ width: 220, background: COLORS.surface, borderRight: `1px solid ${COLORS.border}`,
      display: "flex", flexDirection: "column", padding: "20px 0", flexShrink: 0 }}>
      <div style={{ padding: "0 20px 24px", borderBottom: `1px solid ${COLORS.border}`, marginBottom: 8 }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: COLORS.accent, letterSpacing: "-0.5px",
          fontFamily: "'DM Sans', sans-serif" }}>StudyPlanner</div>
        <div style={{ fontSize: 12, color: COLORS.textDim, marginTop: 2 }}>Spring 2026</div>
      </div>
      <div style={{ flex: 1, padding: "8px 10px" }}>
        {items.map((item) => (
          <div key={item.id} onClick={() => setPage(item.id)}
            style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px",
              borderRadius: 10, cursor: "pointer", marginBottom: 2,
              background: page === item.id ? COLORS.accentDim : "transparent",
              color: page === item.id ? COLORS.accent : COLORS.textMuted,
              transition: "all 0.15s" }}>
            <Icon name={item.icon} size={18} />
            <span style={{ fontSize: 14, fontWeight: page === item.id ? 600 : 400 }}>{item.label}</span>
          </div>
        ))}
      </div>
      <div style={{ padding: "12px 22px", borderTop: `1px solid ${COLORS.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: COLORS.accentDim,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: COLORS.accent, fontSize: 14, fontWeight: 700 }}>K</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text }}>kostas</div>
            <div style={{ fontSize: 11, color: COLORS.textDim }}>kostas@uni.gr</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, sub, color }) {
  return (
    <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 14,
      padding: "18px 20px", flex: 1, minWidth: 150 }}>
      <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 6, textTransform: "uppercase",
        letterSpacing: "0.5px", fontWeight: 500 }}>{label}</div>
      <div style={{ fontSize: 28, fontWeight: 700, color: color || COLORS.text,
        fontFamily: "'DM Sans', sans-serif" }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: COLORS.textDim, marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

function Dashboard() {
  const todoCount = TASKS.filter((t) => t.status === "TODO").length;
  const inProgressCount = TASKS.filter((t) => t.status === "IN_PROGRESS").length;
  const doneCount = TASKS.filter((t) => t.status === "DONE").length;
  const totalMinutes = SESSIONS.reduce((s, x) => s + x.duration, 0);
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  const upcoming = TASKS.filter((t) => t.status !== "DONE").sort((a, b) => a.deadline.localeCompare(b.deadline)).slice(0, 4);
  const recent = SESSIONS.slice(0, 4);

  return (
    <div>
      <h1 style={{ fontSize: 26, fontWeight: 700, color: COLORS.text, margin: "0 0 6px",
        fontFamily: "'DM Sans', sans-serif" }}>Dashboard</h1>
      <p style={{ color: COLORS.textMuted, fontSize: 14, margin: "0 0 24px" }}>Welcome back, Kostas</p>

      <div style={{ display: "flex", gap: 14, marginBottom: 28, flexWrap: "wrap" }}>
        <StatCard label="To do" value={todoCount} color={COLORS.amber} sub="tasks pending" />
        <StatCard label="In progress" value={inProgressCount} color={COLORS.accent} sub="tasks active" />
        <StatCard label="Completed" value={doneCount} color={COLORS.green} sub="tasks done" />
        <StatCard label="Study time" value={`${hours}h ${mins}m`} color={COLORS.blue} sub="this week" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: 20 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: COLORS.text, marginBottom: 14 }}>Upcoming deadlines</div>
          {upcoming.map((t) => {
            const c = getCourse(t.courseId);
            return (
              <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0",
                borderBottom: `1px solid ${COLORS.border}` }}>
                <div style={{ width: 4, height: 32, borderRadius: 2, background: c?.color }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: COLORS.text }}>{t.title}</div>
                  <div style={{ fontSize: 11, color: COLORS.textDim }}>{c?.name}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.text }}>{t.deadline.slice(5)}</div>
                  <div style={{ fontSize: 10, padding: "2px 6px", borderRadius: 4,
                    background: priorityBg(t.priority), color: priorityColor(t.priority), fontWeight: 600 }}>
                    {t.priority}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: 20 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: COLORS.text, marginBottom: 14 }}>Recent study sessions</div>
          {recent.map((s) => {
            const task = TASKS.find((t) => t.id === s.taskId);
            const c = task ? getCourse(task.courseId) : null;
            return (
              <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0",
                borderBottom: `1px solid ${COLORS.border}` }}>
                <div style={{ width: 4, height: 32, borderRadius: 2, background: c?.color }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: COLORS.text }}>{task?.title}</div>
                  <div style={{ fontSize: 11, color: COLORS.textDim }}>{s.notes}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.accent }}>{s.duration}m</div>
                  <div style={{ fontSize: 11, color: COLORS.textDim }}>{s.date.slice(5)}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function CoursesPage() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: COLORS.text, margin: 0,
            fontFamily: "'DM Sans', sans-serif" }}>Courses</h1>
          <p style={{ color: COLORS.textMuted, fontSize: 14, margin: "4px 0 0" }}>{COURSES.length} courses this semester</p>
        </div>
        <button style={{ padding: "8px 18px", background: COLORS.accent, color: "#fff", border: "none",
          borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>+ Add course</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
        {COURSES.map((c) => {
          const taskCount = TASKS.filter((t) => t.courseId === c.id).length;
          const doneCount = TASKS.filter((t) => t.courseId === c.id && t.status === "DONE").length;
          const sessionMins = SESSIONS.filter((s) => {
            const task = TASKS.find((t) => t.id === s.taskId);
            return task && task.courseId === c.id;
          }).reduce((sum, s) => sum + s.duration, 0);
          return (
            <div key={c.id} style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`,
              borderRadius: 14, padding: 20, borderTop: `3px solid ${c.color}`, cursor: "pointer",
              transition: "border-color 0.15s" }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = c.color}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = COLORS.border}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div style={{ width: 10, height: 10, borderRadius: 3, background: c.color }} />
                <div style={{ fontSize: 16, fontWeight: 600, color: COLORS.text }}>{c.name}</div>
              </div>
              <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 4 }}>{c.professor}</div>
              <div style={{ fontSize: 11, color: COLORS.textDim, marginBottom: 14 }}>{c.semester}</div>
              <div style={{ display: "flex", gap: 16 }}>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.text }}>{taskCount}</div>
                  <div style={{ fontSize: 10, color: COLORS.textDim }}>Tasks</div>
                </div>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.green }}>{doneCount}</div>
                  <div style={{ fontSize: 10, color: COLORS.textDim }}>Done</div>
                </div>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.blue }}>{sessionMins}m</div>
                  <div style={{ fontSize: 10, color: COLORS.textDim }}>Studied</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TasksPage() {
  const [filter, setFilter] = useState("ALL");
  const filtered = filter === "ALL" ? TASKS : TASKS.filter((t) => t.status === filter);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: COLORS.text, margin: 0,
            fontFamily: "'DM Sans', sans-serif" }}>Tasks</h1>
          <p style={{ color: COLORS.textMuted, fontSize: 14, margin: "4px 0 0" }}>{TASKS.length} total assignments</p>
        </div>
        <button style={{ padding: "8px 18px", background: COLORS.accent, color: "#fff", border: "none",
          borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>+ Add task</button>
      </div>

      <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
        {["ALL", "TODO", "IN_PROGRESS", "DONE"].map((s) => (
          <button key={s} onClick={() => setFilter(s)}
            style={{ padding: "6px 14px", borderRadius: 8, border: "none", fontSize: 12, fontWeight: 600,
              cursor: "pointer",
              background: filter === s ? COLORS.accentDim : "transparent",
              color: filter === s ? COLORS.accent : COLORS.textMuted }}>
            {s === "ALL" ? "All" : s === "IN_PROGRESS" ? "In progress" : s.charAt(0) + s.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {filtered.map((t) => {
          const c = getCourse(t.courseId);
          return (
            <div key={t.id} style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`,
              borderRadius: 12, padding: "14px 18px", display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 20, height: 20, borderRadius: 6,
                border: t.status === "DONE" ? "none" : `2px solid ${COLORS.borderLight}`,
                background: t.status === "DONE" ? COLORS.green : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {t.status === "DONE" && <span style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>&#10003;</span>}
              </div>
              <div style={{ width: 4, height: 28, borderRadius: 2, background: c?.color, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: COLORS.text,
                  textDecoration: t.status === "DONE" ? "line-through" : "none",
                  opacity: t.status === "DONE" ? 0.6 : 1 }}>{t.title}</div>
                <div style={{ fontSize: 11, color: COLORS.textDim, marginTop: 2 }}>{c?.name}</div>
              </div>
              <div style={{ fontSize: 10, padding: "3px 8px", borderRadius: 5,
                background: priorityBg(t.priority), color: priorityColor(t.priority),
                fontWeight: 700, flexShrink: 0 }}>{t.priority}</div>
              <div style={{ fontSize: 10, padding: "3px 8px", borderRadius: 5,
                background: t.status === "DONE" ? COLORS.greenDim : t.status === "IN_PROGRESS" ? COLORS.accentDim : "rgba(140,137,148,0.08)",
                color: statusColor(t.status), fontWeight: 600, flexShrink: 0, minWidth: 72, textAlign: "center" }}>
                {t.status === "IN_PROGRESS" ? "In progress" : t.status === "DONE" ? "Done" : "To do"}
              </div>
              <div style={{ fontSize: 12, color: COLORS.textMuted, minWidth: 50, textAlign: "right", flexShrink: 0 }}>
                {t.deadline.slice(5)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TimerPage() {
  const [selectedTask, setSelectedTask] = useState(1);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [mode, setMode] = useState("work");
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running && timeLeft > 0) {
      intervalRef.current = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running, timeLeft]);

  const totalSec = mode === "work" ? 25 * 60 : 5 * 60;
  const progress = ((totalSec - timeLeft) / totalSec) * 100;
  const mm = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const ss = String(timeLeft % 60).padStart(2, "0");

  const reset = () => { setRunning(false); setTimeLeft(mode === "work" ? 25 * 60 : 5 * 60); };
  const switchMode = (m) => { setMode(m); setRunning(false); setTimeLeft(m === "work" ? 25 * 60 : 5 * 60); };
  const activeTasks = TASKS.filter((t) => t.status !== "DONE");

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1 style={{ fontSize: 26, fontWeight: 700, color: COLORS.text, margin: "0 0 6px",
        fontFamily: "'DM Sans', sans-serif", alignSelf: "flex-start" }}>Study timer</h1>
      <p style={{ color: COLORS.textMuted, fontSize: 14, margin: "0 0 30px", alignSelf: "flex-start" }}>
        Pomodoro technique — 25 min focus, 5 min break
      </p>

      <div style={{ display: "flex", gap: 6, marginBottom: 32 }}>
        {["work", "break"].map((m) => (
          <button key={m} onClick={() => switchMode(m)}
            style={{ padding: "7px 20px", borderRadius: 8, border: "none", fontSize: 13, fontWeight: 600,
              cursor: "pointer",
              background: mode === m ? COLORS.accentDim : "transparent",
              color: mode === m ? COLORS.accent : COLORS.textMuted }}>
            {m === "work" ? "Focus" : "Break"}
          </button>
        ))}
      </div>

      <div style={{ position: "relative", width: 240, height: 240, marginBottom: 30 }}>
        <svg width="240" height="240" viewBox="0 0 240 240">
          <circle cx="120" cy="120" r="108" fill="none" stroke={COLORS.border} strokeWidth="6" />
          <circle cx="120" cy="120" r="108" fill="none"
            stroke={mode === "work" ? COLORS.accent : COLORS.green}
            strokeWidth="6" strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 108}`}
            strokeDashoffset={`${2 * Math.PI * 108 * (1 - progress / 100)}`}
            transform="rotate(-90 120 120)"
            style={{ transition: "stroke-dashoffset 0.5s" }} />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontSize: 52, fontWeight: 700, color: COLORS.text, fontFamily: "'DM Sans', sans-serif",
            letterSpacing: "-2px" }}>{mm}:{ss}</div>
          <div style={{ fontSize: 12, color: COLORS.textDim, textTransform: "uppercase", letterSpacing: "1px" }}>
            {mode === "work" ? "Focus time" : "Break time"}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 14, marginBottom: 32 }}>
        <button onClick={() => setRunning(!running)}
          style={{ width: 52, height: 52, borderRadius: 14, border: "none",
            background: running ? COLORS.amberDim : COLORS.accentDim,
            color: running ? COLORS.amber : COLORS.accent, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon name={running ? "pause" : "play"} size={22} />
        </button>
        <button onClick={reset}
          style={{ width: 52, height: 52, borderRadius: 14, border: `1px solid ${COLORS.border}`,
            background: "transparent", color: COLORS.textMuted, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon name="reset" size={20} />
        </button>
      </div>

      <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 12,
        padding: 16, width: "100%", maxWidth: 360 }}>
        <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 8, fontWeight: 500 }}>Studying for:</div>
        <select value={selectedTask} onChange={(e) => setSelectedTask(Number(e.target.value))}
          style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: `1px solid ${COLORS.border}`,
            background: COLORS.bg, color: COLORS.text, fontSize: 13 }}>
          {activeTasks.map((t) => (
            <option key={t.id} value={t.id}>{t.title} — {getCourse(t.courseId)?.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

function SchedulePage() {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const hours = Array.from({ length: 10 }, (_, i) => i + 8);

  const getSlot = (day, hour) => {
    return SCHEDULE.find((s) => {
      const startH = parseInt(s.start.split(":")[0]);
      const endH = parseInt(s.end.split(":")[0]);
      return s.day === day && hour >= startH && hour < endH;
    });
  };
  const isStart = (day, hour) => {
    return SCHEDULE.find((s) => {
      const startH = parseInt(s.start.split(":")[0]);
      return s.day === day && hour === startH;
    });
  };
  const getSpan = (slot) => {
    const startH = parseInt(slot.start.split(":")[0]);
    const endH = parseInt(slot.end.split(":")[0]);
    return endH - startH;
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: COLORS.text, margin: 0,
            fontFamily: "'DM Sans', sans-serif" }}>Schedule</h1>
          <p style={{ color: COLORS.textMuted, fontSize: 14, margin: "4px 0 0" }}>Spring 2026 — weekly timetable</p>
        </div>
        <button style={{ padding: "8px 18px", background: COLORS.accent, color: "#fff", border: "none",
          borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>+ Add slot</button>
      </div>

      <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 14,
        overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "60px repeat(5, 1fr)" }}>
          <div style={{ padding: 10, background: COLORS.surface, borderBottom: `1px solid ${COLORS.border}` }} />
          {days.map((d) => (
            <div key={d} style={{ padding: "10px 0", textAlign: "center", fontSize: 12, fontWeight: 600,
              color: COLORS.textMuted, borderBottom: `1px solid ${COLORS.border}`,
              borderLeft: `1px solid ${COLORS.border}`, textTransform: "uppercase", letterSpacing: "0.5px" }}>
              {d.slice(0, 3)}
            </div>
          ))}

          {hours.map((h) => (
            <React.Fragment key={h}>
              <div style={{ padding: "0 8px", fontSize: 11, color: COLORS.textDim, height: 56,
                display: "flex", alignItems: "flex-start", justifyContent: "flex-end", paddingTop: 4,
                borderBottom: `1px solid ${COLORS.border}` }}>
                {String(h).padStart(2, "0")}:00
              </div>
              {days.map((d) => {
                const slot = getSlot(d, h);
                const start = isStart(d, h);
                const c = slot ? getCourse(slot.courseId) : null;

                if (slot && !start) {
                  return <div key={d} style={{ borderLeft: `1px solid ${COLORS.border}`,
                    borderBottom: `1px solid ${COLORS.border}` }} />;
                }

                return (
                  <div key={d} style={{ borderLeft: `1px solid ${COLORS.border}`,
                    borderBottom: `1px solid ${COLORS.border}`, padding: 3, height: 56,
                    position: "relative" }}>
                    {start && (
                      <div style={{ background: `${c.color}18`, border: `1px solid ${c.color}40`,
                        borderRadius: 8, padding: "5px 8px", height: `${getSpan(slot) * 56 - 6}px`,
                        position: "absolute", left: 3, right: 3, top: 3, zIndex: 1, overflow: "hidden" }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: c.color }}>{c.name}</div>
                        <div style={{ fontSize: 10, color: COLORS.textMuted, marginTop: 1 }}>
                          {slot.start}-{slot.end}
                        </div>
                        <div style={{ fontSize: 10, color: COLORS.textDim }}>{slot.location}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [loggedIn, setLoggedIn] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  if (!loggedIn) {
    return (
      <div style={{ background: COLORS.bg, minHeight: "100vh", display: "flex", alignItems: "center",
        justifyContent: "center", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 20,
          padding: 36, width: 360 }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.accent, marginBottom: 4,
            letterSpacing: "-0.5px" }}>StudyPlanner</div>
          <div style={{ fontSize: 13, color: COLORS.textMuted, marginBottom: 28 }}>
            {isRegister ? "Create your account" : "Sign in to continue"}
          </div>
          {isRegister && (
            <input placeholder="Email" style={{ width: "100%", padding: "10px 14px", borderRadius: 10,
              border: `1px solid ${COLORS.border}`, background: COLORS.bg, color: COLORS.text,
              fontSize: 13, marginBottom: 10, boxSizing: "border-box" }} />
          )}
          <input placeholder="Username" style={{ width: "100%", padding: "10px 14px", borderRadius: 10,
            border: `1px solid ${COLORS.border}`, background: COLORS.bg, color: COLORS.text,
            fontSize: 13, marginBottom: 10, boxSizing: "border-box" }} />
          <input type="password" placeholder="Password" style={{ width: "100%", padding: "10px 14px",
            borderRadius: 10, border: `1px solid ${COLORS.border}`, background: COLORS.bg,
            color: COLORS.text, fontSize: 13, marginBottom: 18, boxSizing: "border-box" }} />
          <button onClick={() => setLoggedIn(true)}
            style={{ width: "100%", padding: "11px 0", background: COLORS.accent, color: "#fff",
              border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
            {isRegister ? "Register" : "Login"}
          </button>
          <div style={{ textAlign: "center", marginTop: 14, fontSize: 12, color: COLORS.textMuted }}>
            {isRegister ? "Already have an account? " : "Don't have an account? "}
            <span onClick={() => setIsRegister(!isRegister)}
              style={{ color: COLORS.accent, cursor: "pointer", fontWeight: 600 }}>
              {isRegister ? "Login" : "Register"}
            </span>
          </div>
        </div>
      </div>
    );
  }

  const pages = { dashboard: Dashboard, courses: CoursesPage, tasks: TasksPage, timer: TimerPage, schedule: SchedulePage };
  const PageComponent = pages[page];

  return (
    <div style={{ display: "flex", height: "100vh", background: COLORS.bg,
      fontFamily: "'DM Sans', system-ui, sans-serif", color: COLORS.text }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <Sidebar page={page} setPage={setPage} />
      <div style={{ flex: 1, overflow: "auto", padding: 32 }}>
        <PageComponent />
      </div>
    </div>
  );
}
