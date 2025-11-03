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

  const validateForm = () => {
    const { name, email, phone, content } = formData;

    if (!name.trim()) {
      return { type: "danger", message: "Vui lòng nhập họ tên." };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return { type: "danger", message: "Email không hợp lệ." };
    }


    const phoneRegex = /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/;
    if (phone.trim() && !phoneRegex.test(phone.trim())) {
      return { type: "danger", message: "Số điện thoại không hợp lệ (phải là số Việt Nam)." };
    }

    if (!content.trim()) {
      return { type: "danger", message: "Vui lòng nhập nội dung liên hệ." };
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setAlert(validationError);
      return;
    }

    try {
      await sendMessage({ ...formData, status: "unread" });
      setAlert({ type: "success", message: "🎉 Gửi tin nhắn thành công! Chúng tôi sẽ phản hồi sớm nhất có thể! Trân Trọng!" });
      setFormData({ name: "", email: "", phone: "", content: "" });
    } catch (err) {
      setAlert({ type: "danger", message: "Gửi thất bại, vui lòng thử lại!" });
    }
  };

  return (
    <div className="message-box p-4 rounded shadow-sm bg-light">
      <h3 className="mb-3 text-success">Liên hệ với chúng tôi</h3>

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
            placeholder="Nhập số điện thoại (tuỳ chọn)"
            value={formData.phone}
            onChange={handleChange}
          />
          <Form.Text className="text-muted">
            VD: 0901234567 hoặc +84901234567
          </Form.Text>
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

        <Button variant="success" type="submit" className="px-4">
          Gửi tin nhắn
        </Button>
      </Form>
    </div>
  );
};

export default MessageBox;
