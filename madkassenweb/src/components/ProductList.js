import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useProducts from "../Hooks/useProducts";
import useProductsByCategory from "../Hooks/useProductsByCategory";
import LeftFilterNav from "./left-filter-nav";

const ProductList = ({ initialCategoryId = null }) => {
    const [categoryId, setCategoryId] = useState(initialCategoryId);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { products: allProducts, loading: allLoading, error: allError } = useProducts();
    const { products: categoryProducts, loading: categoryLoading, error: categoryError, noProducts } = useProductsByCategory(categoryId);

    useEffect(() => {
        if (categoryId) {
            setProducts(categoryProducts);
            setLoading(categoryLoading);
            setError(categoryError);
        } else {
            setProducts(allProducts);
            setLoading(allLoading);
            setError(allError);
        }
    }, [categoryId, allProducts, categoryProducts, allLoading, categoryLoading, allError, categoryError]);

    // Handle loading state
    if (loading) {
        return <div>Loading products...</div>;
    }

    // Handle error state
    if (error) {
        return <div>{error}</div>;
    }

    const allergyTypeNames = {
        0: "Gluten",
        1: "Laktose",
        2: "Nødder",
        3: "Skaldyr",
        4: "Soya",
        5: "Æg",
    };

    return (
        <div className="flex">
            {/* Sidebar is always visible */}
            <LeftFilterNav setCategoryId={setCategoryId} />

            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                <h2 className="sr-only">Products</h2>

                {/* If no products are found for the category, display message */}
                {categoryId && noProducts && (
                    <div className="text-center text-xl text-red-500 mb-4">
                        No products available for this category.
                    </div>
                )}

                {/* Product Display */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-6 xl:gap-x-8">
                    {products.length === 0 ? (
                        <div className="col-span-full text-center text-lg text-gray-500">
                            No products to display.
                        </div>
                    ) : (
                        products.map((product) => (
                            <Link key={product.productId} to={`/products/${product.productId}`} className="group">
                                <img
                                    src={product.imageUrl}
                                    alt={product.productName}
                                    className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-[7/8]"
                                />
                                <h3 className="mt-4 text-sm text-gray-700">{product.productName}</h3>
                                <p className="mt-1 text-sm text-gray-700">{product.description}</p>
                                <p className="mt-1 text-lg font-medium text-gray-900">${product.price}</p>
                                <p className="mt-1 text-sm text-gray-700">Stock: {product.stockLevel}</p>
                                <p className="text-sm text-gray-700">
    Allergier:{" "}
    {product.allergies ? (
        product.allergyType !== null && product.allergyType !== undefined ? (
            allergyTypeNames[product.allergyType] || "Ukendt Allergi"
        ) : (
            "Ukendt Allergi"
        )
    ) : (
        "Nej"
    )}
</p>

                            </Link>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductList;
