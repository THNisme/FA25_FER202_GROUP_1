// src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import EventFilter from '../components/EventFilter';
import EventCard from '../components/EventCard';
import { fetchEvents } from '../api/eventsApi';

function HomePage() {
  const [events, setEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');

  useEffect(() => {
    document.body.style.backgroundColor = "#000";
    return () => {
      document.body.style.backgroundColor = ""; // reset khi rời trang
    };
  }, []);

  useEffect(() => {
    const getEvents = async () => {
      const eventsData = await fetchEvents(selectedCategory);
      setEvents(eventsData);
    };

    getEvents();
  }, [selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="container">
      <EventCard events={events} />
    </div>

  );
}

export default HomePage;
