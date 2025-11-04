import React, { useState } from "react";

const EventFilter = ({ onFilterChange }) => {
  const [selected, setSelected] = useState([]);

  const toggleCategory = (key) => {
    let updated;
    if (selected.includes(key)) {
      updated = selected.filter((k) => k !== key);
    } else {
      updated = [...selected, key];
    }
    setSelected(updated);
    onFilterChange(updated);
  };

  const clearAll = () => {
    setSelected([]);
    onFilterChange([]);
  };

  const removeTag = (key) => {
    const updated = selected.filter((k) => k !== key);
    setSelected(updated);
    onFilterChange(updated);
  };

  const categories = [
    { key: "nhac-song", label: "Nhạc sống" },
    { key: "nghe-thuat", label: "Sân khấu & Nghệ thuật" },
    { key: "the-thao", label: "Thể thao" },
    { key: "khac", label: "Khác" },
  ];

  return (
    <div className="filter-container">
      {/* ✅ Dòng 1: Nút Lọc + tag được chọn */}
      <div className="filter-top-row">
        <button className="filter-icon">
          Bộ lọc
        </button>

        {selected.map((key) => (
          <span key={key} className="tag" onClick={() => removeTag(key)}>
            {categories.find((c) => c.key === key)?.label} ✕
          </span>
        ))}

        {selected.length > 0 && (
          <button className="clear-btn" onClick={clearAll}>
            Thiêt Lập lại
          </button>
        )}
      </div>

      {/* ✅ Dòng 2: Các nút category */}
      <div className="filter-buttons">
        {categories.map((c) => (
          <button
            key={c.key}
            className={`filter-btn ${
              selected.includes(c.key) ? "active" : ""
            }`}
            onClick={() => toggleCategory(c.key)}
          >
            {c.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EventFilter;
