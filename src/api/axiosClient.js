// src/api/axiosClient.js
import axios from "axios";

/**
 * Cấu hình axios client chung.
 * - Đọc baseURL từ env (fallback sang localhost)
 * - Thêm interceptor để gắn Authorization token (nếu có)
 * - Xử lý lỗi cơ bản
 */

// Thay bằng biến môi trường nếu có (vite: import.meta.env.VITE_API_URL)

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // thời gian chờ mặc định (tuỳ em)
  timeout: 10000,
});

/**
 * Helper để set token (call khi login thành công)
 * Ex: setAuthToken("Bearer xxxxxx")
 */
export function setAuthToken(token) {
  if (token) {
    axiosClient.defaults.headers.common["Authorization"] = token;
  } else {
    delete axiosClient.defaults.headers.common["Authorization"];
  }
}

/**
 * Request interceptor (nếu cần gắn token tự động từ localStorage)
 * Bật phần này nếu em lưu token ở localStorage.
 */
axiosClient.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem("accessToken"); // hoặc key khác tuỳ em
      if (token && !config.headers.Authorization) {
        config.headers.Authorization = token.startsWith("Bearer") ? token : `Bearer ${token}`;
      }
    } catch (e) {
      // ignore
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response interceptor để xử lý lỗi chung
 */
axiosClient.interceptors.response.use(
  (response) => {
    // json-server trả về data trực tiếp, axios trả response.data
    return response.data !== undefined ? response.data : response;
  },
  (error) => {
    // em có thể tuỳ chỉnh: log, show toast, redirect khi 401, ...
    const status = error?.response?.status;
    if (status === 401) {
      // ví dụ: nếu unauthorized -> xoá token và reload
      localStorage.removeItem("accessToken");
      // window.location.href = "/login"; // tuỳ em muốn redirect hay không
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
