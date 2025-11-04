// src/pages/ContactPage.js
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import MessageBox from "../components/MessageBox";

const ContactPage = () => {
  return (
    <Container className="my-5">
      <Row>
        <Col md={6}>
          <h2>Thông tin liên hệ</h2>
          <p><strong>CLB Sự kiện F-Active</strong></p>
          <p>Email: clbfactive1420@gmail.com</p>
          <p>Điện thoại: 070 490 6670</p>
          <p>Địa chỉ: 600 Nguyễn Văn Cừ nối dài, An Bình, Ninh Kiều, Cần Thơ</p>
    
        </Col>

        <Col md={6}>
          <MessageBox />
        </Col>
      </Row>
    </Container>
  );
};

export default ContactPage;
