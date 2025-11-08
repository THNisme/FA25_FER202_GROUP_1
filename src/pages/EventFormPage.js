import { useState, useEffect } from "react";
import { Form, Button, Image } from "react-bootstrap";
import FroalaEditorComponent from 'react-froala-wysiwyg';
import eventFormApi from "../api/eventFormApi";
import imageList from "../assets/imageList";

const EventFormPage = () => {
  const [eventList, setEventList] = useState([]);
  const [event, setEvent] = useState(
    {
      id: "",
      title: "",
      category: "Khác",
      description: "",
      image: null,
      price: 0
    }
  );
  const [action, setAction] = useState("");
  const [preview, setPreview] = useState("");

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
    return maxID + 1;
  }

  useEffect(() => {
    fetchEventList();
  }, []);

  useEffect(() => {
    const newID = newIncreaseID();
    setEvent((prev) => ({ ...prev, id: newID }));
  }, [eventList]);

  const handleFileChange = (e) => {
    const selectedUrl = e.target.value;
    setPreview(selectedUrl);
    setEvent((prev) => ({
      ...prev,
      image: selectedUrl, // key image để POST lên server
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("id", event.id);
      formData.append("title", event.title);
      formData.append("category", event.category);
      formData.append("description", event.description);
      formData.append("price", event.price);
      if (event.image) formData.append("image", event.image);

      await eventFormApi.create(formData); // POST multipart/form-data

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
      fetchEventList();
    } catch (error) {
      console.error("Lỗi khi tạo sự kiện:", error);
      alert("Tạo sự kiện thất bại!");
    }
  };




  return (
    <div className="container my-5">
      <h3 className="text-center mb-3 fw-bold">Tạo sự kiện mới</h3>
      <div className="event-form-wrapper">
        <Form onSubmit={handleSubmit} encType="multipart/form-data">
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
            <Form.Label>Danh mục</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập danh mục"
              value={event.category}
              onChange={(e) => setEvent({ ...event, category: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Mô tả</Form.Label>
            <FroalaEditorComponent
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
                imageUpload: false, // ❌ tắt upload file
                videoUpload: false, // ❌ tắt upload file
                imageInsertButtons: ["imageBack", "|", "imageByURL"], // ✅ chỉ cho nhập URL
                videoInsertButtons: ["videoBack", "|", "videoByURL"], // ✅ chỉ cho nhập URL
                quickInsertTags: [""], // tắt gợi ý chèn nhanh
              }}
            />
          </Form.Group>

          {/* Chọn ảnh có sẵn */}
          <Form.Group className="mb-3">
            <Form.Label>Ảnh sự kiện</Form.Label>
            <Form.Select onChange={handleFileChange}>
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
                  src={preview}
                  alt="Preview"
                  thumbnail
                  style={{ maxWidth: "300px", maxHeight: "300px" }}
                />
              </div>
            )}
          </Form.Group>

          <Button type="submit" variant="success" className="green-btn w-100">
            Tạo sự kiện
          </Button>
        </Form>
      </div>
    </div>
  );



};

export default EventFormPage;