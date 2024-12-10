import axios from "axios";

const API_URL = "http://localhost:5092/api/Users";

export const fetchUsers = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};