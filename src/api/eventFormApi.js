import api from "./apiClient";

const eventFormApi = {
  getAll: () => api.get("/events"),
  getById: (id) => api.get(`/events/${id}`),
  create: (data) => api.post("/events", data),
  update: (id, data) => api.put(`/events/${id}`, data)
};

export default eventFormApi;