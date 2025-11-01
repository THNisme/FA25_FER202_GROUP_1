// src/components/EventFilter.js
import React from 'react';

function EventFilter({ onCategoryChange }) {
  const categories = ['Tất cả', 'Mùa Đông', 'Workshop', 'Lễ hội'];

  return (
    <div>
      <button onClick={() => onCategoryChange('Tất cả')}>Tất cả</button>
      {categories.slice(1).map((category, index) => (
        <button key={index} onClick={() => onCategoryChange(category)}>{category}</button>
      ))}
    </div>
  );
}

export default EventFilter;
