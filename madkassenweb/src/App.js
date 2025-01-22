import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar"; // Top Navbar
import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage";
import Profile from "./components/Profile";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/productDetails";
import LoginPage from "./components/LoginPage";
import "./index.css";
import SignUpPage from "./components/SignUpPage";
import { CartProvider } from "./context/CartContext";
import Cart from "./components/Cart";
import AddProductPage from "./components/AddProductPage";

const App = () => {
    return (
    <CartProvider>
        <Router>
            <div>
                <Navbar />



                    <div style={{ flex: 1, padding: "16px" }}>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/about" element={<AboutPage />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/productlist" element={<ProductList />} />
                            <Route path="/products/:id" element={<ProductDetails />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/signup" element={<SignUpPage />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/add-product" element={<AddProductPage />} />

                        </Routes>
                </div>
            </div>
        </Router>
    </CartProvider>
    );
};

export default App;
