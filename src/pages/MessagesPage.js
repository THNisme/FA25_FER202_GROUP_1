import React, { useEffect, useState } from "react";
import { getMessages, deleteMessage } from "../api/messagesApi";
import { Table, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

const MessagesPage = () => {
  const [messages, setMessages] = useState([]);

  const fetchData = async () => {
    const data = await getMessages();
    setMessages(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa tin nhắn này không?")) {
      try {
        await deleteMessage(id);
        setMessages(messages.filter((msg) => msg.id !== id));
        alert("Đã xóa thành công!");
      } catch (error) {
        alert("Xóa thất bại!");
        console.error(error);
      }
    }
  };

  return (
    <div className="p-4">
      <h3 className="mb-3">Danh sách tin nhắn</h3>

      {messages.length === 0 ? (
        <Alert variant="secondary" className="text-center">
        Không có tin nhắn nào trong danh sách.
        </Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th style={{ width: "5%" }}>ID</th>
              <th style={{ width: "25%" }}>Tên</th>
              <th style={{ width: "30%" }}>Email</th>
              <th style={{ width: "15%" }}>Trạng thái</th>
              <th style={{ width: "10%" }} className="text-center">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg) => (
              <tr key={msg.id}>
                <td className="text-center">{msg.id}</td>
                <td>{msg.name}</td>
                <td>{msg.email}</td>
                <td className="text-center">
                  {msg.status === "unread" ? (
                    <span className="text-danger fw-semibold">Chưa đọc</span>
                  ) : (
                    <span className="text-success fw-semibold">Đã đọc</span>
                  )}
                </td>
                <td className="text-center">
                  <div className="d-flex justify-content-center gap-2">
                    <Link to={`/messages/${msg.id}`}>
                      <Button variant="info" size="sm">
                        Xem
                      </Button>
                    </Link>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(msg.id)}
                    >
                      Xóa
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default MessagesPage;
