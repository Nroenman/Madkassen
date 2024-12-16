import axios from 'axios';
const API_URL = "http://localhost:5092/api/Users";

export const registerUser = async (email, password, userName = "Default User") => {  // Add userName as parameter
    try {
        const response = await axios.post(API_URL, {
            email,
            passwordHash: password,
            userName,
            roles: "Consumer"
        });

        console.log('Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error.response?.data || error.message);
        throw error;
    }
};
