import axios from "axios";

const API_URL = "http://localhost:5000/messages";

export const getMessages = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getMessageById = async (id) => {
  const response = await axios.get(`${API_URL}/${String(id)}`);
  return response.data;
};

// Gửi tin nhắn mới với ID tăng dần
export const sendMessage = async (messageData) => {
  const response = await axios.get(API_URL);
  const messages = response.data;

  // Tạo id mới (dạng string)
  const nextId =
    messages.length > 0
      ? (
        Math.max(...messages.map((m) => Number(m.id) || 0)) + 1
      ).toString()
      : "1";

  const newMessage = { id: nextId, ...messageData };
  const res = await axios.post(API_URL, newMessage);
  return res.data;
};
export const deleteMessage = async (id) => {
  const response = await axios.delete(`${API_URL}/${String(id)}`);
  return response.data;
};
export const updateMessageStatus = async (id, newStatus) => {
  const response = await axios.patch(`${API_URL}/${String(id)}`, {
    status: newStatus,
  });
  return response.data;
};
