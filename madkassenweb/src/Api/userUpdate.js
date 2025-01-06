import axios from 'axios';

export const fetchUserProfile = async (token) => {
    try {
        const response = await axios.get('http://localhost:5092/api/Users/profile', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching user profile:', error.response?.data || error.message);
        throw new Error('Failed to fetch user profile');
    }
};

export const updateUserProfileAPI = async (formData, token) => {
    try {
        const response = await axios.put(
            'http://localhost:5092/api/Users/update-profile',
            formData,
            {
                headers: {
                    'Authorization': `Bearer ${token}`, // Ensure token is passed
                },
            }
        );

        return response.data; // Return response if successful
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message || 'Failed to update user profile');
        }
        throw new Error('Network error while updating user profile');
    }
};
