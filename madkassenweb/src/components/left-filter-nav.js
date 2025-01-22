import React, {useState, useEffect} from "react";
import {Link, useLocation} from "react-router-dom";
import {Drawer, List, ListItem, ListItemText, Collapse, Checkbox, FormControlLabel} from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useCategories from "../Hooks/useCategories";

const LeftFilterNav = ({setCategoryId, setSelectedAllergies}) => {
    const location = useLocation();
    const shouldShowSidebar = location.pathname === "/productlist";

    const {categories, loading, error} = useCategories();
    const [allergyDropdownOpen, setAllergyDropdownOpen] = useState(false);
    const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

    // Initialize selected allergies from localStorage or an empty array
    const storedAllergies = JSON.parse(localStorage.getItem("selectedAllergies")) || [];
    const [selectedAllergies, setAllergies] = useState(storedAllergies);

    const allergyTypeNames = {
        0: "Gluten",
        1: "Laktose",
        2: "Nødder",
        3: "Skaldyr",
        4: "Soya",
        5: "Æg",
    };

    const toggleAllergy = (allergyId) => {
        const updatedAllergies = selectedAllergies.includes(allergyId)
            ? selectedAllergies.filter((id) => id !== allergyId)
            : [...selectedAllergies, allergyId];

        setAllergies(updatedAllergies);
        localStorage.setItem("selectedAllergies", JSON.stringify(updatedAllergies)); // Save to localStorage
        setSelectedAllergies(updatedAllergies); // Pass to parent
    };

    useEffect(() => {
        setSelectedAllergies(selectedAllergies); // Ensure the parent component is updated
    }, [selectedAllergies, setSelectedAllergies]);

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
                    marginTop: "64px",
                },
            }}
        >
            <List>
                <ListItem>
                    <Link to="/add-product" style={{textDecoration: "none", color: "inherit"}}>
                        Add Product
                    </Link>
                </ListItem>
                {/* Allergy Filter Dropdown */}
                <ListItem button onClick={() => setAllergyDropdownOpen(!allergyDropdownOpen)}>
                    <ListItemText primary="Filtrer Allergener"/>
                    {allergyDropdownOpen ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                </ListItem>
                <Collapse in={allergyDropdownOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {Object.entries(allergyTypeNames).map(([id, name]) => (
                            <ListItem key={id} sx={{pl: 4}}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={selectedAllergies.includes(Number(id))}
                                            onChange={() => toggleAllergy(Number(id))}
                                        />
                                    }
                                    label={name}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Collapse>

                {/* All Products Tab */}
                <ListItem button onClick={() => setCategoryId(null)}>
                    <ListItemText primary="Alle produkter"/>
                </ListItem>

                {/* Categories Dropdown */}
                <ListItem button onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}>
                    <ListItemText primary="Kategorier"/>
                    {categoryDropdownOpen ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                </ListItem>
                <Collapse in={categoryDropdownOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {categories.map((category) => (
                            <ListItem
                                button
                                key={category.categoryId}
                                onClick={() => setCategoryId(category.categoryId)}
                                sx={{pl: 4}}
                            >
                                <ListItemText primary={category.categoryName}/>
                            </ListItem>
                        ))}
                    </List>
                </Collapse>
            </List>
        </Drawer>
    );
};

export default LeftFilterNav;
