import { useState } from 'react';
import {updateUserProfileAPI} from "../Api/userUpdate";

const useUserUpdate = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateUserProfile = async (formData, token) => {
        setLoading(true);
        setError(null);

        try {
            const response = await updateUserProfileAPI(formData, token);
            // Optionally, you can handle the response, such as updating the state or displaying a success message
            return response;
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { updateUserProfile, loading, error };
};

export default useUserUpdate;
