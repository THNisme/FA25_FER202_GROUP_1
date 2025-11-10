import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMessageById, updateMessageStatus } from "../../api/messagesApi";
import {
  Card,
  Spinner,
  Button,
  Form,
  Container,
  Row,
  Col,
} from "react-bootstrap";

const MessageDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchMessage = async () => {
      const data = await getMessageById(id);
      setMessage(data);
      setStatus(data.status);
    };
    fetchMessage();
  }, [id]);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    await updateMessageStatus(id, newStatus);
  };

  if (!message)
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p>Đang tải dữ liệu...</p>
      </Container>
    );

  return (
    <Container className="mt-5">
      <Card
        className="shadow p-4 mx-auto"
        style={{
          maxWidth: "1400px",
          borderRadius: "12px",
          background: "#ffffff",
        }}
      >
        <h3 className="mb-4 text-center fw-bold">Chi Tiết Tin Nhắn</h3>

        <Row>
          {/* LEFT COLUMN */}
          <Col md={4} className="border-end pe-4">
            <h5 className="mb-3 fw-semibold">Thông Tin Người Gửi</h5>

            <div className="mb-3">
              <small className="text-muted">Tên</small>
              <div className="fw-semibold">{message.name}</div>
            </div>

            <div className="mb-3">
              <small className="text-muted">Email</small>
              <div className="fw-semibold">{message.email}</div>
            </div>

            <div className="mb-3">
              <small className="text-muted">Số điện thoại</small>
              <div className="fw-semibold">{message.phone}</div>
            </div>

            <div className="mt-4">
              <Button variant="secondary" onClick={() => navigate(-1)}>
                ⬅ 
              </Button>
            </div>
          </Col>

          {/* RIGHT COLUMN */}
          <Col md={8} className="ps-4">
            <h5 className="fw-semibold mb-3">Nội Dung Tin Nhắn</h5>

            <Card className="p-3 mb-4" style={{ background: "#f8f9fa" }}>
              <div style={{ whiteSpace: "pre-wrap" }}>{message.content}</div>
            </Card>

            <h6 className="fw-semibold">Trạng Thái</h6>
            <Form.Select
              className="w-50"
              value={status}
              onChange={handleStatusChange}
            >
              <option value="unread">Chưa đọc</option>
              <option value="read">Đã đọc</option>
            </Form.Select>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default MessageDetailPage;
