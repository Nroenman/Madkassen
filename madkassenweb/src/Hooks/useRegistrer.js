import { useState } from "react";
import { registerUser } from "../Api/RegistrerUserService";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const useRegister = () => {
    const [error, setError] = useState(null);
    const [validUserName, setValidUserName] = useState(false);
    const [validPassword, setValidPassword] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(false);

    const validateUserName = (userName) => {
        const isValid = USER_REGEX.test(userName);
        setValidUserName(isValid);
        return isValid;
    };

    const validatePassword = (password, confirmPassword) => {
        const isValid = PWD_REGEX.test(password);
        setValidPassword(isValid);
        setPasswordMatch(password === confirmPassword);
        return isValid && password === confirmPassword;
    };

    const register = async (email, password, userName) => {
        setError(null); // Clear previous errors

        // Additional checks before proceeding to API call
        if (!validateUserName(userName)) {
            setError("Invalid username. Please follow the username rules.");
            return null;
        }

        if (!validatePassword(password, password)) {
            setError("Invalid password. Please follow the password rules.");
            return null;
        }

        try {
            const response = await registerUser(email, password, userName);
            return response; // Return success response if needed
        } catch (err) {
            console.error("Registration error:", err.message);
            setError(err.response?.data || "Registration failed. Please try again.");
            return null; // Return null to indicate failure
        }
    };

    return {
        register,
        error,
        validateUserName,
        validatePassword,
        validUserName,
        validPassword,
        passwordMatch,
    };
};

export default useRegister;
