import axios from "axios";

const API_BASE_URL = "http://localhost:5092/api/Product/category";

export const fetchProductsByCategory = async (categoryId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${categoryId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching products by category:", error);
        throw error;
    }
};
