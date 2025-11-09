// src/components/EventCard.js
import React from 'react';
import { Link } from "react-router-dom";
function EventCard({ events }) {
  return (
    <div className="events-grid">
      {events.map((event) => (
        <Link
          key={event.id}
          to={`/event/${event.id}`} // ✅ điều hướng đến trang chi tiết
          className="event-card"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className="event-image-container">
            <img
              src={event.image}
              alt={event.title}
              className="event-image"
            />
          </div>

          <div className="event-info">
            <h3 className="event-title">{event.title}</h3>
            <p className="event-price">Phí tham gia từ {(event.price || 0).toLocaleString("vi-VN")} ₫</p>
            <p className="event-category">Thể Loại: {event.category}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default EventCard;
