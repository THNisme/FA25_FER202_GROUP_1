import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMessageById, sendReplyMessage } from "../../api/messageFormApi";
import {
  Card,
  Spinner,
  Button,
  Form,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import Swal from "sweetalert2";
import "bootstrap-icons/font/bootstrap-icons.css";

const MessageFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [sending, setSending] = useState(false);
  const [sendToEmail, setSendToEmail] = useState(false);
  const [sendToPhone, setSendToPhone] = useState(false);

  // 🔹 Lấy thông tin message gốc
  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const data = await getMessageById(id);
        setMessage(data);
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Lỗi!",
          text: "Không thể tải thông tin người nhận.",
          confirmButtonColor: "#d33",
        });
      }
    };
    fetchMessage();
  }, [id]);

  // 🔹 Xử lý gửi tin nhắn
  const handleSend = async () => {
    if (!replyContent.trim()) return;

    if (!sendToEmail && !sendToPhone) {
      Swal.fire({
        icon: "warning",
        title: "Chưa chọn nơi gửi!",
        text: "Vui lòng tick Email hoặc Số điện thoại trước khi gửi.",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    setSending(true);
    try {
      // ✅ Gom tất cả nơi gửi lại 1 lần
      const destinations = [];
      if (sendToEmail && message.email) destinations.push(message.email);
      if (sendToPhone && message.phone) destinations.push(message.phone);

      // ✅ Gửi và lưu vào adminmessages
      await sendReplyMessage({
        to: destinations, 
        content: replyContent,
        originalMessageId: message.id,
        receiverName: message.name, // lưu tên người nhận
      });

      Swal.fire({
        icon: "success",
        title: `<div style="font-size: 20px; font-weight: bold;">"${message.name}"</div>`,
        text: "Tin nhắn đã gửi thành công!",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate(-1);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Gửi thất bại!",
        text: "Có lỗi xảy ra khi gửi tin nhắn.",
        confirmButtonColor: "#d33",
      });
    } finally {
      setSending(false);
    }
  };

  // 🔹 Loading state
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
        style={{ maxWidth: "1400px", borderRadius: "12px", background: "#fff" }}
      >
        <h3 className="mb-4 text-center fw-bold">Gửi Tin Nhắn</h3>

        <Row>
          {/* LEFT COLUMN */}
          <Col md={4} className="border-end pe-4">
            <h5 className="mb-3 fw-semibold">Thông Tin Người Nhận</h5>

            <div className="mb-3">
              <small className="text-muted">Tên</small>
              <div className="fw-semibold">{message.name}</div>
            </div>

            <div className="mb-3 d-flex justify-content-between align-items-center">
              <div>
                <small className="text-muted">Email</small>
                <div className="fw-semibold">{message.email || "(Không có)"}</div>
              </div>
              <Form.Check
                type="checkbox"
                checked={sendToEmail}
                onChange={(e) => setSendToEmail(e.target.checked)}
                disabled={!message.email}
              />
            </div>

            <div className="mb-3 d-flex justify-content-between align-items-center">
              <div>
                <small className="text-muted">Số điện thoại</small>
                <div className="fw-semibold">{message.phone || "(Không có)"}</div>
              </div>
              <Form.Check
                type="checkbox"
                checked={sendToPhone}
                onChange={(e) => setSendToPhone(e.target.checked)}
                disabled={!message.phone}
              />
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

            <Form.Control
              as="textarea"
              rows={7}
              placeholder="Nhập nội dung tin nhắn..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
            />

            <div className="mt-3">
              <Button
                variant="primary"
                onClick={handleSend}
                disabled={sending || !replyContent.trim()}
              >
                {sending ? "Đang gửi..." : "Gửi tin nhắn"}
              </Button>
            </div>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default MessageFormPage;
