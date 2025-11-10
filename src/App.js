import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from 'react';


// Component chung
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";

// Pages
const ContactPage = lazy(() => import('./pages/ContactPage'));
const MessageDetailPage = lazy(() => import('./pages/MessageManage/MessageDetailPage'));
const MessageFormPage = lazy(() => import('./pages/MessageManage/MessageFormPage'));
const HomePage = lazy(() => delayImport(() => import('./pages/HomePage')));
const EventDetailPage = lazy(() => import('./pages/EventDetailPage'));
const AdminSelectionPage = lazy(() => import('./pages/AdminSelection'));
const AdminLoginPage = lazy(() => import('./pages/AdminLoginPage '));
const EventListPage = lazy(() => import('./pages/EventManage/EventListPage'));
const EventFormPage = lazy(() => import('./pages/EventFormPage'));
const MessageListPage = lazy(() => import('./pages/MessageManage/MessageListPage'));
const MessageListADPage = lazy(() => import('./pages/MessageManage/MessageListADPage'));
const MessageADPage = lazy(() => import('./pages/MessageManage/MessageADPage'));

// Styles
import "./assets/styles/global.css";
import "./App.css";

function delayImport(fn, ms = 2000) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(fn());
    }, ms);
  });
}

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
            <Route path="/eventform" element={<EventFormPage />} />
            <Route path="/eventform/:id/:action" element={<EventFormPage />} />
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
