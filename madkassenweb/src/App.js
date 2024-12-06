import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar"; // Adjust the path if needed
import HomePage from "./components/HomePage"; // Create this page
import AboutPage from "./components/AboutPage"; // Already exists
import Madvarer from "./components/Madvarer"; // Create this page
import Drikkevarer from "./components/Drikkevarer"; // Create this page
import Profile from "./components/Profile"; // Create this page
import "./styles/global.css"; // Optional: Global styles
import ProductList from "./components/ProductList";

const App = () => {
  return (
    <Router>
      {/* Navbar is always displayed */}
      <Navbar />
      {/* Define Routes for the pages */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/madvarer" element={<Madvarer />} />
        <Route path="/drikkevarer" element={<Drikkevarer />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/productlist" element={<ProductList />} />
      </Routes>
    </Router>
  );
};

export default App;
