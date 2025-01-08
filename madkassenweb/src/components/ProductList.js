import React, {useState, useEffect, useRef} from "react";
import {Link} from "react-router-dom";
import useProducts from "../Hooks/useProducts";
import useProductsByCategory from "../Hooks/useProductsByCategory";
import useMostPurchasedProducts from "../Hooks/useMostPurchasedProducts";
import LeftFilterNav from "./left-filter-nav";

const ScrollableRow = ({title, products}) => {
    const containerRef = useRef(null);

    const handleScroll = (direction) => {
        const container = containerRef.current;
        if (!container) return;

        const scrollAmount = 300; // Adjust as needed
        if (direction === "left") {
            container.scrollBy({left: -scrollAmount, behavior: "smooth"});
        } else {
            container.scrollBy({left: scrollAmount, behavior: "smooth"});
        }
    };


    return (
        <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">{title}</h3>
            <div className="relative">
                {/* Scroll Buttons */}
                <button
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full z-10"
                    onClick={() => handleScroll("left")}
                    aria-label="Scroll Left"
                >
                    ◀
                </button>
                <button
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full z-10"
                    onClick={() => handleScroll("right")}
                    aria-label="Scroll Right"
                >
                    ▶
                </button>

                {/* Product Row */}
                <div
                    ref={containerRef}
                    className="flex overflow-x-auto space-x-4"
                    style={{scrollSnapType: "x mandatory", msOverflowStyle: "none", scrollbarWidth: "none"}}
                >
                    {products.map((product) => (
                        <Link
                            key={product.productId}
                            to={`/products/${product.productId}`}
                            className="group w-40 flex-shrink-0"
                        >
                            <img
                                src={product.imageUrl}
                                alt={product.productName}
                                className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75"
                            />
                            <h3 className="mt-4 text-sm text-gray-700">{product.productName}</h3>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

const ProductList = ({initialCategoryId = null, userId}) => {
    const [categoryId, setCategoryId] = useState(initialCategoryId);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const {products: allProducts, loading: allLoading, error: allError} = useProducts();
    const {products: categoryProducts, loading: categoryLoading, error: categoryError, noProducts} =
        useProductsByCategory(categoryId);

    const {mostPurchased} = useMostPurchasedProducts(userId);

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
            <LeftFilterNav setCategoryId={setCategoryId}/>

            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                <h2 className="sr-only">Products</h2>

                {/* Scrollable Rows */}
                {mostPurchased.userProducts.length > 0 && (
                    <ScrollableRow title="Dine mest købte produkter" products={mostPurchased.userProducts}/>
                )}
                {mostPurchased.overallProducts.length > 0 && (
                    <ScrollableRow title="De mest populære produkter blandt andre"
                                   products={mostPurchased.overallProducts}/>
                )}

                {/* If no products are found for the category, display message */}
                {categoryId && noProducts && (
                    <div className="text-center text-xl text-red-500 mb-4">
                        No products available for this category.
                    </div>
                )}

                {/* Product Grid */}
                <div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-6 xl:gap-x-8">
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
                                <p className="mt-1 text-lg font-medium text-gray-900">{product.price} DKK</p>

                            </Link>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductList;
