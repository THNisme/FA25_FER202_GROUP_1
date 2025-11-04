import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Các bạn import component vào đây, như ví dụ của navbar và footer bên dưới
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ContactPage from "./pages/ContactPage";
import MessageListPage from "./pages/MessageListPage";
import MessageDetailPage from "./pages/MessageDetailPage";
import HomePage from "./pages/HomePage";
import SearchBar from "./components/SearchBar";
import EventDetailPage from "./pages/EventDetailPage";
import AdminSelectionPage from "./pages/AdminSelection";
import AdminLoginPage from "./pages/AdminLoginPage ";
// Các bạn import page vào đây, như ví dụ bên dưới
// import Home from "./pages/Home";
// import About from "./pages/About";

import "./assets/styles/global.css"; // import global style
import "./App.css"; // style riêng cho App
function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/searchbar" element={<SearchBar />} />
            <Route path="/event/:id" element={<EventDetailPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/messages" element={<MessageListPage />} />
            <Route path="/messages/:id" element={<MessageDetailPage />} />
            <Route path="/adminlogin" element={<AdminLoginPage />} />
            <Route path="/adminselection" element={<AdminSelectionPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
