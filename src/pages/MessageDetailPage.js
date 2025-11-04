import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMessageById, updateMessageStatus } from "../api/messagesApi";
import { Card, Spinner, Button, Form } from "react-bootstrap";

const MessageDetailPage = () => {
  const { id } = useParams();
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
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );

  return (
    <Card className="m-4 p-4 shadow">
      <h4>Chi tiết tin nhắn</h4>
      <p><strong>Tên:</strong> {message.name}</p>
      <p><strong>Email:</strong> {message.email}</p>
      <p><strong>Số điện thoại:</strong> {message.phone}</p>
      <p><strong>Nội dung:</strong> {message.content}</p>

      <Form.Group controlId="statusSelect">
        <Form.Label><strong>Trạng thái:</strong></Form.Label>
        <Form.Select value={status} onChange={handleStatusChange}>
          <option value="unread">Chưa đọc</option>
          <option value="read">Đã đọc</option>
        </Form.Select>
      </Form.Group>

      <div className="mt-3">
        <Button variant="secondary" href="/messages">⬅ Quay lại</Button>
      </div>
    </Card>
  );
};

export default MessageDetailPage;
