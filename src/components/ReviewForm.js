import React, { useState } from "react";
import { addReviewToEvent } from "../api/reviewFormApi";
import { Form, Button, Alert } from "react-bootstrap";

const ReviewBox = ({ eventId }) => {
  const [formData, setFormData] = useState({
    email: "",
    rating: 0,
    comment: "",
  });
  const [alert, setAlert] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRating = (value) => {
    setFormData({ ...formData, rating: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, rating, comment } = formData;

    if (!email.trim() || !rating || !comment.trim()) {
      setAlert({ type: "danger", message: "Vui lòng điền đầy đủ thông tin!" });
      return;
    }

    try {
      await addReviewToEvent(eventId, {
        email,
        rating: parseFloat(rating),
        comment,
      });
      setAlert({ type: "success", message: "🎉 Cảm ơn bạn đã gửi đánh giá!" });
      setFormData({ email: "", rating: 0, comment: "" });
    } catch (error) {
      console.error(error);
      setAlert({ type: "danger", message: "Không thể gửi đánh giá!" });
    }
  };

  return (
    <div className="review-box p-4 bg-light rounded shadow-sm mt-5">
      <h3 className="mb-3 text-success">Đánh giá sự kiện</h3>

      {alert && (
        <Alert
          variant={alert.type}
          onClose={() => setAlert(null)}
          dismissible
          className="mb-3"
        >
          {alert.message}
        </Alert>
      )}

      <Form onSubmit={handleSubmit} className="mb-4 text-dark">
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Nhập email của bạn"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Chọn đánh giá</Form.Label>
          <div className="rating-stars d-flex align-items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => handleRating(star)}
                style={{
                  fontSize: "1.8rem",
                  color: star <= formData.rating ? "#FFD700" : "#ccc",
                  cursor: "pointer",
                  marginRight: "5px",
                }}
              >
                ★
              </span>
            ))}
          </div>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Bình luận</Form.Label>
          <Form.Control
            as="textarea"
            name="comment"
            rows={3}
            placeholder="Chia sẻ cảm nhận của bạn..."
            value={formData.comment}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="success" type="submit" className="px-4">
          Gửi đánh giá
        </Button>
      </Form>
    </div>
  );
};

export default ReviewBox;
