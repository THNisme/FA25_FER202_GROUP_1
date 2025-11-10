import React, { useEffect, useState } from "react";
import { Table, Button, Container, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "../../css/eventListPage.css";

const EventListPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const removeAccents = (str) =>
    str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // loại bỏ dấu
      .toLowerCase();

  const filteredEvents = events.filter((event) =>
    removeAccents(event.title).includes(removeAccents(searchTerm))
  );

  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/events");
      setEvents(res.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Lỗi!",
        text: "Không thể tải danh sách sự kiện.",
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id, title) => {
    const result = await Swal.fire({
      icon: "warning",
      title: `<div style="font-size: 20px; font-weight: bold;">"${title}"</div>`,
      text: "Dữ liệu liên quan đến sự kiện này sẽ bị xoá vĩnh viễn! Bạn chắc chắn xoá?",
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
        await axios.delete(`http://localhost:5000/events/${id}`);
        setEvents(events.filter((e) => e.id !== id));

        Swal.fire({
          icon: "success",
          title: `<div style="font-size: 20px; font-weight: bold;">"${title}"</div>`,
          text: "Đã xoá!",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Lỗi!",
          text: "Không thể xoá sự kiện.",
          confirmButtonColor: "#d33",
        });
      }
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center fw-bold">Quản Lý Sự Kiện</h2>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" role="status" />
          <p className="mt-3">Đang tải dữ liệu...</p>
        </div>
      ) : (
        <>
          {/* Back button + Search input */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            {/* Back button */}
            <Button
              variant="outline-secondary"
              onClick={() => navigate("/adminselection")}
            >
              <i className="bi bi-arrow-left"></i>
            </Button>

            {/* Search input */}
            <div className="input-group" style={{ maxWidth: "300px" }}>
              <span className="input-group-text">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Tìm Kiếm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Bảng sự kiện */}
          <Table striped bordered hover responsive className="shadow-sm">
            <thead className="table-dark">
              <tr>
                <th className="text-center">ID</th>
                <th className="text-center">Tên sự kiện</th>
                <th className="text-center">Thể loại</th>
                <th className="text-center">Phí tham gia</th>
                <th className="text-center">Thao tác</th>
              </tr>
            </thead>

            <tbody>
              {filteredEvents.map((event) => (
                <tr key={event.id}>
                  <td className="text-center">{event.id}</td>
                  <td
                    className="text-center event-title-click"
                    onClick={() =>
                      navigate(`/eventmanager/events/${event.id}`)
                    }
                  >
                    {event.title}
                  </td>
                  <td className="text-center">{event.category}</td>
                  <td className="text-center">
                    {event.price?.toLocaleString()} VND
                  </td>
                  <td className="text-center">
                    <Button
                      variant="outline-warning"
                      className="me-2"
                      onClick={() =>
                        navigate(`/eventform/${event.id}/edit`)
                      }
                    >
                       <i className="bi bi-pencil-square"></i>
                    </Button>

                    <Button
                      variant="outline-danger"
                      onClick={() => handleDelete(event.id, event.title)}
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

export default EventListPage;
