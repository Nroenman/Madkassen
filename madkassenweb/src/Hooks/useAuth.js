import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as apiLogin } from '../Api/Auth';

const useAuth = () => {
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const navigate = useNavigate();

    const login = async (email, password) => {
        try {
            setError(null); // Reset error state
            setSuccessMessage(null);
            const { token } = await apiLogin(email, password);

            if (token) {
                localStorage.setItem('authToken', token);
                setSuccessMessage('Login successful!');
                navigate('/AboutPage');
            } else {
                setError('Login failed!');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setSuccessMessage('Logged out successfully!');
        setTimeout(() => navigate('/login'), 2000);
    };

    const isAuthenticated = () => {
        const token = localStorage.getItem('authToken');
        return Boolean(token);
    };

    return { login, logout, isAuthenticated, error, successMessage }; // Return state for successMessage and error
};

export default useAuth;
