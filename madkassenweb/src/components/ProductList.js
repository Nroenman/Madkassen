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

    const allergyTypeNames = {
        0: "Gluten",
        1: "Laktose",
        2: "Nødder",
        3: "Skaldyr",
        4: "Soya",
        5: "Æg"
    };

    return (
        <div>
            <h1>Produkter</h1>
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
