import { loginAdmin } from "../api/loginApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../css/adminLogin.css";

function AdminLoginPage({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        
        const admin = await loginAdmin(username, password);

        if (admin) {            
            navigate("/adminselection", { state: { admin } });            
        } else {
            setError("Sai tên đăng nhập hoặc mật khẩu!");
        }
    };

    return (
        <div className="admin-container">            

            <form class="login-card" onSubmit={handleSubmit}>
                <h3 className="mb-3 text-center">Admin Login</h3>
                <div className="mb-3">
                    <label className="form-label">Tên đăng nhập</label>
                    <input
                        type="text"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Nhập username..."
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Mật khẩu</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Nhập mật khẩu..."
                    />
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                <button type="submit" className="btn btn-login w-100">
                    Đăng nhập
                </button>
            </form>
        </div>
    );
}

export default AdminLoginPage;
