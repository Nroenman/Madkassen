import axios from "axios";

const API_URL = "http://localhost:5092/api/Order"; // Adjust the endpoint if necessary

// Function to get the auth token from localStorage
const getAuthToken = () => {
    return localStorage.getItem("authToken"); // Assuming the token is stored in localStorage
};

// Fetch most purchased products for a specific user in the last 30 days
export const fetchUserMostPurchasedProducts = async (userId) => {
    try {
        const token = getAuthToken(); // Get the token
        const response = await axios.get(`${API_URL}/most-purchased/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the request headers
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching user most purchased products:", error);
        throw error;
    }
};

// Fetch the most purchased products overall in the last 30 days
export const fetchMostPurchasedProducts = async () => {
    try {
        const token = getAuthToken(); // Get the token
        const response = await axios.get(`${API_URL}/most-purchased`, {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the request headers
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching most purchased products:", error);
        throw error;
    }
};
