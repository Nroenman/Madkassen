import React from "react";
import {Link} from "react-router-dom";
import {AppBar, Toolbar, Button} from "@mui/material";
import thumbnailmad from "../images/thumbnailmad.png";
import '../styles/navbar.css';
import useAuth from "../Hooks/useAuth"; // Import the useAuth hook

const Navbar = () => {
    const {isAuthenticated, logout} = useAuth(); // Get the authentication status and logout function

    return (
        <AppBar position="static">
            <Toolbar>
                {/* Logo */}
                <img
                    src={thumbnailmad}
                    alt="Madkassen Thumbnail"
                    className="header-thumbnail"
                    onClick={() => window.location.href = "/"}
                />
                {/* Navigation Links */}
                <Button color="inherit" component={Link} to="/categoryList">
                    Kategorier
                </Button>
                <Button color="inherit" component={Link} to="/productlist">
                    Produkter
                </Button>
                <Button color="inherit" component={Link} to="/about">
                    Om os
                </Button>

                {isAuthenticated() && (
                    <Button color="inherit" component={Link} to="/profile">
                        Min Profil
                    </Button>
                )}

                {/* Conditionally render Login or Logout button based on authentication */}
                {!isAuthenticated() ? (
                    <Button color="inherit" component={Link} to="/login">
                        Login
                    </Button>
                ) : (
                    <Button color="inherit" onClick={logout}>
                        Logout
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
