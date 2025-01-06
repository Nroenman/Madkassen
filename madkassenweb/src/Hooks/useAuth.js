import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as apiLogin } from '../Api/Auth'; // Import login API function
import { fetchUserProfile } from '../Api/userUpdate';
import {jwtDecode} from "jwt-decode"; // Import centralized API call

const useAuth = () => {
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [userInfo, setUserInfo] = useState(null); // Store user profile data
    const [loading, setLoading] = useState(false); // For loading state
    const navigate = useNavigate();

    const login = async (email, password) => {
        try {
            setError(null); // Reset error state
            setSuccessMessage(null); // Reset success message state
            setLoading(true); // Start loading

            const { token } = await apiLogin(email, password); // Centralized API call
            if (token) {
                localStorage.setItem('authToken', token);
                setSuccessMessage('Login successful!');
                await fetchUserProfileFromToken(token);
                localStorage.removeItem("userId")
                navigate('/AboutPage');
            } else {
                setError('Login failed!');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchUserProfileFromToken = async (token) => {
        try {
            const decodedToken = jwtDecode(token);
            if (!decodedToken || !decodedToken.sub) {
                throw new Error('Invalid token structure');
            }
            const userProfile = await fetchUserProfile(token); // Reuse centralized function
            setUserInfo(userProfile);
        } catch (error) {
            console.error('Error fetching user profile:', error.message);
            setError('Failed to fetch user profile');
        }
    };

    const logout = () => {
        localStorage.removeItem('authToken'); // Remove token on logout
        setSuccessMessage('Logged out successfully!');
        setUserInfo(null); // Clear user info
        setTimeout(() => navigate('/login'))
    };

    const isAuthenticated = () => {
        const token = localStorage.getItem('authToken');
        return Boolean(token);
    };

    const getUserInfo = () => {
        return userInfo; // Return user profile info
    };

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            fetchUserProfileFromToken(token).catch(err => {
                console.error('Failed to fetch profile on mount:', err.message);
            });
        }
    }, []);

    return {
        login,
        logout,
        isAuthenticated,
        error,
        successMessage,
        getUserInfo,
        loading,
        userInfo,
    };
};

export default useAuth;
