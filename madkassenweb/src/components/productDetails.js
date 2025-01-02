import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useProducts from "../Hooks/useProducts";
import { useCart } from "../context/CartContext";
import { Toast } from "flowbite-react";
import { HiCheck } from "react-icons/hi";

const ProductDetails = () => {
    const { id } = useParams(); // Get the product ID from the URL
    const { products, loading, error } = useProducts();
    const { addToCart } = useCart(); // Access cart context
    const [quantity, setQuantity] = useState(1);
    const [showToast, setShowToast] = useState(false);

    if (loading) {
        return <div>Loading product...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    // Find the product by ID
    const product = products.find((p) => p.productId.toString() === id);

    if (!product) {
        return <div>Product not found.</div>;
    }

    const allergyTypeNames = {
        0: "Gluten",
        1: "Laktose",
        2: "Nødder",
        3: "Skaldyr",
        4: "Soya",
        5: "Æg"
    };

    const handleAddToCart = () => {
        addToCart(product, quantity);
        setShowToast(true); // Show the toast notification
    };

    return (
        <div className="bg-orange-50 min-h-screen">
            <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                {/* Product Details Section */}
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Product Image */}
                    <img
                        src={product.imageUrl}
                        alt={product.productName}
                        className="w-full md:w-1/2 rounded-lg object-cover"
                    />
                    {/* Product Info */}
                    <div className="flex flex-col gap-4">
                        <h1 className="text-2xl font-bold text-gray-900">{product.productName}</h1>
                        <p className="text-lg text-gray-700">{product.description}</p>
                        <p className="text-xl font-semibold text-gray-900">${product.price}</p>
                        <p className="text-sm text-gray-700">Stock: {product.stockLevel}</p>
                        <p className="text-sm text-gray-700">
                            Allergier:{" "}
                            {product.allergies ? (
                                product.allergyType ? (
                                    allergyTypeNames[product.allergyType] || "Ukendt Allergi"
                                ) : (
                                    "Ukendt Allergi"
                                )
                            ) : (
                                "Nej"
                            )}
                        </p>
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                                className="w-16 px-2 py-1 border rounded"
                            />
                            <button
                                onClick={handleAddToCart}
                                className="px-4 py-2 bg-orange-500 text-white font-bold rounded-lg"
                            >
                                Add to Basket
                            </button>
                        </div>
                    </div>
                </div>

                {/* Toast Notification */}
                {showToast && (
                    <Toast>
                        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                            <HiCheck className="h-5 w-5" />
                        </div>
                        <div className="ml-3 text-sm font-normal">Product added to basket!</div>
                        <Toast.Toggle onClick={() => setShowToast(false)} />
                    </Toast>
                )}
            </div>
        </div>
    );
};

export default ProductDetails;
