import React from "react";
import useProducts from "../Hooks/useProducts"; // Import the hook

const ProductList = () => {
    const { products, loading, error } = useProducts(); // Use the hook

    if (loading) {
        return <div>Loading products...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    // Assuming allergies is an array, adjust this check accordingly
    const allergyTypeNames = {
        0: "Gluten",
        1: "Laktose",
        2: "Nødder",
        3: "Skaldyr",
        4: "Soya",
        5: "Æg"
    };

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                <h2 className="sr-only">Products</h2>

                {/* Grid layout for responsive products per row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-6 xl:gap-x-8">
                    {products.map((product) => (
                        <a key={product.productId} href="#" className="group">
                            {/* Placeholder image */}
                            <img
                                alt={product.productName}
                                src="https://via.placeholder.com/200"
                                className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-[7/8]"
                            />
                            <h3 className="mt-4 text-sm text-gray-700">{product.productName}</h3>
                            <p className="mt-1 text-sm text-gray-700">{product.description}</p>
                            <p className="mt-1 text-lg font-medium text-gray-900">${product.price}</p>
                            <p className="mt-1 text-sm text-gray-700">Stock: {product.stockLevel}</p>
                            <p className="mt-1 text-sm text-gray-700">
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
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductList;
