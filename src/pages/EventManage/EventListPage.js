import React, { useEffect, useState } from "react";
import { Table, Button, Spinner } from "react-bootstrap";

export default function EventsTable() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // API từ bạn cung cấp (json-server hoặc file local)
  const API_URL = "http://localhost:5000/events";

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error("Lỗi load API:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleEdit = (id) => {
    console.log("Sửa:", id);
    // Điều hướng hoặc mở modal chỉnh sửa
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa sự kiện này?")) return;

    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setEvents(events.filter((e) => e.id !== id));
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" />
        <p>Đang tải dữ liệu...</p>
      </div>
    );
  }

  return (
    <Table striped bordered hover responsive className="mt-3">
      <thead>
        <tr>
          <th>ID</th>
          <th>Tên SK</th>
          <th>Thể Loại</th>
          <th>Phí tham gia</th>
          <th>Thao tác</th>
        </tr>
      </thead>

      <tbody>
        {events.map((ev) => (
          <tr key={ev.id}>
            <td>{ev.id}</td>

            {/* LOẠI BỎ HTML TRONG TITLE — chỉ lấy text */}
            <td>{ev.title.replace(/<[^>]+>/g, "")}</td>

            <td>{ev.category}</td>

            <td>{ev.price.toLocaleString()}đ</td>

            <td>
              <Button
                variant="warning"
                size="sm"
                className="me-2"
                onClick={() => handleEdit(ev.id)}
              >
                Sửa
              </Button>

              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDelete(ev.id)}
              >
                Xóa
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
