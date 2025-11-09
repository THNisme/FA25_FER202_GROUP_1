import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='footer-block d-flex flex-column mt-auto'>
      <Container>
        <Row>
          <Col>
            <p className='footer-logo-text'>Active Net</p>
            <p>Trang thông tin sự kiện chính thức từ Câu lạc bộ sự kiện F-Active</p>
            <p>Dự án môn học FER202</p>
            <p>- Giảng viên: Ngô Giang Thanh</p>
            <p>- Nhóm phát triển: G01</p>
          </Col>
          <Col>
            <Row>
              <Col>
                <ul className='footer-social-list'>
                  <li className='footer-social-item'>
                    <a href='https://www.facebook.com/Active.Event.Club'><i className="bi bi-facebook"></i></a>
                  </li>
                  <li className='footer-social-item'>
                    <a href='https://www.tiktok.com/@clb_factive'><i className="bi bi-tiktok"></i></a>
                  </li>
                </ul>
                <ul className='footer-contact-list'>
                  <li className='footer-contact-item'>
                    <p>
                      <i className="bi bi-envelope-at"></i> clbfactive1420@gmail.com
                    </p>
                  </li>
                  <li className='footer-contact-item'>
                    <p>
                      <i className="bi bi-telephone"></i> 070 490 6670
                    </p>
                  </li>
                </ul>
              </Col>
            </Row>
            <Row>
              <Col>
                <ul className='footer-button-list'>
                  <li className='footer-button-item'>
                    <Button as={Link} to={"/admin-path"} variant='outline-light' className='button-shape mb-3'>Tạo sự kiện</Button>
                  </li>
                  <li className='footer-button-item'>
                    <Button as={Link} to={"/contact"} variant='outline-light' className='button-shape mb-3'>
                      Liên hệ <i className="bi bi-telephone"></i>
                    </Button>
                  </li>
                </ul>
              </Col>
            </Row>
          </Col>
          <Col>
            <div className='footer-map'>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.0532902991595!2d105.72985667573046!3d10.012457072818833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0882139720a77%3A0x3916a227d0b95a64!2sFPT%20University!5e0!3m2!1svi!2s!4v1762013888566!5m2!1svi!2s" width="100%" height="100%" style={{ marginRight: 0 }} allowfullscreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
              <p><strong>Địa chỉ:</strong> 600 Nguyễn Văn Cừ nối dài, An Bình, Ninh Kiều, Cần Thơ, Thành Phố Cần Thơ, Vietnam</p>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;