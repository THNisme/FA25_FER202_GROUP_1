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

const MessageListADPage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("Admin");
  const navigate = useNavigate();

  const removeAccents = (str) =>
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  const fetchMessages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/adminmessages");
      setMessages(res.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Lỗi!",
        text: "Không thể tải danh sách tin nhắn của Admin.",
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id, name) => {
    const result = await Swal.fire({
      icon: "warning",
      title: `<div style="font-size: 20px; font-weight: bold;">"${name}"</div>`,
      text: "Bạn có chắc chắn muốn xoá tin nhắn này không?",
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
        await axios.delete(`http://localhost:5000/adminmessages/${id}`);
        const numericId = Number(id);
        setMessages((prev) => prev.filter((m) => m.id !== numericId));

        Swal.fire({
          icon: "success",
          title: `<div style="font-size: 20px; font-weight: bold;">"${name}"</div>`,
          text: "Đã xoá thành công!",
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

  const filteredMessages = messages
    .filter((msg) => {
      if (filter === "Chưa đọc") return msg.status === "unread";
      if (filter === "Đã đọc") return msg.status === "read";
      return true;
    })
    .filter(
      (msg) =>
        removeAccents(msg.receiverName || "").includes(
          removeAccents(searchTerm)
        ) ||
        removeAccents(msg.receiverEmail || "").includes(
          removeAccents(searchTerm)
        ) ||
        removeAccents(msg.content || "").includes(removeAccents(searchTerm)) ||
        (msg.receiverPhone || "").includes(searchTerm)
    );

  const handleFilterSelect = (selected) => {
    setFilter(selected);
    if (selected === "User") {
      navigate("/messages");
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center fw-bold">Quản Lý Tin Nhắn Admin</h2>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" />
          <p className="mt-3">Đang tải dữ liệu...</p>
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="d-flex align-items-center gap-2">
              <Button
                variant="outline-secondary"
                onClick={() => navigate("/adminselection")}
              >
                <i className="bi bi-arrow-left"></i>
              </Button>

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

          <Table striped bordered hover responsive className="shadow-sm">
            <thead className="table-dark">
              <tr>
                <th className="text-center">ID</th>
                <th className="text-center">Tên người nhận</th>
                <th className="text-center">Email người nhận</th>
                <th className="text-center">Số điện thoại người nhận</th>
                <th className="text-center">Nội dung</th>
                <th className="text-center">Thao tác</th>
              </tr>
            </thead>

            <tbody>
              {filteredMessages.map((msg) => (
                <tr key={msg.id}>
                  <td className="text-center">{msg.id}</td>
                  <td className="text-center">{msg.receiverName}</td>
                  <td className="text-center">{msg.receiverEmail}</td>
                  <td className="text-center">{msg.receiverPhone}</td>

                  <td
                    className="text-center messages-title-click"
                    onClick={() => navigate(`/messages/admin/${msg.id}`)}
                  >
                    {msg.content.length > 50
                      ? msg.content.slice(0, 50) + "..."
                      : msg.content}
                  </td>

                  <td className="text-center">
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(msg.id, msg.receiverName)}
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

export default MessageListADPage;
