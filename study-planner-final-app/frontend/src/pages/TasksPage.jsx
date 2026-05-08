import React, { useMemo, useState } from "react";
import { usePlanner } from "../context/PlannerContext";
import TaskStats from "../components/tasks/TaskStats";
import TaskFilters from "../components/tasks/TaskFilters";
import TaskList from "../components/tasks/TaskList";
import AddTaskModal from "../components/tasks/AddTaskModal";
import ConfirmModal from "../components/ui/ConfirmModal";
import "../styles/task.css";
import "../styles/confirmModal.css";

function TasksPage() {
    // Φέραμε και το updateTask από το Context
    const { tasks, addTask, updateTask, deleteTask, loading, error } = usePlanner();

    const [activeFilter, setActiveFilter] = useState("All");
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Νέο state για το Edit
    const [editingTask, setEditingTask] = useState(null);
    const [taskToDelete, setTaskToDelete] = useState(null);

    const filteredTasks = useMemo(() => {
        if (activeFilter === "All") return tasks;
        return tasks.filter((task) => task.status === activeFilter);
    }, [tasks, activeFilter]);

    // Συνάρτηση για άνοιγμα σαν Add (κενό Modal)
    const handleOpenAddModal = () => {
        setEditingTask(null);
        setIsModalOpen(true);
    };

    // Συνάρτηση για άνοιγμα σαν Edit (γεμάτο Modal)
    const handleOpenEditModal = (task) => {
        setEditingTask(task);
        setIsModalOpen(true);
    };

    // Διαχωρισμός Save σε Add ή Update
    const handleSaveTask = async (data) => {
        if (editingTask) {
            await updateTask(editingTask.id, data);
        } else {
            await addTask(data);
        }
        setIsModalOpen(false);
    };

    const handleAskDeleteTask = (taskId) => {
        setTaskToDelete(taskId);
    };

    const handleConfirmDeleteTask = async () => {
        if (!taskToDelete) return;

        await deleteTask(taskToDelete);
        setTaskToDelete(null);
    };

    const handleCloseDeleteModal = () => {
        setTaskToDelete(null);
    };

    if (loading) {
        return (
            <div className="tasks-page">
                <h2>Loading tasks...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="tasks-page">
                <h2>{error}</h2>
            </div>
        );
    }

    return (
        <div className="tasks-page">
            <div className="tasks-header">
                <div>
                    <h1>Tasks</h1>
                    <p>Manage your deadlines, priorities and study workflow.</p>
                </div>

                <button className="primary-btn" onClick={handleOpenAddModal}>
                    + Add Task
                </button>
            </div>

            <TaskStats tasks={tasks} />

            <div className="tasks-content-card">
                <div className="tasks-content-top">
                    <h2>Task List</h2>
                    <TaskFilters
                        activeFilter={activeFilter}
                        setActiveFilter={setActiveFilter}
                    />
                </div>

                <TaskList
                    tasks={filteredTasks}
                    onDeleteTask={handleAskDeleteTask}
                    onEditTask={handleOpenEditModal} // Προστέθηκε το prop onEditTask
                />
            </div>

            <AddTaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveTask}
                initialData={editingTask} // Περνάμε το task που κάνουμε edit
            />

            <ConfirmModal
                isOpen={!!taskToDelete}
                title="Delete task"
                message="Are you sure you want to delete this task? This action cannot be undone."
                confirmText="Delete Task"
                cancelText="Cancel"
                onConfirm={handleConfirmDeleteTask}
                onClose={handleCloseDeleteModal}
            />
        </div>
    );
}

export default TasksPage;