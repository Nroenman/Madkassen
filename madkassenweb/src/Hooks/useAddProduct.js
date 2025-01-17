import { useState } from "react";
import { addProduct } from "../Api/AddProductService";

const useAddProductForm = () => {
    const [productData, setProductData] = useState({
        productId: 0,
        productName: "",
        description: "",
        categoryId: "",
        allergies: false,
        allergyType: 0,
        price: "",
        stockLevel: "",
        imageUrl: "",
    });
    const [formError, setFormError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProductData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setFormError(null);

        // Correcting types for price, categoryId, allergyType
        const updatedProductData = {
            ...productData,
            price: Number(productData.price),  // Ensure price is a number
            categoryId: Number(productData.categoryId),  // Ensure categoryId is a number
            allergyType: Number(productData.allergyType),  // Ensure allergyType is a number
        };

        // Log the corrected data before sending
        console.log("Sending corrected product data:", updatedProductData);

        try {
            const data = await addProduct(updatedProductData);
            console.log("Product added successfully:", data);
            alert("Product added successfully!");
            setProductData({
                productId: 0,
                productName: "",
                description: "",
                categoryId: "",
                allergies: false,
                allergyType: 0,
                price: "",
                stockLevel: "",
                imageUrl: "",
            });
            setFormError(null);
        } catch (err) {
            console.error("Failed to add product:", err);
            setFormError("Failed to add product.");
            setError(err.message);  // Set error message here
        } finally {
            setLoading(false);
        }
    };
    return {
        productData,
        formError,
        handleChange,
        handleSubmit,
        loading,
        error,
    };
};

export default useAddProductForm;
