import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Spinner, Button, Container, Row, Col } from "react-bootstrap";

const MessageADPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
  const fetchMessage = async () => {
    try {
      setLoading(true);

      // Lấy tất cả adminmessages
      const res = await axios.get(`http://localhost:5000/adminmessages`);

      // Tìm message có id khớp (so sánh lỏng để handle string/number)
      const msg = res.data.find((m) => m.id == id);

      if (!msg) {
        setNotFound(true);
      } else {
        setMessage(msg);
      }
    } catch (error) {
      console.error(error);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  fetchMessage();
}, [id]);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p>Đang tải dữ liệu...</p>
      </Container>
    );
  }

  if (notFound) {
    return (
      <Container className="text-center mt-5">
        <h3>Không tìm thấy tin nhắn</h3>
        <Button variant="secondary" className="mt-3" onClick={() => navigate(-1)}>
          ⬅ Quay lại
        </Button>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Card
        className="shadow p-4 mx-auto"
        style={{ maxWidth: "1400px", borderRadius: "12px", background: "#ffffff" }}
      >
        <h3 className="mb-4 text-center fw-bold">Chi Tiết Tin Nhắn Admin</h3>

        <Row>
          {/* LEFT COLUMN */}
          <Col md={4} className="border-end pe-4">
            <h5 className="mb-3 fw-semibold">Thông Tin Người Nhận</h5>

            <div className="mb-3">
              <small className="text-muted">Tên</small>
              <div className="fw-semibold">{message.receiverName}</div>
            </div>

            <div className="mb-3">
              <small className="text-muted">Email</small>
              <div className="fw-semibold">{message.receiverEmail || "(Không có)"}</div>
            </div>

            <div className="mb-3">
              <small className="text-muted">Số điện thoại</small>
              <div className="fw-semibold">{message.receiverPhone || "(Không có)"}</div>
            </div>

            <div className="mt-4">
              <Button variant="secondary" onClick={() => navigate(-1)}>
                ⬅ Quay lại
              </Button>
            </div>
          </Col>

          {/* RIGHT COLUMN */}
          <Col md={8} className="ps-4">
            <h5 className="fw-semibold mb-3">Nội Dung Tin Nhắn</h5>
            <Card className="p-3 mb-4" style={{ background: "#f8f9fa" }}>
              <div style={{ whiteSpace: "pre-wrap" }}>{message.content}</div>
            </Card>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default MessageADPage;
