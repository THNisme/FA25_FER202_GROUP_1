import axiosClient from "./axiosClient";

const api = {
  get: (url, params) => axiosClient.get(url, { params }),
  post: (url, data) => axiosClient.post(url, data),
  put: (url, data) => axiosClient.put(url, data),
  delete: (url) => axiosClient.delete(url),
};

export default api;
