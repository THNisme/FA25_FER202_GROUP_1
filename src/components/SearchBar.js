import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import EventCard from "./EventCard";
import EventFilter from "./EventFilter";
import "../css/home.css";

// Hàm bỏ dấu tiếng Việt
const strip = (s) =>
  (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const SearchBar = () => {
  const location = useLocation();
  const qRaw = new URLSearchParams(location.search).get("query") || "";
  const q = qRaw.trim();

  const [events, setEvents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCats, setSelectedCats] = useState([]); // ✅ Dùng state thay vì ref

  // ✅ Gộp logic search + filter
  const applyFilterAndSearch = (data, query, selected) => {
    let result = [...data];

    if (query) {
      const k = strip(query);
      result = result.filter((e) =>
        [e.title, e.category, e.description].some((v) =>
          strip(v).includes(k)
        )
      );
    }

    if (selected.length > 0) {
      result = result.filter((ev) =>
        selected.some((catKey) => {
          const category = ev.category?.toLowerCase() || "";
          if (catKey === "nhac-song") return category.includes("nhạc sống");
          if (catKey === "nghe-thuat") return category.includes("nghệ thuật");
          if (catKey === "the-thao") return category.includes("thể thao");
          if (catKey === "khac")
            return (
              !category.includes("nhạc sống") &&
              !category.includes("nghệ thuật") &&
              !category.includes("thể thao")
            );
          return false;
        })
      );
    }

    return result;
  };

  // ✅ Fetch dữ liệu mỗi khi query hoặc category thay đổi
  useEffect(() => {
    const base = "http://localhost:5000/events";
    setLoading(true);

    fetch(base)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => {
        const result = applyFilterAndSearch(data || [], q, selectedCats);
        setEvents(data || []);
        setFiltered(result);
      })
      .catch((err) => {
        console.error("Search fetch error:", err);
        setEvents([]);
        setFiltered([]);
      })
      .finally(() => setLoading(false));
  }, [q, selectedCats]); // ✅ thêm selectedCats để khi filter thay đổi thì re-run

  // ✅ Khi user thay đổi filter
  const handleFilterChange = (selected) => {
    setSelectedCats(selected);
  };

  return (
    <div className="home-container">
      <div className="content-wrap">
        <div
          className="header-row"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>{q ? `Kết quả tìm kiếm cho: “${q}”` : "Tất cả sự kiện"}</h2>
          <div style={{ marginRight: "10px" }}>
            <EventFilter onFilterChange={handleFilterChange} />
          </div>
        </div>

        {loading && <p>Đang tải...</p>}

        {!loading && filtered.length === 0 && (
          <p>Không tìm thấy sự kiện nào.</p>
        )}

        {!loading && filtered.length > 0 && <EventCard events={filtered} />}
      </div>
    </div>
  );
};

export default SearchBar;
