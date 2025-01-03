import React, { useState, useEffect } from 'react';
import useUserUpdate from "../Hooks/useUserUpdate";
import useAuth from "../Hooks/useAuth";

const UserProfileForm = () => {
    const { updateUserProfile, loading, error } = useUserUpdate();
    const { userInfo, loading: authLoading } = useAuth();
    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        password: '',
        oldPassword: '',
        newPassword: ''
    });

    useEffect(() => {
        if (!authLoading && userInfo) {
            // Prepopulate form fields with user info once available
            setFormData({
                userName: userInfo.userName || '',
                email: userInfo.email || '',
                password: '',
                oldPassword: '',
                newPassword: ''
            });
        }
    }, [authLoading, userInfo]); // Re-run effect when userInfo is available

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate input and ensure oldPassword is provided if changing password
        if (formData.newPassword && !formData.oldPassword) {
            alert('Please provide your old password to change the password.');
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            alert('You are not authenticated!');
            return;
        }

        try {
            const response = await updateUserProfile(formData, token);
            console.log('Profile updated successfully:', response);
        } catch (err) {
            console.error('Error updating profile:', err);
        }
    };

    if (authLoading) {
        return <p>Loading profile...</p>;
    }

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-gray-100">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
                    Update Profile
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Username Field */}
                    <div>
                        <label htmlFor="userName" className="block text-sm font-medium text-gray-900">
                            Username
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                name="userName"
                                id="userName"
                                value={formData.userName}
                                onChange={handleChange}
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                placeholder="Enter new username"
                            />
                        </div>
                    </div>

                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                            Email
                        </label>
                        <div className="mt-2">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                placeholder="Enter new email"
                            />
                        </div>
                    </div>

                    {/* Old Password Field */}
                    <div>
                        <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-900">
                            Old Password
                        </label>
                        <div className="mt-2">
                            <input
                                type="password"
                                name="oldPassword"
                                id="oldPassword"
                                value={formData.oldPassword}
                                onChange={handleChange}
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                placeholder="Enter your old password"
                            />
                        </div>
                    </div>

                    {/* New Password Field */}
                    <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-900">
                            New Password
                        </label>
                        <div className="mt-2">
                            <input
                                type="password"
                                name="newPassword"
                                id="newPassword"
                                value={formData.newPassword}
                                onChange={handleChange}
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                placeholder="Enter your new password"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600"
                        >
                            {loading ? 'Updating...' : 'Update Profile'}
                        </button>
                    </div>
                </form>

                {/* Error Message */}
                {error && (
                    <p className="mt-4 text-red-500 text-center">{error}</p>
                )}
            </div>
        </div>
    );
};

export default UserProfileForm;
