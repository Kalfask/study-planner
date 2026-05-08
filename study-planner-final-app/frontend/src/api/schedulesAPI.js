import api from "./axios";

export const getSchedules = () => api.get("/schedules");
export const createSchedule = (payload) => api.post("/schedules", payload);
export const activateSchedule = (id) => api.put(`/schedules/${id}/activate`);
export const deleteScheduleApi = (id) => api.delete(`/schedules/${id}`);

export const getScheduleSlots = (scheduleId) =>
    api.get(`/schedules/${scheduleId}/slots`);

export const addScheduleSlot = (scheduleId, payload) =>
    api.post(`/schedules/${scheduleId}/slots`, payload);

export const deleteScheduleSlot = (scheduleId, slotId) =>
    api.delete(`/schedules/${scheduleId}/slots/${slotId}`);