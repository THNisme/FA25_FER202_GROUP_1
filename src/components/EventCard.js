// src/components/EventCard.js
import React from 'react';

function EventCard({ events }) {
  return (
      <div className="events-grid">
      {events.map((event) => (
        <div key={event.id} className="event-card">
          {/* Event Image */}
          <div className="event-image-container">
            <img 
              src={event.image}
              alt={event.title}
              className="event-image"
            />
          </div>

          {/* Event Info */}
          <div className="event-info">
            <h3 className="event-title">
              {event.title}
            </h3>
            <p className="event-price">
              Từ {event.price}
            </p>
            <p className="event-category">
              Thể Loại: {event.category}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default EventCard;
