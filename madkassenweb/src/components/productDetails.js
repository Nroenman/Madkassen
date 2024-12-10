import React from "react";
import { useParams } from "react-router-dom";
import useProducts from "../Hooks/useProducts";

const ProductDetails = () => {
    const { id } = useParams(); // Get the product ID from the URL
    const { products, loading, error } = useProducts();

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

    return (
        <div className="bg-orange-50 min-h-screen">
            <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
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
                        <button className="mt-4 px-4 py-2 bg-orange-500 text-white font-bold rounded-lg">
                            Add to Basket
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
