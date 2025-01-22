import axios from "axios";

const API_URL = "http://localhost:5092/api/Product";
const getAuthToken = () => {
    return localStorage.getItem("authToken");
}
export const addProduct = async (productData) => {
    try {
        const token = getAuthToken();
        const response = await axios.post(API_URL, productData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error adding product:", error);
        throw error;
        if (error.response) {
            console.error("Response Data:", error.response.data);
            console.error("Response Status:", error.response.status);
            console.error("Error adding product:", error);

            // Log the response data from the server if available
            if (error.response) {
                console.error("Response Data:", error.response.data);
                console.error("Response Status:", error.response.status);
            }

            throw error; // Re-throw the error


        }
    }
}