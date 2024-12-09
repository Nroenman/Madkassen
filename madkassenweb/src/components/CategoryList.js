import React from "react";
import useCategories from "../Hooks/useCategories"; // Import the hook

const CategoryList = () => {
    const { categories, loading, error } = useCategories(); // Use the hook

    if (loading) {
        return <div>Loading categories...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Categories</h1>
            <ul>
                {categories.map((category) => (
                    <li key={category.categoryId}>
                        <h2>{category.categoryName}</h2>
                        <p>{category.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryList;
