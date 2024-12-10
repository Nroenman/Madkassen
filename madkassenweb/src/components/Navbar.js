import React from "react";
import {Link} from "react-router-dom";
import {AppBar, Toolbar, Button} from "@mui/material";
import thumbnailmad from "../images/thumbnailmad.png";
import useAuth from "../Hooks/useAuth"; // Import the useAuth hook

const Navbar = () => {
    const {isAuthenticated, logout} = useAuth(); // Get the authentication status and logout function

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
        </AppBar>
    );
};

export default Navbar;
