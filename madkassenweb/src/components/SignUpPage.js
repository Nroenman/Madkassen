import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faEye, faEyeSlash, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import logomad from "../images/logomad.png";
import useRegister from "../Hooks/useRegistrer";

const SignUpPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [validPassword, setValidPassword] = useState(false); // Password validation state
    const [passwordMatch, setPasswordMatch] = useState(false); // Password match state
    const [validEmail, setValidEmail] = useState(false); // Email validation state
    const [validUserName, setValidUserName] = useState(false); // Username validation state for uppercase and length
    const { register, error, validateUserName } = useRegister();
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await register(email, password, userName);
        if (response) {
            setSuccessMessage('Account created successfully! Redirecting to login...');
            setTimeout(() => window.location.href = "/login", 2000);
        }
    };

    const validatePasswordFields = (password, confirmPassword) => {
        const minLength = password.length >= 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);

        setValidPassword(minLength && hasUpperCase && hasLowerCase && hasNumber);
        setPasswordMatch(password === confirmPassword);
    };

    const validateEmailField = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setValidEmail(emailRegex.test(email));
    };

    const validateUserNameField = (userName) => {
        const hasUpperCase = /[A-Z]/.test(userName);
        const isLongEnough = userName.length >= 5;
        setValidUserName(hasUpperCase && isLongEnough);
    };

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-gray-100">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-10 w-auto" src={logomad} alt="Madkassen"/>
                <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
                    Create Account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Username Field */}
                    <div>
                        <label htmlFor="userName" className="block text-sm font-medium text-gray-900">
                            Username
                            <FontAwesomeIcon icon={faCheck} className={validUserName ? "text-green-500 ml-2" : "hidden"} />
                            <FontAwesomeIcon icon={faTimes} className={!validUserName && userName ? "text-red-500 ml-2" : "hidden"} />
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                id="userName"
                                value={userName}
                                onChange={(e) => {
                                    setUserName(e.target.value);
                                    validateUserNameField(e.target.value);
                                }}
                                required
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                            />
                        </div>
                        {userName && (
                            <div className="mt-1 text-sm text-gray-600">
                                <ul>
                                    <li className={validUserName ? "text-green-600" : "text-red-600"}>
                                        Contains at least 1 uppercase letter.
                                    </li>
                                    <li className={userName.length >= 5 ? "text-green-600" : "text-red-600"}>
                                        At least 5 characters long.
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Email Field */}
                    <div className="mt-2 relative">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                            Email
                            <FontAwesomeIcon icon={faEnvelope}
                                             className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10"/>
                            <FontAwesomeIcon icon={faCheck} className={validEmail ? "text-green-500 ml-2" : "hidden"}/>
                            <FontAwesomeIcon icon={faTimes}
                                             className={!validEmail && email ? "text-red-500 ml-2" : "hidden"}/>
                        </label>
                        <div className="mt-2 relative">
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    validateEmailField(e.target.value);
                                }}
                                required
                                className="block w-full rounded-md bg-white pl-10 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                placeholder="Enter your email"
                            />
                        </div>
                        {email && (
                            <div className="mt-1 text-sm text-gray-600">
                                <ul>
                                    <li className={validEmail ? "text-green-600" : "text-red-600"}>
                                        Must include an "@" and a "."
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Password Field */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                            Password
                            <FontAwesomeIcon icon={faCheck} className={validPassword ? "text-green-500 ml-2" : "hidden"} />
                            <FontAwesomeIcon icon={faTimes} className={!validPassword && password ? "text-red-500 ml-2" : "hidden"} />
                        </label>
                        <div className="mt-2 relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    validatePasswordFields(e.target.value, confirmPassword);
                                }}
                                required
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                            </button>
                        </div>
                        <div className="mt-1 text-sm text-gray-600">
                            {password && (
                                <ul>
                                    <li className={password.length >= 8 ? "text-green-600" : "text-red-600"}>
                                        At least 8 characters long.
                                    </li>
                                    <li className={/[A-Z]/.test(password) ? "text-green-600" : "text-red-600"}>
                                        Contains an uppercase letter.
                                    </li>
                                    <li className={/[a-z]/.test(password) ? "text-green-600" : "text-red-600"}>
                                        Contains a lowercase letter.
                                    </li>
                                    <li className={/\d/.test(password) ? "text-green-600" : "text-red-600"}>
                                        Contains a number.
                                    </li>
                                </ul>
                            )}
                        </div>
                    </div>

                    {/* Confirm Password Field */}
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900">
                            Confirm Password
                            <FontAwesomeIcon icon={faCheck} className={passwordMatch ? "text-green-500 ml-2" : "hidden"} />
                            <FontAwesomeIcon icon={faTimes} className={!passwordMatch && confirmPassword ? "text-red-500 ml-2" : "hidden"} />
                        </label>
                        <div className="mt-2 relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                    validatePasswordFields(password, e.target.value);
                                }}
                                required
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                placeholder="Confirm your password"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                            >
                                <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                            </button>
                        </div>
                        {!passwordMatch && confirmPassword && (
                            <div className="mt-1 text-sm text-red-600">
                                Passwords do not match.
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            disabled={!validUserName || !validPassword || !passwordMatch || !validEmail}
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>

                {successMessage && <p className="mt-4 text-green-500 text-center">{successMessage}</p>}
                {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
            </div>
        </div>
    );
};

export default SignUpPage;
