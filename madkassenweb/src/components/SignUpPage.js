import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logomad from "../images/logomad.png";
import { registerUser } from "../Api/RegistrerUserService";

const SignUpPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(''); // State for success message
    const [passwordVisible, setPasswordVisible] = useState(false); // Toggle password visibility
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // Toggle confirm password visibility
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match!');
            setSuccessMessage('');
            return;
        }

        try {
            await registerUser(email, password, userName);
            setSuccessMessage('Account created successfully! Please log in.'); // Success message
            setError(null); // Clear any previous error
            setTimeout(() => {
                navigate('/login'); // Redirect to login after a short delay
            }, 2000);
        } catch (err) {
            setError(err.message || 'Something went wrong!');
            setSuccessMessage('');
        }
    };

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-gray-100">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src={logomad}
                    alt="Madkassen"
                />
                <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
                    Create Account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="userName" className="block text-sm font-medium text-gray-900">
                            Username
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                name="userName"
                                id="userName"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                required
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                placeholder="Indtast Brugernavn"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                placeholder="Indtast email"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                            Password
                        </label>
                        <div className="mt-2 relative">
                            <input
                                type={passwordVisible ? "text" : "password"} // Toggle between password and text
                                name="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                placeholder="Indtast din kode"
                            />
                            <button
                                type="button"
                                onClick={() => setPasswordVisible(!passwordVisible)}
                                className="absolute right-2 top-2 text-sm text-indigo-600"
                            >
                                {passwordVisible ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-900">
                            Confirm Password
                        </label>
                        <div className="mt-2 relative">
                            <input
                                type={confirmPasswordVisible ? "text" : "password"}
                                name="confirm-password"
                                id="confirm-password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                placeholder="Bekræft din kode"
                            />
                            <button
                                type="button"
                                onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                                className="absolute right-2 top-2 text-sm text-indigo-600"
                            >
                                {confirmPasswordVisible ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>

                {successMessage && (
                    <p className="mt-4 text-green-500 text-center">{successMessage}</p> // Success message
                )}

                {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

                <p className="mt-10 text-center text-sm text-gray-500">
                    Allerede en bruger?{' '}
                    <a href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Log in
                    </a>
                </p>
            </div>
        </div>
    );
};

export default SignUpPage;
