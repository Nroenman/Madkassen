import React from "react";
import logomad from "../images/logomad.png";

const HomePage = () => {
    return (
        <div className="homepage flex items-center justify-center h-screen">
            <img src={logomad} alt="Madkassen Logo" className="homepage-logo" />
        </div>
    );
};

export default HomePage;
