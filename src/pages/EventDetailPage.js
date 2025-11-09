import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../css/eventDetail.css";
import IntroCard from "../components/IntroCard"
import ReviewBox from "../components/ReviewBox";
import ReviewForm from "../components/ReviewForm";
const EventDetailPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/events/${id}`)
      .then((res) => res.json())
      .then((data) => setEvent(data))
      .catch((err) => console.error("Error:", err));
  }, [id]);

  if (!event) return <p className="loading">Đang tải...</p>;

  return (
    <div className="event-detail">
      <div className="event-header">
        {/* Ảnh bên trái */}
        <div className="event-media">
          <img src={`/${event.image}`} alt={event.title} className="event-img" />
        </div>

        {/* Panel bên phải */}
        <aside className="event-info-box">
          {/* TOP: Title + Category */}
          <div className="info-top">
            <h1 className="eventdetail-title">{event.title}</h1>
            <div className="event-meta">
              <span className="meta-icon" aria-hidden>
                Thể Loại:
              </span>
              <span className="meta-text">{event.category}</span>
            </div>
          </div>

          {/* LINE TRẮNG TO */}
          <hr className="price-divider" />

          {/* BOTTOM: Price */}
          <div className="info-bottom">
            <div className="event-price-row">
              <span className="price-label">Phí Tham Gia</span>
              <span className="price-value">
                {(event.price || 0).toLocaleString("vi-VN")} đ
              </span>
              <span className="price-chevron" aria-hidden>
                ›
              </span>
            </div>
          </div>
        </aside>
      </div>

      <div className="container mt-5">
        <div className="row gx-4">
          <div className="col-lg-8">
            <IntroCard title={event.title} description={event.description} />
          </div>
        </div>

        {/*Form với Box review đây nè*/}
        <div className="row gx-4 mt-5 mb-3">
          <div className="col-lg-8">
            <ReviewBox eventId={id} />
          </div>
          <div className="col-lg-4">
            <ReviewForm eventId={id} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default EventDetailPage;
