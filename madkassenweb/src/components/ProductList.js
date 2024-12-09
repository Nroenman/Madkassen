import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:5092/api/Product");
                setProducts(response.data); // Axios automatically parses JSON
            } catch (err) {
                console.error("Error fetching products:", err);
                setError(err.response?.data?.message || "Something went wrong");
            }
        };

        fetchProducts();
    }, []);


    const allergyTypeNames = {
        0: "Gluten",
        1: "Laktose",
        2: "Nødder",
        3: "Skaldyr",
        4: "Soya",
        5: "Æg"
    };


    if (products.length === 0) {
        return <div>No products found.</div>;
    }

    return (
        <div>
            <h1>Products</h1>
            <ul>
                {products.map((product) => (
                    <li key={product.productId}>
                        <h2>{product.productName}</h2>
                        <p>Beskrivelse: {product.description}</p>
                        <p>
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
                        <p>Pris: {product.price} DKK</p>
                        <p>Lagerantal: {product.stockLevel}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};


export default ProductList;
