import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Các bạn import component vào đây, như ví dụ bên dưới
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
// Các bạn import page vào đây, như ví dụ bên dưới
// import Home from "./pages/Home";
// import About from "./pages/About";
import HomePage from "./pages/HomePage";
import "./assets/styles/global.css"; // import global style
import "./App.css"; // style riêng cho App
import SearchBar from "./components/SearchBar"
function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/searchbar" element={<SearchBar />} />
            {/* <Route path="/about" element={<About />} /> */}
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
