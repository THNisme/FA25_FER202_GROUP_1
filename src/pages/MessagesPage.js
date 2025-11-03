import React, { useEffect, useState } from "react";
import { getMessages } from "../api/messagesApi";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const MessagesPage = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMessages();
      setMessages(data);
    };
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h3>Danh sách tin nhắn</h3>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Email</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((msg) => (
            <tr key={msg.id}>
              <td>{msg.id}</td>
              <td>{msg.name}</td>
              <td>{msg.email}</td>
              <td>
                {msg.status === "unread" ? (
                  <span className="text-danger">Chưa đọc</span>
                ) : (
                  <span className="text-success">Đã đọc</span>
                )}
              </td>
              <td>
                <Link to={`/messages/${msg.id}`}>
                  <Button variant="info" size="sm">
                    Xem chi tiết
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default MessagesPage;
