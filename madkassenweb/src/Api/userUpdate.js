import axios from 'axios';

export const fetchUserProfile = async (token) => {
    try {
        const response = await axios.get('http://localhost:5092/api/Users/profile', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch user profile');
    }
};

export const updateUserProfileAPI = async (formData, token) => {
    try {
        const response = await axios.put('http://localhost:5092/api/Users/update-profile', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to update user profile');
    }
};
