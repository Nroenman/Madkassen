import { useState } from 'react';
import { updateUser } from '../Api/userUpdate';

const useUserUpdate = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateUserProfile = async (data) => {
        setLoading(true);
        setError(null);
        try {
            await updateUser(data);
            alert('Profile updated successfully!');
        } catch (err) {
            setError(err?.message || 'Failed to update profile.');
        } finally {
            setLoading(false);
        }
    };

    return { updateUserProfile, loading, error };
};

export default useUserUpdate;
