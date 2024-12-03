import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage";

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        {/* Content changes dynamically based on the route */}
        <main style={{ padding: "20px", background: "#f9f9f9", minHeight: "calc(100vh - 120px)" }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
