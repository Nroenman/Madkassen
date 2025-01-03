import React from "react";
import {Link} from "react-router-dom";
import {AppBar, Toolbar, Button} from "@mui/material";
import thumbnailmad from "../images/thumbnailmad.png";
import useAuth from "../Hooks/useAuth";
import {useCart} from "../context/CartContext";
import {Toaster} from "react-hot-toast";

const Navbar = () => {
    const {isAuthenticated, logout, getUserInfo} = useAuth();
    const {cartItems} = useCart();

    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    // Get the logged-in user's username
    const userName = getUserInfo();

    return (
        <AppBar position="fixed" className="bg-indigo-600 shadow-md">
            <Toolbar className="flex justify-between items-center px-6 py-3">
                <img
                    src={thumbnailmad}
                    alt="Madkassen Thumbnail"
                    className="h-10 cursor-pointer"
                    onClick={() => window.location.href = "/"}
                />

                <div className="flex space-x-6">
                    <Button color="inherit" component={Link} to="/categoryList"
                            className="text-white hover:bg-indigo-700 rounded-md px-4 py-2">
                        Kategorier
                    </Button>
                    <Button color="inherit" component={Link} to="/productlist"
                            className="text-white hover:bg-indigo-700 rounded-md px-4 py-2">
                        Produkter
                    </Button>
                    <Button color="inherit" component={Link} to="/about"
                            className="text-white hover:bg-indigo-700 rounded-md px-4 py-2">
                        Om os
                    </Button>
                    {isAuthenticated() && (
                        <Button color="inherit" component={Link} to="/profile"
                                className="text-white hover:bg-indigo-700 rounded-md px-4 py-2">
                            Min Profil
                        </Button>
                    )}
                </div>

                <div className="relative">
                    <Link to="/cart" className="flex items-center">
                        <span className="text-white text-2xl">🛒</span>
                        {totalItems > 0 && (
                            <span
                                className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full -mt-1 -mr-1">
                                {totalItems}
                            </span>
                        )}
                    </Link>
                </div>

                <div className="flex space-x-4">
                    {/* Show Username if authenticated */}
                    {isAuthenticated() && userName && (
                        <span className="text-white font-semibold">{userName}</span>
                    )}

                    {/* Show Login or Logout button */}
                    {!isAuthenticated() ? (
                        <Button color="inherit" component={Link} to="/login"
                                className="text-white hover:bg-indigo-700 rounded-md px-4 py-2">
                            Login
                        </Button>
                    ) : (
                        <Button color="inherit" onClick={logout}
                                className="text-white hover:bg-indigo-700 rounded-md px-4 py-2">
                            Logout
                        </Button>
                    )}
                </div>
            </Toolbar>

            <Toaster position="top-center" reverseOrder={false}/>
        </AppBar>
    );
};

export default Navbar;
