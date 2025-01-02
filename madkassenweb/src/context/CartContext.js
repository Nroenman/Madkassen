import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

const generateRandomUserId = () => {
    return Math.floor(Math.random() * 1000000);
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [userId, setUserId] = useState(null);
    const [showToast, setShowToast] = useState(false); // Track toast visibility
    const [toastMessage, setToastMessage] = useState(""); // Store the toast message

    useEffect(() => {
        const storedUserId = JSON.parse(localStorage.getItem("userId"));
        if (storedUserId) {
            setUserId(storedUserId);
        } else {
            const randomUserId = generateRandomUserId();
            localStorage.setItem("userId", JSON.stringify(randomUserId));
            setUserId(randomUserId);
        }

        const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        setCartItems(storedCartItems);
    }, []);

    useEffect(() => {
        if (cartItems.length > 0) {
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
        }
    }, [cartItems]);

    const addToCart = async (product, quantity) => {
        if (!userId) {
            console.warn("Cannot add to cart without a userId");
            return;
        }

        const requestData = { productId: product.productId, userId: userId, quantity: quantity };

        try {
            const response = await fetch('http://localhost:5092/api/Cart/add-to-cart', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestData),
            });

            if (!response.ok) {
                const errorDetails = await response.text();
                console.error('Error adding to cart:', errorDetails);
                throw new Error("Failed to add to cart");
            }

            await fetchCartItems();
            // Show toast notification after adding product to cart
            setToastMessage(`${product.productName} has been added to the cart!`);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000); // Hide toast after 3 seconds
        } catch (error) {
            console.error('Add to cart error:', error);
        }
    };

    const removeFromCart = async (productId) => {
        try {
            const response = await fetch(`http://localhost:5092/api/Cart/remove-cart-item?productId=${productId}&userId=${userId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error("Failed to remove from cart");
            }

            setCartItems((prevItems) => prevItems.filter((item) => item.productId !== productId));
        } catch (error) {
            console.error(error);
        }
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

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
                removeFromCart,
                calculateTotal,
                fetchCartItems,
                showToast,
                toastMessage,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
