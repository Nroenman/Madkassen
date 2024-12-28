import { useState } from "react";
import { registerUser } from "../Api/RegistrerUserService";

const useRegister = () => {
    const [error, setError] = useState(null);
    const [validUserName, setValidUserName] = useState(false);
    const [validEmail, setValidEmail] = useState(false);
    const [validPassword, setValidPassword] = useState(false);

    const validateUserName = (userName) => {
        if (!userName) {
            setValidUserName(false);
            return false;
        }

        const hasUpperCase = /[A-Z]/.test(userName);
        const isLongEnough = userName.length >= 5;
        const isValid = hasUpperCase && isLongEnough;

        setValidUserName(isValid);
        return isValid;
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(email);

        setValidEmail(isValid);
        return isValid;
    };

    const validatePassword = (password) => {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const isLongEnough = password.length >= 8;

        const isValid = hasUpperCase && hasNumber && hasSpecialChar && isLongEnough;

        setValidPassword(isValid);
        return isValid;
    };

    const register = async (email, password, userName) => {
        setError(null);

        if (!validateUserName(userName)) {
            setError("Invalid username. Please ensure the username is at least 5 characters long and contains at least one uppercase letter.");
            return null;
        }

        if (!validateEmail(email)) {
            setError("Invalid email. Please ensure the email contains '@' and '.' symbols.");
            return null;
        }

        if (!validatePassword(password)) {
            setError("Invalid password. Ensure it is at least 8 characters long, contains one uppercase letter, one number, and one special character.");
            return null;
        }

        try {
            const response = await registerUser(email, password, userName);
            return response;
        } catch (err) {
            console.error("Registration error:", err.message);
            const errorMessage = err.response?.data || "Registration failed. Please try again.";
            setError(errorMessage);
            return null;
        }
    };

    return {
        register,
        error,
        validateUserName,
        validUserName,
        validateEmail,
        validEmail,
        validatePassword,
        validPassword,
    };
};

export default useRegister;
