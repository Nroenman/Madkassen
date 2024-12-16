import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const CartContext = createContext();

// Provide the context to the app
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // Load cart items from localStorage when the app starts
    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        setCartItems(storedCartItems);
    }, []);

    // Update localStorage whenever cartItems change
    useEffect(() => {
        if (cartItems.length > 0) {
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
        }
    }, [cartItems]);

    // Add product to cart
    const addToCart = (product, quantity) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.productId === product.productId);
            if (existingItem) {
                return prevItems.map((item) =>
                    item.productId === product.productId
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prevItems, { ...product, quantity }];
        });
    };

    // Update product quantity
    const updateQuantity = (productId, newQuantity) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.productId === productId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    // Remove product from cart
    const removeFromCart = (productId) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.productId !== productId));
    };

    // Calculate total price
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                updateQuantity,
                removeFromCart,
                calculateTotal,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to use the cart context
export const useCart = () => useContext(CartContext);
