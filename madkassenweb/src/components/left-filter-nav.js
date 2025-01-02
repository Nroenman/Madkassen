import React from "react";
import { useLocation } from "react-router-dom";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import useCategories from "../Hooks/useCategories"; // Import the custom hook

const LeftFilterNav = ({ setCategoryId }) => {
    const location = useLocation();
    const shouldShowSidebar = location.pathname === "/productlist";

    const { categories, loading, error } = useCategories();

    if (!shouldShowSidebar) {
        return null;
    }

    if (loading) {
        return <div>Loading filters...</div>;
    }

    if (error) {
        return <div>Error loading filters: {error}</div>;
    }

    return (
        <Drawer
            anchor="left"
            variant="permanent"
            sx={{
                width: 250,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: 250,
                    boxSizing: "border-box",
                    marginTop: "64px", // Align with Navbar height
                },
            }}
        >
            <List>
                <ListItem button onClick={() => setCategoryId(null)}>
                    <ListItemText primary="All Products" />
                </ListItem>
                {categories.map((category) => (
                    <ListItem
                        button
                        key={category.categoryId}
                        onClick={() => setCategoryId(category.categoryId)}
                    >
                        <ListItemText primary={category.categoryName} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default LeftFilterNav;
