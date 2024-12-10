import React from "react";
import { useLocation } from "react-router-dom";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";

const LeftFilterNav = () => {
    const location = useLocation();
    const shouldShowSidebar = location.pathname === "/productlist";

    if (!shouldShowSidebar) {
        return null;
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
                <ListItem button>
                    <ListItemText primary="Filter 1" />
                </ListItem>
                <ListItem button>
                    <ListItemText primary="Filter 2" />
                </ListItem>
                <ListItem button>
                    <ListItemText primary="Filter 3" />
                </ListItem>
            </List>
        </Drawer>
    );
};

export default LeftFilterNav;
