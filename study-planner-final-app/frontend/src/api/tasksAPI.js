import api from "./axios";

export const getTasks = (params = {}) => api.get("/tasks", { params });
export const createTask = (payload) => api.post("/tasks", payload);
export const updateTask = (id, payload) => api.put(`/tasks/${id}`, payload);
export const deleteTaskApi = (id) => api.delete(`/tasks/${id}`);