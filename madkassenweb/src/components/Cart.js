import React, { useEffect } from "react";
import { useCart } from "../context/CartContext";

const Cart = () => {
    const { cartItems, updateQuantity, removeFromCart, calculateTotal, fetchCartItems } = useCart();

    // Fetch cart items when the component mounts
    useEffect(() => {
        const userId = JSON.parse(localStorage.getItem("userId"));
        if (userId) {
            fetchCartItems(userId); // Fetch cart items for the logged-in user
        }
    }, [fetchCartItems]); // Depend on fetchCartItems, so it gets called when the component is mounted

    if (cartItems.length === 0) {
        return (
            <div className="p-8 text-center">
                <h1 className="text-xl font-bold">Your basket is empty.</h1>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Your Basket</h1>
            <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                <table className="min-w-full table-auto text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-3 px-6 text-sm font-medium text-gray-600">Product</th>
                            <th className="py-3 px-6 text-sm font-medium text-gray-600">Price</th>
                            <th className="py-3 px-6 text-sm font-medium text-gray-600">Quantity</th>
                            <th className="py-3 px-6 text-sm font-medium text-gray-600">Total</th>
                            <th className="py-3 px-6 text-sm font-medium text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item) => (
                            <tr key={item.productId} className="border-b">
                                <td className="py-3 px-6 flex items-center">
                                    <div>
                                        <p className="text-gray-800 font-semibold">{item.productName}</p>
                                    </div>
                                </td>
                                <td className="py-3 px-6 text-gray-600">${item.price}</td>
                                <td className="py-3 px-6">
                                    <input
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) => updateQuantity(item.productId, Number(e.target.value))}
                                        className="w-16 px-2 py-1 border rounded-md text-center"
                                    />
                                </td>
                                <td className="py-3 px-6 text-gray-600">${(item.price * item.quantity).toFixed(2)}</td>
                                <td className="py-3 px-6">
                                    <button
                                        onClick={() => removeFromCart(item.productId)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-6 flex justify-between items-center">
                <h2 className="text-xl font-semibold">Total: ${calculateTotal().toFixed(2)}</h2>
                <button
                    className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition"
                    onClick={() => alert("Proceeding to checkout")}
                >
                    Checkout
                </button>
            </div>
        </div>
    );
};

export default Cart;
