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
    const addToCart = async (product, quantity) => {
        const userId = JSON.parse(localStorage.getItem("userId"));
        const requestData = {
            productId: product.productId,
            userId: userId,
            quantity: quantity
        };
    
        console.log('Sending request:', requestData); // Log the request data
    
        try {
            const response = await fetch('http://localhost:5092/api/Cart/add-to-cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });
    
            if (!response.ok) {
                const errorDetails = await response.text();  // Capture the error message for debugging
                console.error('Error adding to cart:', errorDetails);
                throw new Error("Failed to add to cart");
            }
    
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
        } catch (error) {
            console.error('Add to cart error:', error);
        }
    };
    

    

    // Update product quantity in cart
    const updateQuantity = async (productId, newQuantity) => {
        const userId = JSON.parse(localStorage.getItem("userId"));
        try {
            const response = await fetch('http://localhost:5092/api/Cart/update-cart-item', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productId: productId,        // Pass the product ID
                    userId: userId,              // Pass the user ID
                    quantity: newQuantity,       // Pass the updated quantity
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
            const response = await fetch(`http://localhost:5092/api/Cart/remove-from-cart`, {
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
