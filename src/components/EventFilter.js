import { useState, useEffect } from "react";
import "../css/home.css";

const categories = [
  { key: "nhac-song", label: "Nhạc sống" },
  { key: "nghe-thuat", label: "Sân khấu & Nghệ thuật" },
  { key: "the-thao", label: "Thể thao" },
  { key: "khac", label: "Khác" },
];

const EventFilter = ({ onFilterChange }) => {
  const [selected, setSelected] = useState([]);

  const toggleCategory = (key) => {
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const clearAll = () => setSelected([]);

  useEffect(() => {
    onFilterChange(selected);
  }, [selected, onFilterChange]);

  return (
    <div className="filter-container">
      <div className="filter-buttons">
        <button className="filter-icon">🔍 Lọc</button>
        {categories.map((c) => (
          <button
            key={c.key}
            className={`filter-btn ${selected.includes(c.key) ? "active" : ""}`}
            onClick={() => toggleCategory(c.key)}
          >
            {c.label}
          </button>
        ))}
        {selected.length > 0 && (
          <button className="clear-btn" onClick={clearAll}>
            Xóa tất cả
          </button>
        )}
      </div>

      {selected.length > 0 && (
        <div className="selected-tags">
          {selected.map((key) => {
            const label = categories.find((c) => c.key === key)?.label;
            return (
              <span key={key} className="tag">
                {label} ✕
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EventFilter;
