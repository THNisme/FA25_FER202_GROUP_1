import { Container, Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
const NavbarApp = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const term = searchTerm.trim();
    if (!term) {
      navigate("/searchbar");
      return;
    }
    navigate(`/searchbar?query=${encodeURIComponent(term)}`);
  };
  return (
    <Navbar expand="lg" className="bg-green">
      <Container>
        <Navbar.Brand href="#home" className='nav-brand-text'>Active Net</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          <Nav className="m-auto">
            <Form className="d-flex" onSubmit={handleSearch}>
              <FormControl
                type="search"
                placeholder="Tìm sự kiện..."
                className="me-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button type="submit" className="btn btn-outline-light bg-green">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search-icon lucide-search"><path d="m21 21-4.34-4.34" /><circle cx="11" cy="11" r="8" /></svg>
              </Button>
            </Form>
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