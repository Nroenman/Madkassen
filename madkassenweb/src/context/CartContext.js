import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

// Create the context
const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [userId, setUserId] = useState(null);

    // Helper function to generate a random userId
    const generateRandomUserId = () => {
        return Math.floor(Math.random() * 1000000);
    };

    // Helper function to get userId from JWT token
    const getUserIdFromToken = () => {
        const token = localStorage.getItem("authToken"); // Assuming the JWT is stored in localStorage
        if (!token) return null;

        try {
            const decodedToken = jwtDecode(token);
            return decodedToken.sub; // Extract the userId (subject) from the token
        } catch (error) {
            console.error("Failed to decode token:", error);
            return null;
        }
    };

     useEffect(() => {
        // Only proceed if userId is not set
        if (userId === null) {
            // Prioritize userId from token if available
            let storedUserId = getUserIdFromToken();

            // Fallback to random userId if no valid token
            if (!storedUserId) {
                storedUserId = JSON.parse(localStorage.getItem("userId")) || generateRandomUserId();
                localStorage.setItem("userId", JSON.stringify(storedUserId));
            }

            setUserId(storedUserId);
        }

        // Load cart items from localStorage
        const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        setCartItems(storedCartItems);
    }, [userId]); // Added userId as a dependency to prevent multiple requests

    // Update localStorage whenever cartItems change
    useEffect(() => {
        if (cartItems.length > 0) {
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
        }
    }, [cartItems]);

    // Add product to cart
    const addToCart = async (product, quantity) => {
        if (!userId) {
            console.warn("Cannot add to cart without a userId");
            return;
        }

        const requestData = {
            productId: product.productId,
            userId: userId,
            quantity: quantity,
        };

        try {
            const response = await fetch("http://localhost:5092/api/Cart/add-to-cart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });

            if (!response.ok) {
                const errorDetails = await response.text();
                console.error("Error adding to cart:", errorDetails);
                throw new Error("Failed to add to cart");
            }

            await fetchCartItems();
        } catch (error) {
            console.error("Add to cart error:", error);
        }
    };

    // Update product quantity in cart
    const updateQuantity = async (productId, newQuantity) => {
        try {
            const response = await fetch("http://localhost:5092/api/Cart/update-cart-item", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    productId: productId,
                    userId: userId,
                    quantity: newQuantity,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to update cart item");
            }

            setCartItems((prevItems) =>
                prevItems.map((item) =>
                    item.productId === productId ? { ...item, quantity: newQuantity } : item
                )
            );
        } catch (error) {
            console.error(error);
        }
    };

    // Remove product from cart
    const removeFromCart = async (productId) => {
        try {
            const response = await fetch(
                `http://localhost:5092/api/Cart/remove-cart-item?productId=${productId}&userId=${userId}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to remove from cart");
            }

            setCartItems((prevItems) => prevItems.filter((item) => item.productId !== productId));
        } catch (error) {
            console.error(error);
        }
    };

    // Calculate total price
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            if (item.price && item.quantity) {
                return total + item.price * item.quantity;
            }
            return total;
        }, 0);
    };

    // Fetch cart items from backend
    const fetchCartItems = async () => {
        if (!userId) {
            console.warn("Cannot fetch cart items without a userId");
            return;
        }

        try {
            const response = await fetch(`http://localhost:5092/api/Cart/get-cart-items?userId=${userId}`);
            if (response.ok) {
                const data = await response.json();
                setCartItems(data);
            } else {
                console.error("Failed to fetch cart items");
            }
        } catch (error) {
            console.error("Error fetching cart items:", error);
        }
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                updateQuantity,
                removeFromCart,
                calculateTotal,
                fetchCartItems,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to use the cart context
export const useCart = () => useContext(CartContext);
