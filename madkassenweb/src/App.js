import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar"; // Adjust the path if needed
import HomePage from "./components/HomePage"; // Create this page
import AboutPage from "./components/AboutPage"; // Already exists
import Profile from "./components/Profile"; // Create this page
import ProductList from "./components/ProductList";
import CategoryList from "./components/CategoryList";
import "./index.css"


const App = () => {
  return (
    <Router>
      {/* Navbar is always displayed */}
      <Navbar />
      {/* Define Routes for the pages */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/productlist" element={<ProductList />} />
        <Route path="/categorylist" element={<CategoryList />} />
      </Routes>
    </Router>
  );
};

export default App;
