// src/api/loginAPI.js

const BASE_URL = "http://localhost:5000/admins";

/**
 * 🧩 Hàm đăng nhập admin (giả lập với JSON Server)
 * - Kiểm tra username/password có trùng trong db.json không
 * - Không ném lỗi ra ngoài (tránh crash UI)
 * - Trả về object admin nếu đúng, null nếu sai
 */
export const loginAdmin = async (username, password) => {
  try {
    // 1️⃣ Kiểm tra hợp lệ đầu vào
    if (!username || !password) {
      console.warn("Thiếu tên đăng nhập hoặc mật khẩu");
      return null;
    }

    // 2️⃣ Gọi API JSON Server
    const res = await fetch(BASE_URL);

    if (!res.ok) {
      console.error("Không thể kết nối đến server:", res.status);
      return null;
    }

    const admins = await res.json();

    // 3️⃣ Kiểm tra username/password
    const found = admins.find(
      (admin) =>
        admin.username?.toLowerCase() === username.toLowerCase() &&
        admin.password === password
    );

    // 4️⃣ Trả về kết quả
    if (found) {
      // Lưu vào localStorage để giữ phiên (tùy chọn)
      localStorage.setItem("admin", JSON.stringify(found));
      return found;
    }

    console.warn("Sai tên đăng nhập hoặc mật khẩu");
    return null;
  } catch (error) {
    console.error("Lỗi đăng nhập:", error);
    return null;
  }
};

/**
 * 🧠 Kiểm tra xem có admin đang đăng nhập hay không
 */
export const getLoggedInAdmin = () => {
  try {
    const data = localStorage.getItem("admin");
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

