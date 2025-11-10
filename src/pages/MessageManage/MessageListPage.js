import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Container,
  Spinner,
  Form,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "../../css/messageListPage.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const MessageListPage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("User"); // <-- bộ lọc hiện tại
  const navigate = useNavigate();

  const removeAccents = (str) =>
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  const fetchMessages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/messages");
      setMessages(res.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Lỗi!",
        text: "Không thể tải danh sách form.",
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Toggle read/unread
  const handleToggleStatus = async (msg) => {
    const newStatus = msg.status === "read" ? "unread" : "read";

    try {
      await axios.patch(`http://localhost:5000/messages/${msg.id}`, {
        status: newStatus,
      });

      setMessages(
        messages.map((m) =>
          m.id === msg.id ? { ...m, status: newStatus } : m
        )
      );
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Lỗi!",
        text: "Không thể cập nhật trạng thái.",
        confirmButtonColor: "#d33",
      });
    }
  };

  // Delete
  const handleDelete = async (id, name) => {
    const result = await Swal.fire({
      icon: "warning",
      title: `<div style="font-size: 20px; font-weight: bold;">"${name}"</div>`,
      text: "Bạn có chắc chắn muốn xoá dữ liệu này không?",
      showCancelButton: true,
      confirmButtonText: "Xoá",
      cancelButtonText: "Huỷ",
      buttonsStyling: false,
      customClass: {
        confirmButton: "swal-outline-danger",
        cancelButton: "swal-outline-secondary",
      },
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/messages/${id}`);
        setMessages(messages.filter((m) => m.id !== id));
        Swal.fire({
          icon: "success",
          title: `<div style="font-size: 20px; font-weight: bold;">"${name}"</div>`,
          text: "Đã xoá!",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Lỗi!",
          text: "Không thể xoá dữ liệu.",
          confirmButtonColor: "#d33",
        });
      }
    }
  };

  // Bộ lọc dữ liệu
  const filteredMessages = messages
    .filter((msg) => {
      if (filter === "Chưa đọc") return msg.status === "unread";
      if (filter === "Đã đọc") return msg.status === "read";
      return true; // User hoặc Admin thì không lọc tại đây
    })
    .filter(
      (msg) =>
        removeAccents(msg.name).includes(removeAccents(searchTerm)) ||
        removeAccents(msg.email).includes(removeAccents(searchTerm)) ||
        removeAccents(msg.content).includes(removeAccents(searchTerm)) ||
        (msg.phone || "").includes(searchTerm)
    );

  // Xử lý chọn bộ lọc
  const handleFilterSelect = (selected) => {
    setFilter(selected);
    if (selected === "Admin") {
      navigate("/messages/admin"); // sang trang MessageListADPage
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center fw-bold">Quản Lý Tin Nhắn</h2>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" />
          <p className="mt-3">Đang tải dữ liệu...</p>
        </div>
      ) : (
        <>
          {/* Back + Filter + Search */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="d-flex align-items-center gap-2">
              <Button
                variant="outline-secondary"
                onClick={() => navigate("/adminselection")}
              >
                <i className="bi bi-arrow-left"></i>
              </Button>

              {/* Nút lọc */}
              <DropdownButton
                variant="outline-dark"
                title={`Lọc: ${filter}`}
                onSelect={handleFilterSelect}
              >
                <Dropdown.Item eventKey="User">User</Dropdown.Item>
                <Dropdown.Item eventKey="Admin">Admin</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey="Chưa đọc">Chưa đọc</Dropdown.Item>
                <Dropdown.Item eventKey="Đã đọc">Đã đọc</Dropdown.Item>
              </DropdownButton>
            </div>

            {/* Ô tìm kiếm */}
            <div className="input-group" style={{ maxWidth: "300px" }}>
              <span className="input-group-text">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Tìm kiếm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Table */}
          <Table striped bordered hover responsive className="shadow-sm">
            <thead className="table-dark">
              <tr>
                <th className="text-center">ID</th>
                <th className="text-center">Tên</th>
                <th className="text-center">Email</th>
                <th className="text-center">Số điện thoại</th>
                <th className="text-center">Nội dung</th>
                <th className="text-center">Thao tác</th>
              </tr>
            </thead>

            <tbody>
              {filteredMessages.map((msg) => (
                <tr key={msg.id}>
                  <td className="text-center">{msg.id}</td>
                  <td className="text-center">{msg.name}</td>
                  <td className="text-center">{msg.email}</td>
                  <td className="text-center">{msg.phone}</td>
                  <td
                    className="text-center messages-title-click"
                    onClick={() => navigate(`/messages/${msg.id}`)}
                  >
                    {msg.content.length > 50
                      ? msg.content.slice(0, 50) + "..."
                      : msg.content}
                  </td>

                  <td className="text-center">
                    <Form.Check
                      type="checkbox"
                      checked={msg.status === "read"}
                      onChange={() => handleToggleStatus(msg)}
                      className="me-3 d-inline-block"
                    />

                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() =>
                        navigate(`/messages/reply/${msg.id}`)
                      }
                    >
                      <i className="bi bi-chat-left-dots"></i>
                    </Button>

                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(msg.id, msg.name)}
                    >
                      <i className="bi bi-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </Container>
  );
};

export default MessageListPage;
