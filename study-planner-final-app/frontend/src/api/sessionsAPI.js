import api from "./axios";

export const getSessions = (params = {}) => api.get("/sessions", { params });
export const logSession = (payload) => api.post("/sessions", payload);
export const getSessionStats = () => api.get("/sessions/stats");