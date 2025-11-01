// src/api/eventsApi.js
export const fetchEvents = (category) => {
  return fetch('http://localhost:5000/events')  // Lấy sự kiện từ API mock của json-server
    .then(response => response.json())
    .then(data => {
      if (category === 'Tất cả') {
        return data;  // Trả về tất cả sự kiện nếu không có bộ lọc
      }
      return data.filter(event => event.category === category);  // Lọc sự kiện theo category
    });
};
