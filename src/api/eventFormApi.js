import api from "./apiClient";

const eventFormApi = {
  getAll: () => api.get("/events"),
  create: (data) => api.post("/events", data),
  update: (id, data) => api.put(`/books/${id}`, data)
};

export default eventFormApi;