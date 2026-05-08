import api from "./axios"

export const getCourses = () =>api.get("/courses");
export const createCourse= (payload) => api.post("/courses", payload);
export const updateCourse = (id, payload) => api.put(`/courses/${id}`, payload);
export const deleteCourseApi = (id) => api.delete(`/courses/${id}`);