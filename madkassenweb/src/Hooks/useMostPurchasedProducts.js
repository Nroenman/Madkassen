import { useState, useEffect } from "react";
import { fetchMostPurchasedProducts, fetchUserMostPurchasedProducts } from "../Api/popularProductsService";

const useMostPurchasedProducts = (userId) => {
    const [mostPurchased, setMostPurchased] = useState({
        userProducts: [],
        overallProducts: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getMostPurchasedProducts = async () => {
            try {
                const userProducts =  await fetchUserMostPurchasedProducts();
                const overallProducts = await fetchMostPurchasedProducts();

                setMostPurchased({
                    userProducts: userProducts,
                    overallProducts: overallProducts,
                });
            } catch (err) {
                setError("Failed to fetch most purchased products.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        getMostPurchasedProducts();
    }, [userId]);

    return { mostPurchased, loading, error };
};

export default useMostPurchasedProducts;
