import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button } from "@mui/material";
import thumbnailmad from "../images/thumbnailmad.png";
import useAuth from "../Hooks/useAuth"; // Import the useAuth hook
import { useCart } from "../context/CartContext"; // Import the CartContext
import { HiCheck } from "react-icons/hi"; // Import the Check icon for Toast
import toast, { Toaster } from "react-hot-toast"; // Import toast from react-hot-toast

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth(); // Get the authentication status and logout function
    const { cartItems, showToast, toastMessage, toastType } = useCart(); // Access cartItems and showToast from CartContext

    // Calculate total items (considering quantities)
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    // Show toast based on type (success or error)
    React.useEffect(() => {
        if (showToast) {
            if (toastType === "success") {
                toast.success(toastMessage, { duration: 3000, position: 'top-right' }); // Display success message
            } else if (toastType === "error") {
                toast.error(toastMessage, { duration: 3000, position: 'top-right' }); // Display error message
            }
        }
    }, [showToast, toastMessage, toastType]);

    return (
        <AppBar position="fixed" className="bg-indigo-600 shadow-md">
            <Toolbar className="flex justify-between items-center px-6 py-3">
                {/* Logo */}
                <img
                    src={thumbnailmad}
                    alt="Madkassen Thumbnail"
                    className="h-10 cursor-pointer"
                    onClick={() => window.location.href = "/"}
                />

                {/* Navigation Links */}
                <div className="flex space-x-6">
                    <Button
                        color="inherit"
                        component={Link}
                        to="/categoryList"
                        className="text-white hover:bg-indigo-700 rounded-md px-4 py-2"
                    >
                        Kategorier
                    </Button>
                    <Button
                        color="inherit"
                        component={Link}
                        to="/productlist"
                        className="text-white hover:bg-indigo-700 rounded-md px-4 py-2"
                    >
                        Produkter
                    </Button>
                    <Button
                        color="inherit"
                        component={Link}
                        to="/about"
                        className="text-white hover:bg-indigo-700 rounded-md px-4 py-2"
                    >
                        Om os
                    </Button>

                    {isAuthenticated() && (
                        <Button
                            color="inherit"
                            component={Link}
                            to="/profile"
                            className="text-white hover:bg-indigo-700 rounded-md px-4 py-2"
                        >
                            Min Profil
                        </Button>
                    )}
                </div>

                {/* Cart Icon */}
                <div className="relative">
                    <Link to="/cart" className="flex items-center">
                        <span className="text-white text-2xl">
                            🛒
                        </span>
                        {totalItems > 0 && (
                            <span
                                className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full -mt-1 -mr-1">
                                {totalItems}
                            </span>
                        )}
                    </Link>
                </div>

                {/* Conditionally render Login or Logout button based on authentication */}
                <div className="flex space-x-4">
                    {!isAuthenticated() ? (
                        <Button
                            color="inherit"
                            component={Link}
                            to="/login"
                            className="text-white hover:bg-indigo-700 rounded-md px-4 py-2"
                        >
                            Login
                        </Button>
                    ) : (
                        <Button
                            color="inherit"
                            onClick={logout}
                            className="text-white hover:bg-indigo-700 rounded-md px-4 py-2"
                        >
                            Logout
                        </Button>
                    )}
                </div>
            </Toolbar>

            {/* Toaster component for toast notifications */}
            <Toaster
                position="top-right" // Toast will appear in the top-right corner
                reverseOrder={false} // New toasts will appear above the older ones
            />
        </AppBar>
    );
};

export default Navbar;
