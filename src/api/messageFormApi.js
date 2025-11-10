import axios from "axios";

// Endpoints
const API_URL = "http://localhost:5000/messages"; // user messages
const ADMIN_API_URL = "http://localhost:5000/adminmessages"; // admin messages

/**
 * ========================
 * User Messages API
 * ========================
 */

/**
 * Lấy thông tin tin nhắn user theo ID
 * @param {string|number} id
 * @returns {Promise<Object>}
 */
export const getMessageById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

/**
 * Cập nhật tin nhắn user
 * @param {string|number} id
 * @param {Object} updatedData
 * @returns {Promise<Object>}
 */
export const updateMessage = async (id, updatedData) => {
  const res = await axios.put(`${API_URL}/${id}`, updatedData);
  return res.data;
};

/**
 * ========================
 * Admin Messages API
 * ========================
 */

/**
 * Lấy tin nhắn admin theo ID
 * @param {string|number} id
 * @returns {Promise<Object>}
 */
export const getAdminMessageById = async (id) => {
  const res = await axios.get(`${ADMIN_API_URL}/${Number(id)}`);
  return res.data;
};




/**
 * Cập nhật tin nhắn admin
 * @param {string|number} id
 * @param {Object} data - dữ liệu cần cập nhật (VD: { content: "Nội dung mới" })
 * @returns {Promise<Object>} - dữ liệu sau khi cập nhật
 */
export const updateAdminMessage = async (id, data) => {
  const res = await axios.patch(
    `http://localhost:5000/adminmessages/${String(id)}`, // ép kiểu khi gửi request
    { ...data, id: String(id) } // ép kiểu trong dữ liệu
  );
  return res.data;
};


/**
 * Gửi tin nhắn trả lời (reply) lưu vào adminmessages
 * @param {Object} messageData - { to: string[], content: string, originalMessageId: string|number, receiverName: string }
 * @returns {Promise<Object>} tin nhắn mới được tạo
 */
export const sendReplyMessage = async (messageData) => {
  // Lấy danh sách adminmessages hiện tại để tính ID mới
  const res = await axios.get(ADMIN_API_URL);
  const messages = res.data;

  const nextId =
    messages.length > 0
      ? Math.max(...messages.map((m) => Number(m.id) || 0)) + 1
      : 1;

  // Phân loại email và số điện thoại trong mảng `to`
  const email =
    messageData.to.find((t) => typeof t === "string" && t.includes("@")) || "";
  const phone =
    messageData.to.find((t) => typeof t === "string" && !t.includes("@")) || "";

  // Tạo bản ghi mới
  const newMessage = {
    id: nextId,
    receiverName: messageData.receiverName || "Người nhận",
    receiverEmail: email,
    receiverPhone: phone,
    content: messageData.content,
    originalMessageId: messageData.originalMessageId,
    status: "unread",
    createdAt: new Date().toISOString(),
  };

  // Lưu vào adminmessages
  const response = await axios.post(ADMIN_API_URL, newMessage);
  return response.data;
};
