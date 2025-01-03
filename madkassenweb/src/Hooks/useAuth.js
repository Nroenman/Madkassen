import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as apiLogin } from '../Api/Auth';
import { jwtDecode } from "jwt-decode";
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

    const getUserInfo = () => {
        const token = localStorage.getItem('authToken');
        if (token) {
            const decodedToken = jwtDecode(token);
            return decodedToken.sub;
        }
        return null;
    };

    return { login, logout, isAuthenticated, error, successMessage, getUserInfo };
};

export default useAuth;
