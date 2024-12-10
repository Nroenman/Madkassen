import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as apiLogin } from '../Api/Auth';

const useAuth = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const login = async (email, password) => {
        try {
            setError(null);
            const { token } = await apiLogin(email, password);
            localStorage.setItem('authToken', token);
            navigate('/AboutPage');
        } catch (err) {
            setError(err.message);
        }
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        navigate('/login');
    };

    const isAuthenticated = () => {
        const token = localStorage.getItem('authToken');
        return Boolean(token);  // Return true if the token exists, otherwise false
    };

    return { login, logout, isAuthenticated, error };
};

export default useAuth;
