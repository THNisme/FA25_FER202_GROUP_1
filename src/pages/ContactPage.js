// src/pages/ContactPage.js
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import MessageBox from "../components/MessageBox";

const ContactPage = () => {
  return (
    <Container className="my-5">
      <Row>
        <Col md={6}>
          <h2
            style={{
              color: "var(--primary-color)",
              marginBottom: "20px",
            }}
          >
            Thông tin liên hệ
          </h2>
          <p style={{ fontSize: "1.1rem", marginBottom: "10px" }}>
            <strong>CLB Sự kiện F-Active</strong>
          </p>

          <div style={{ lineHeight: "1.8", fontSize: "1rem" }}>
            <p>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:clbfactive1420@gmail.com"
                style={{
                  color: "var(--primary-color)",
                  textDecoration: "none",
                }}
              >
                clbfactive1420@gmail.com
              </a>
            </p>
            <p>
              <strong>Điện thoại:</strong>{" "}
              <a
                href="tel:0704906670"
                style={{
                  color: "var(--primary-color)",
                  textDecoration: "none",
                }}
              >
                070 490 6670
              </a>
            </p>
            <p>
              <strong>Địa chỉ:</strong> 600 Nguyễn Văn Cừ nối dài, An Bình, Ninh
              Kiều, Cần Thơ
            </p>
            <hr />
            <p style={{ fontStyle: "italic", color: "#555" }}>
              <strong>Tiêu chí:</strong> Trang web mang đến trải nghiệm sự kiện
              năng động hiện đại và đầy cảm hứng — nơi bạn dễ dàng kết nối, khám
              phá và tham gia những hoạt động bùng nổ cùng{" "}
              <strong>F-Active!</strong>
            </p>
          </div>
        </Col>

        <Col md={6}>
          <MessageBox />
        </Col>
      </Row>
    </Container>
  );
};

export default ContactPage;
