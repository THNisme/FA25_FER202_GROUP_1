// src/components/SearchBar.js
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import EventCard from "./EventCard";
import "../css/home.css";

const strip = (s) =>
  (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // bỏ dấu tiếng Việt

const SearchBar = () => {
  const location = useLocation();
  const qRaw = new URLSearchParams(location.search).get("query") || "";
  const q = qRaw.trim();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const base = "http://localhost:5000/events";
    const url = q ? `${base}?q=${encodeURIComponent(q)}` : base;

    setLoading(true);
    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => {
        // Fallback lọc phía client để hỗ trợ cả gõ không dấu/khác dấu
        if (!q) return setEvents(data || []);
        const k = strip(q);
        const filtered = (data || []).filter((e) =>
          [e.title, e.category, e.description].some((v) => strip(v).includes(k))
        );
        setEvents(filtered);
      })
      .catch((err) => {
        console.error("Search fetch error:", err);
        setEvents([]); // tránh treo UI
      })
      .finally(() => setLoading(false));
  }, [q]);

  return (
    <div className="home-container">
      <div className="content-wrap">
        <h2>{q ? `Kết quả tìm kiếm cho: “${q}”` : "Tất cả sự kiện"}</h2>
        {loading && <p>Đang tải...</p>}
        {!loading && <EventCard events={events} />}
      </div>
    </div>
  );
};

export default SearchBar;
