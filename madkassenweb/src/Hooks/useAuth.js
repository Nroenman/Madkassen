import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {jwtDecode} from "jwt-decode";
import { login as apiLogin } from '../Api/Auth'

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

            const {token} = await apiLogin(email, password);
            if (token) {
                localStorage.setItem('authToken', token);
                setSuccessMessage('Login successful!');
                await fetchUserProfileFromToken(token);
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
            const userProfile = await fetchUserProfile(decodedToken.sub, token);
            setUserInfo(userProfile);
        } catch (error) {
            setError('Failed to fetch user profile');
        }
    };

    const fetchUserProfile = async (userId, token) => {
        try {
            const response = await fetch('/api/Users/profile', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user profile');
            }

            const data = await response.json(); // Parse JSON response
            return data; // Return user profile data
        } catch (error) {
            setError('Failed to fetch user profile');
            throw error;
        }
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem('authToken'); // Remove token on logout
        setSuccessMessage('Logged out successfully!');
        setUserInfo(null); // Clear user info
        setTimeout(() => navigate('/login'))
    };

    // Check if user is authenticated
    const isAuthenticated = () => {
        const token = localStorage.getItem('authToken');
        return Boolean(token);
    };

    // Get the current user information
    const getUserInfo = () => {
        return userInfo; // Return user profile info
    };

    // Check if the user is authenticated on component mount (initial load)
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            fetchUserProfileFromToken(token); // If token exists, fetch profile
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
        userInfo
    };
};

export default useAuth;
