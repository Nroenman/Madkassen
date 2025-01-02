import { useState, useEffect } from "react";
import {fetchProductsByCategory} from "../Api/ProductByCategoryService";

// Custom hook to fetch products by category
const useProductsByCategory = (categoryId) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [noProducts, setNoProducts] = useState(false);  // Track if there are no products

    useEffect(() => {
        if (!categoryId) return;  // Skip fetch if categoryId is not provided

        const loadProducts = async () => {
            setLoading(true);  // Set loading state

            try {
                const fetchedProducts = await fetchProductsByCategory(categoryId);

                if (fetchedProducts.length === 0) {
                    setNoProducts(true); // Set flag when there are no products
                } else {
                    setProducts(fetchedProducts);
                    setNoProducts(false); // Reset flag when products are found
                }
            } catch (err) {
                setError(err.message);  // Set error message
                setNoProducts(true);  // Set flag for errors (e.g., category not found)
            } finally {
                setLoading(false);  // Reset loading state
            }
        };

        loadProducts();
    }, [categoryId]);

    return { products, loading, error, noProducts };
};

export default useProductsByCategory;
