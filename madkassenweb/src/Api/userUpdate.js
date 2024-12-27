import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:5092/api/Users",
    headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    }
});

export const updateUser = async (data) => {
    try {
        const response = await api.put('', data);
        return response.status === 204; // No Content
    } catch (error) {
        console.error('Error updating user:', error.response?.data || error.message);
        throw error.response?.data || error;
    }
};
