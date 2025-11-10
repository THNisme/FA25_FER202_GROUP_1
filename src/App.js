import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from 'react';


// Component chung
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import ContactPage from "./pages/ContactPage";
import MessageDetailPage from "./pages/MessageManage/MessageDetailPage";
import MessageFormPage from "./pages/MessageManage/MessageFormPage";
import HomePage from "./pages/HomePage";
import SearchBar from "./components/SearchBar";
import EventDetailPage from "./pages/EventDetailPage";
import AdminSelectionPage from "./pages/AdminSelection";
import AdminLoginPage from "./pages/AdminLoginPage ";
import EventListPage from "./pages/EventManage/EventListPage";
import MessageListPage from "./pages/MessageManage/MessageListPage";
import MessageListADPage from "./pages/MessageManage/MessageListADPage";
import MessageADPage from "./pages/MessageManage/MessageADPage";

// Styles
import "./assets/styles/global.css";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        {/* <div className="text-center fs-5" style={{ margin: "5rem 0", color: "#2dc275" }}>Loading...</div> */}
        <Suspense fallback={<div class="d-flex m-auto">
          <img src="/assets/images/loading-logo.png" alt="Logo" className="logo-loading-img" />
        </div>}>
          <Routes>
            {/* Public */}
            <Route path="/" element={<HomePage />} />
            <Route path="/searchbar" element={<SearchBar />} />
            <Route path="/event/:id" element={<EventDetailPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Admin */}
            <Route path="/adminlogin" element={<AdminLoginPage />} />
            <Route path="/adminselection" element={<AdminSelectionPage />} />

            {/* Event Manager */}
            <Route path="/eventmanager" element={<EventListPage />} />
            <Route path="/eventmanager/events/:id" element={<EventDetailPage />} />

            {/* User Messages */}
            <Route path="/messages" element={<MessageListPage />} />
            <Route path="/messages/:id" element={<MessageDetailPage />} />
            <Route path="/messages/reply/:id" element={<MessageFormPage />} />

            {/* Admin Messages */}
            <Route path="/messages/admin" element={<MessageListADPage />} />
            <Route path="/messages/admin/:id" element={<MessageADPage />} />
          </Routes>
        </Suspense>
        <Footer />
      </div >
    </Router >

  );
}

export default App;
