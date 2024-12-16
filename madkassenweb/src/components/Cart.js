import React from "react";
import { useCart } from "../context/CartContext";

const Cart = () => {
    const { cartItems, updateQuantity, removeFromCart, calculateTotal } = useCart();

    if (cartItems.length === 0) {
        return <div className="p-4">Your basket is empty.</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Your Basket</h1>
            {cartItems.map((item) => (
                <div key={item.productId} className="flex justify-between items-center border-b py-2">
                    <div>
                        <h2 className="text-lg">{item.productName}</h2>
                        <p>${item.price} x {item.quantity}</p>
                    </div>
                    <div className="flex gap-2">
                        <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.productId, Number(e.target.value))}
                            className="w-16 px-2 py-1 border rounded"
                        />
                        <button onClick={() => removeFromCart(item.productId)} className="text-red-500">Remove</button>
                    </div>
                </div>
            ))}
            <h2 className="text-lg font-bold mt-4">Total: ${calculateTotal().toFixed(2)}</h2>
        </div>
    );
};

export default Cart;
