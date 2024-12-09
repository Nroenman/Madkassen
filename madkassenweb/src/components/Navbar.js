import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button } from "@mui/material";
import thumbnailmad from "../images/thumbnailmad.png";
import '../styles/navbar.css';

const Navbar = () => {
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
        <Button color="inherit" component={Link} to="/profile">
          Min Profil
        </Button>
        {/* Login/Logout Button */}
        <Button color="inherit" style={{ marginLeft: "auto" }}>
          Log ind
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
