import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getLoggedInAdmin } from "../api/loginApi";

/**
* Function selection page after admin login
* @param {Object} props
* @param {Object} props.admin - logged in admin information
* @param {Function} props.onSelect - callback when selecting function ("events" or "messages")
*/
const AdminSelectionPage = ({ admin, onSelect }) => {
    const location = useLocation();
    const navigate = useNavigate();
    admin = admin || location.state?.admin || getLoggedInAdmin();

    useEffect(() => {
        if (!admin) navigate("/adminlogin");
    }, [admin, navigate]);

    const handleLogout = () => {
        localStorage.removeItem("admin");
        navigate("/adminlogin");
    };


    return (
        <Container
            fluid
            className="d-flex flex-column align-items-center justify-content-center"
            style={{ height: "90vh" }}
        >
            <h4 className="mb-5">Xin chào, {admin?.username || "Admin"}</h4>

            <Row className="w-100 justify-content-center">
                <Col xs="auto" className="mx-3">
                    <Button className="px-5 py-3 fw-bold text-white btn-login"
                        onClick={() => navigate("/eventmanager")}>
                        Quản lý sự kiện
                    </Button>
                </Col>

                <Col xs="auto" className="mx-3">
                    <Button className="px-5 py-3 fw-bold text-white btn-login"
                        onClick={() => navigate("/messagesmanager")}>
                        Quản lý Tin nhắn
                    </Button>
                </Col>
            </Row>
            <div className="d-flex justify-content-center">
                <Button
                    className="mt-5 px-4 py-2 btn-login"
                    onClick={handleLogout}
                >
                    Đăng xuất
                </Button>
            </div>


        </Container>
    );
};

export default AdminSelectionPage;
