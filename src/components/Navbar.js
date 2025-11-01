import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavbarApp = () => {
  return (
    <Navbar expand="lg" className="bg-green">
      <Container>
        <Navbar.Brand href="#home" className='nav-brand-text'>Active Net</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          <Nav className="m-auto">
            <Nav.Link>
              <Button className='btn btn-outline-light nav-button bg-green'>SEARCH BAR Ở ĐÂY</Button>
            </Nav.Link>
          </Nav>

          <Nav className='ms-auto'>
            <Nav.Link as={Link} to={"/admin-path"}>
              <Button className='btn btn-outline-light nav-button bg-green'>Tạo sự kiện</Button>
            </Nav.Link>
            <Nav.Link as={Link} to={"/contact"}>
              <Button className='btn btn-outline-light nav-button bg-green'>
                Liên hệ <i className="bi bi-telephone"></i>
              </Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarApp;