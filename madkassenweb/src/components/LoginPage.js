import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import useAuth from '../Hooks/useAuth';
import logomad from "../images/logomad.png";
import {Link} from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false); // Added state to toggle password visibility
    const { login, error } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password);
    };

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-gray-100">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src={logomad}
                    alt="Your Company"
                />
                <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
                    Login
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2 relative">
                            <FontAwesomeIcon
                                icon={faEnvelope}
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                            />
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="block w-full rounded-md bg-white px-10 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                placeholder="Enter your email"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                                Password
                            </label>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                        <div className="mt-2 relative">
                            <input
                                type={passwordVisible ? "text" : "password"} // Toggle between text and password
                                name="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                onClick={() => setPasswordVisible(!passwordVisible)} // Toggle visibility
                                className="absolute right-3 top-2 text-gray-500"
                            >
                                <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
                            </button>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600"
                        >
                            Log ind
                        </button>
                    </div>
                </form>

                {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

                <p className="mt-10 text-center text-sm text-gray-500">
                    Ikke en bruger?{' '}
                    <Link to="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Opret dig her
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
