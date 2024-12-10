import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar"; // Top Navbar
import LeftFilterNav from "./components/left-filter-nav"; // Left Sidebar
import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage";
import Profile from "./components/Profile";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/productDetails";
import CategoryList from "./components/CategoryList";
import LoginPage from "./components/LoginPage";
import "./index.css";

const App = () => {
    return (
        <Router>
            {/* Navbar is always displayed */}
            <Navbar/>
            {/* Define Routes for the pages */}
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/about" element={<AboutPage/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/productlist" element={<ProductList/>}/>
                <Route path="/products/:id" element={<ProductDetails />} />
                <Route path="/categorylist" element={<CategoryList/>}/>
                <Route path="/login" element={<LoginPage/>}/>
            </Routes>
            <div>
                {/* Top Navbar */}
                <Navbar />

                {/* Main Content Area */}
                <div style={{ display: "flex", marginTop: "64px" }}> {/* Adjust for Navbar height */}
                    {/* Left Sidebar */}
                    <LeftFilterNav />

                    {/* Main Content */}
                    <div style={{ flex: 1, padding: "16px" }}>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/about" element={<AboutPage />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/productlist" element={<ProductList />} />
                            <Route path="/categorylist" element={<CategoryList />} />
                            <Route path="/login" element={<LoginPage />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
};

export default App;
