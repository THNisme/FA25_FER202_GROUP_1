// src/components/MessageBox.js
import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { sendMessage } from "../api/messagesApi";

const MessageBox = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    content: "",
  });

  const [alert, setAlert] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.content) {
      setAlert({ type: "danger", message: "Vui lòng điền đầy đủ thông tin." });
      return;
    }

    try {
      await sendMessage({ ...formData, status: "unread" });
      setAlert({ type: "success", message: "Gửi tin nhắn thành công!" });
      setFormData({ name: "", email: "", phone: "", content: "" });
    } catch (err) {
      setAlert({ type: "danger", message: "Gửi thất bại, vui lòng thử lại!" });
    }
  };

  return (
    <div className="message-box">
      <h3>Liên hệ với chúng tôi</h3>
      {alert && <Alert variant={alert.type}>{alert.message}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Họ và tên</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Nhập họ tên"
            value={formData.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Nhập email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Số điện thoại</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            placeholder="Nhập số điện thoại"
            value={formData.phone}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Nội dung</Form.Label>
          <Form.Control
            as="textarea"
            name="content"
            rows={3}
            placeholder="Nhập nội dung liên hệ..."
            value={formData.content}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="success" type="submit">
          Gửi tin nhắn
        </Button>
      </Form>
    </div>
  );
};

export default MessageBox;
