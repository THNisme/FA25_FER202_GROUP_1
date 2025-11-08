import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from 'react';


// Các bạn import component vào đây, như ví dụ của navbar và footer bên dưới
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
// Các bạn import page vào đây, như ví dụ bên dưới
// import Home from "./pages/Home";
// import About from "./pages/About";

import "./assets/styles/global.css"; // import global style
import "./App.css"; // style riêng cho App

const ContactPage = lazy(() => import('./pages/ContactPage'));
const MessageListPage = lazy(() => import('./pages/MessageListPage'));
const MessageDetailPage = lazy(() => import('./pages/MessageDetailPage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const EventDetailPage = lazy(() => import('./pages/EventDetailPage'));
const EventFormPage = lazy(() => import('./pages/EventFormPage'));


function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />

        <Suspense fallback={<div className="text-center fs-5" style={{ margin: "5rem 0", color: "#2dc275" }}>Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/searchbar" element={<SearchBar />} />
            <Route path="/event/:id" element={<EventDetailPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/messages" element={<MessageListPage />} />
            <Route path="/messages/:id" element={<MessageDetailPage />} />
            <Route path="/eventform" element={<EventFormPage />} />
            <Route path="/eventform/:id/:action" element={<EventFormPage />} />
          </Routes>
        </Suspense>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
