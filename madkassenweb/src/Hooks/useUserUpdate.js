import { useState } from 'react';

// Example of how you might use the fetch API to update the user's profile
const useUserUpdate = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateUserProfile = async (formData) => {
        setLoading(true);
        setError(null); // Reset error on new attempt

        try {
            const token = localStorage.getItem('authToken'); // Assuming you're using JWT authentication
            if (!token) {
                throw new Error('User is not authenticated');
            }

            const response = await fetch('http://localhost:5092/api/Users/Update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formData), // Send the form data as the body
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update profile');
            }

            return response.json();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return { updateUserProfile, loading, error };
};

export default useUserUpdate;
