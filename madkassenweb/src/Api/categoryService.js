import axios from "axios";

const API_URL = "http://localhost:5092/api/Category";

export const fetchCategories = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};