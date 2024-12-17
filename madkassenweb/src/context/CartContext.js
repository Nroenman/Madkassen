import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const CartContext = createContext();

// Helper function to generate a random user ID
const generateRandomUserId = () => {
    return Math.floor(Math.random() * 1000000); // Generates a random number, can be replaced with UUID
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [userId, setUserId] = useState(null);

    // Load cart items from localStorage and set user ID on page load
    useEffect(() => {
        const storedUserId = JSON.parse(localStorage.getItem("userId"));
        if (storedUserId) {
            setUserId(storedUserId);
        } else {
            const randomUserId = generateRandomUserId();
            localStorage.setItem("userId", JSON.stringify(randomUserId));
            setUserId(randomUserId);
        }

        // Load cart items only once when the component mounts
        const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        setCartItems(storedCartItems);
    }, []);  // Empty dependency array to ensure it runs only once

    // Update localStorage whenever cartItems change
    useEffect(() => {
        if (cartItems.length > 0) {
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
        }
    }, [cartItems]);  // This will run only when cartItems change

    // Add product to cart
    const addToCart = async (product, quantity) => {
        const requestData = {
            productId: product.productId,
            userId: userId,
            quantity: quantity
        };

        try {
            const response = await fetch('http://localhost:5092/api/Cart/add-to-cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            if (!response.ok) {
                const errorDetails = await response.text();
                console.error('Error adding to cart:', errorDetails);
                throw new Error("Failed to add to cart");
            }

            // After adding to the cart, fetch updated cart items from the backend
            fetchCartItems();  // Fetch updated cart from backend

        } catch (error) {
            console.error('Add to cart error:', error);
        }
    };

    // Update product quantity in cart
    const updateQuantity = async (productId, newQuantity) => {
        try {
            const response = await fetch('http://localhost:5092/api/Cart/update-cart-item', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
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
            const response = await fetch(`http://localhost:5092/api/Cart/remove-cart-item?productId=${productId}&userId=${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

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
        try {
            const response = await fetch(`http://localhost:5092/api/Cart/get-cart-items?userId=${userId}`);
            if (response.ok) {
                const data = await response.json();
                console.log('Cart items received:', data); // Check the logged data
                setCartItems(data); // Ensure data is set correctly
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
