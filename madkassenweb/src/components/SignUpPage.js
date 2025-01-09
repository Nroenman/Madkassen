import React, {useState, useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash, faEnvelope, faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";
import logomad from "../images/logomad.png";
import useRegister from "../Hooks/useRegistrer";

const SignUpPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const {
        register,
        error,
        validateUserName,
        validUserName,
        validateEmail,
        validEmail,
        validatePassword,
        validPassword
    } = useRegister();
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        // Validate the password fields on page load to handle initial validation
    }, [password, confirmPassword]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted:", {email, password, userName});

        const response = await register(email, password, userName);
        if (response) {
            setSuccessMessage("Din konto er blevet oprettet! Du bliver nu omdirigeret til login siden...");
            setTimeout(() => (window.location.href = "/login"), 2000);
        }
    };

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-gray-100">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-10 w-auto" src={logomad} alt="Madkassen"/>
                <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
                    Opret konto
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Username Field */}
                    <div>
                        <label htmlFor="userName" className="block text-sm font-medium text-gray-900">
                            Brugernavn
                            <FontAwesomeIcon icon={faCheck}
                                             className={validUserName ? "text-green-500 ml-2" : "hidden"}/>
                            <FontAwesomeIcon icon={faTimes}
                                             className={!validUserName && userName ? "text-red-500 ml-2" : "hidden"}/>
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                id="userName"
                                value={userName}
                                onChange={(e) => {
                                    setUserName(e.target.value);
                                    validateUserName(e.target.value);
                                }}
                                required
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                placeholder="Angiv Brugernavn"
                            />
                        </div>
                        {userName && (
                            <div className="mt-1 text-sm text-gray-600">
                                <ul>
                                    <li className={/[A-Z]/.test(userName) ? "text-green-600" : "text-red-600"}>Skal indeholde et stort bogstav.
                                    </li>
                                    <li className={userName.length >= 5 ? "text-green-600" : "text-red-600"}>Skal være mindst 5 karakterer langt.
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
                                    validateEmail(e.target.value);
                                }}
                                required
                                className="block w-full rounded-md bg-white pl-10 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                placeholder="Angiv Email adresse"
                            />
                        </div>
                        {email && (
                            <div className="mt-1 text-sm text-gray-600">
                                <ul>
                                    <li className={validEmail ? "text-green-600" : "text-red-600"}>Skal indeholde "@"
                                        og et "." eks. din@mail.dk.
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Password Field */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                            Password
                        </label>
                        <div className="mt-2 relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    validatePassword(e.target.value);
                                }}
                                required
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                placeholder="Angiv Password"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye}/>
                            </button>
                        </div>
                        {password && (
                            <div className="mt-1 text-sm text-gray-600">
                                <ul>
                                    <li className={password.length >= 8 ? "text-green-600" : "text-red-600"}>Skal minimum have 8 karakterer.
                                    </li>
                                    <li className={/[A-Z]/.test(password) ? "text-green-600" : "text-red-600"}>Skal inedholde minimum ét stort bogstav.
                                    </li>
                                    <li className={/[0-9]/.test(password) ? "text-green-600" : "text-red-600"}>Skal indeholde minimum ét tal.
                                    </li>
                                    <li className={/[!@#$%^&*(),.?":{}|<>]/.test(password) ? "text-green-600" : "text-red-600"}>Skal indeholde minimum ét specialtegn.
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Confirm Password Field */}
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900">
                            Bekræft Password
                        </label>
                        <div className="mt-2 relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                placeholder="Bekræft Password"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                            >
                                <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye}/>
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            disabled={!validUserName || !validEmail || !validPassword}
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                        >
                            Opret
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
