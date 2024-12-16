import {useState} from "react";
import {registerUser} from "../Api/RegistrerUserService";

const useRegister = () => {
    const [error, setError] = useState(null);

    const register = async (email, password) => {
        setError(null); // Clear previous errors
        try {
            const response = await registerUser(email, password);
            console.log('User registered successfully:', response);
            return response; // Return success response if needed
        } catch (err) {
            console.error('Registration error:', err.message);
            setError(err.message);
            return null; // Return null to indicate failure
        }
    };

    return { register, error };
};

export default useRegister;
