import { useEffect, useState } from "react";
import { getReviewsByEvent } from "../api/reviewBoxApi";
import "../css/reviewbox.css";

export default function ReviewBox({ eventId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await getReviewsByEvent(eventId);
      setReviews(data || []);
    };
    load();
  }, [eventId]);

  if (!reviews.length) return <p className="text">Chưa có đánh giá nào.</p>;

  const avgRating = 
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  // Tỷ lệ sao
  const starCount = [1,2,3,4,5].map(star => ({
    star,
    percent: Math.round(
      (reviews.filter(r => Math.round(r.rating) === star).length / reviews.length) * 100
    )
  })).reverse(); // Đảo để hiện 5 → 1

  // Render sao không nửa
  const renderStars = (rating) => {
    const full = Math.round(rating);
    return (
      <>
        {[...Array(full)].map((_, i) => (
          <i key={i} className="bi bi-star-fill text-warning"></i>
        ))}
        {[...Array(5-full)].map((_, i) => (
          <i key={i} className="bi bi-star text"></i>
        ))}
      </>
    );
  };

  return (
    <div className="review-box-container">

      {/* Tổng rating */}
      <div className="summary-box">
        <h1 className="avg-rating">{avgRating.toFixed(1)}</h1>
        <div>{renderStars(avgRating)}</div>
        <p className="total-reviews">{reviews.length} đánh giá</p>
      </div>

      {/* Thanh tỷ lệ sao */}
      <div className="rating-bars">
        {starCount.map((s, i) => (
          <div key={i} className="rating-row">
            <span>{s.star} <i className="bi bi-star-fill text-warning"></i></span>
            <div className="bar">
              <div className="bar-fill" style={{width: `${s.percent}%`}}></div>
            </div>
            <span className="percent">{s.percent}%</span>
          </div>
        ))}
      </div>

      <hr />

      {/* Danh sách review */}
      {reviews.map(r => (
        <div key={r.id} className="review-item">
          <h6 className="fw-bold">{r.email}</h6>
          <div>{renderStars(r.rating)}</div>
          <p>{r.comment}</p>
          <small className="text">
            {new Date(r.date).toLocaleDateString("vi-VN")}
          </small>
        </div>
      ))}

    </div>
  );
}
