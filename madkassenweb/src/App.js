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
import signUpPage from "./components/SignUpPage";
import SignUpPage from "./components/SignUpPage";
import { CartProvider } from "./context/CartContext";
import Cart from "./components/Cart";

const App = () => {
    return (
    <CartProvider>
        <Router>
            {/* Navbar is always displayed */}
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
                            <Route path="/products/:id" element={<ProductDetails />} />
                            <Route path="/categorylist" element={<CategoryList />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/signup" element={<SignUpPage />} />
                            <Route path="/cart" element={<Cart />} />

                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    </CartProvider>
    );
};

export default App;
