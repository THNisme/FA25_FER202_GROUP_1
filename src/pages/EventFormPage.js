import { useState, useEffect } from "react";
import { Form, Button, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import FroalaEditorComponent from 'react-froala-wysiwyg';
import eventFormApi from "../api/eventFormApi";
import imageList from "../assets/imageList";

const EventFormPage = () => {
  const { id, action } = useParams();
  const isEdit = action === "edit" && !!id;

  const [eventList, setEventList] = useState([]);
  const [event, setEvent] = useState(
    {
      id: "",
      title: "",
      date: "",
      category: "Khác",
      description: "",
      image: null,
      price: 0
    }
  );
  const [preview, setPreview] = useState("");
  const [validated, setValidated] = useState(false);

  const fetchEventList = async () => {
    try {
      const data = await eventFormApi.getAll();
      setEventList(data);
    } catch (error) {
      console.error(error);
    }
  };

  const newIncreaseID = () => {
    if (!eventList || eventList.length === 0) return 1; // nếu chưa có sự kiện nào

    // Lấy ID lớn nhất
    const maxID = Math.max(...eventList.map(e => Number(e.id) || 0));
    return (maxID + 1).toString();
  }

  useEffect(() => {
    fetchEventList();
  }, []);

  useEffect(() => {
    if (!isEdit) {
      const newID = newIncreaseID();
      setEvent(prev => ({ ...prev, id: newID }));
    }
  }, [eventList, isEdit]);


  useEffect(() => {
    if (isEdit) {
      const loadEvent = async () => {
        try {
          const data = await eventFormApi.getById(id);
          setEvent({
            id: data.id,
            title: data.title,
            category: data.category,
            description: data.description,
            image: data.image,
            price: data.price || 0,
          });
          setPreview(data.image);
        } catch (err) {
          console.error("Lỗi load event:", err);
        }
      };
      loadEvent();
    }
  }, [id, action]);

  const handleChooseImg = (e) => {
    const selectedUrl = e.target.value;
    setPreview(selectedUrl);
    setEvent({
      ...event, image: selectedUrl,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await eventFormApi.update(id, event);
        alert("Cập nhật sự kiện thành công!");
      } else {
        await eventFormApi.create(event);
        alert("Tạo sự kiện thành công!");
        setEvent({
          id: newIncreaseID(),
          title: "",
          category: "Khác",
          description: "",
          image: null,
          price: 0,
        });
        setPreview(null);
      }

      fetchEventList();
    } catch (error) {
      console.error("Lỗi khi gửi form:", error);
      alert("Thất bại!");
    }
  };



  return (
    <div className="container my-5">
      <h3 className="text-center mb-3 fw-bold">{isEdit ? `Cập nhật sự kiện: ${event.title}` : "Tạo sự kiện"}</h3>
      <div className="event-form-wrapper">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Tên sự kiện</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập tên sự kiện"
              value={event.title}
              onChange={(e) => setEvent({ ...event, title: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Ngày tổ chức</Form.Label>
            <Form.Control
              type="date"
              value={event.date}
              onChange={(e) => setEvent({ ...event, date: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phí tham gia:</Form.Label>
            <Form.Control
              type="number"
              placeholder="Nhập phí tham gia"
              min={0}
              onChange={(e) =>
                setEvent({
                  ...event,
                  price: e.target.value === "" ? "" : parseInt(e.target.value),
                })
              }
              value={event.price === "" ? "" : event.price}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Danh mục sự kiện</Form.Label>
            <Form.Select type="text"
              placeholder="Nhập danh mục"
              value={event.category}
              onChange={(e) => setEvent({ ...event, category: e.target.value })}
              required
            >
              <option value="">--Chọn danh mục--</option>
              <option value="Nhạc sống">Nhạc sống</option>
              <option value="Sân khấu & Nghệ thuật">Sân khấu & Nghệ thuật</option>
              <option value="Thể thao">Thể thao</option>
              <option value="Khác">Khác</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Mô tả</Form.Label>
            <input
              type="hidden"
              value={event.description}
              required
            />
            <FroalaEditorComponent
              key={event.id}
              tag="textarea"
              model={event.description}
              onModelChange={(model) => setEvent({ ...event, description: model })}
              config={{
                placeholderText: "Nhập mô tả sự kiện...",
                heightMin: 250,
                toolbarButtons: {
                  moreText: {
                    buttons: [
                      "bold",
                      "italic",
                      "underline",
                      "strikeThrough",
                      "fontSize",
                      "color",
                      "clearFormatting",
                    ],
                  },
                  moreParagraph: {
                    buttons: [
                      "formatOL",
                      "formatUL",
                      "alignLeft",
                      "alignCenter",
                      "alignRight",
                      "alignJustify",
                    ],
                  },
                  moreRich: {
                    buttons: [
                      "insertLink",
                      "insertImage",
                      "insertVideo",
                    ],
                  },
                  moreMisc: {
                    buttons: ["undo", "redo", "fullscreen", "html"],
                  },
                },
                imageUpload: false, // tắt upload file
                videoUpload: false, // tắt upload file
                imageInsertButtons: ["imageBack", "|", "imageByURL"], // chỉ cho nhập URL
                videoInsertButtons: ["videoBack", "|", "videoByURL"], // chỉ cho nhập URL
                quickInsertTags: [""], // tắt gợi ý chèn nhanh
              }}
            />
            {validated && (!event.description || event.description.trim() === "") && (
              <Form.Control.Feedback type="invalid" style={{ display: "block" }}>
                Vui lòng nhập mô tả sự kiện
              </Form.Control.Feedback>
            )}
          </Form.Group>

          {/* Chọn ảnh có sẵn */}
          <Form.Group className="mb-3">
            <Form.Label>Ảnh sự kiện</Form.Label>
            <Form.Select onChange={handleChooseImg} value={event.image || ""} required>
              <option value="">-- Chọn ảnh mẫu --</option>
              {imageList.map((item) => (
                <option key={item.id} value={item.url}>
                  {item.title}
                </option>
              ))}
            </Form.Select>

            {preview && (
              <div className="mt-3 text-center">
                <Image
                  src={preview.startsWith("http") ? preview : `/${preview}`}
                  alt="Preview"
                  thumbnail
                  style={{ maxWidth: "300px", maxHeight: "300px" }}
                />
              </div>
            )}
          </Form.Group>

          <Button type="submit" variant="success" className="green-btn w-100">
            {isEdit ? "Cập nhật sự kiện" : "Tạo sự kiện"}
          </Button>
        </Form>
      </div>
    </div>
  );



};

export default EventFormPage;