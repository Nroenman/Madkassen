
export const fetchCategories = async () => {
    try {
        const response = await fetch("http://localhost:5092/api/Category");
        if (!response.ok) {
            throw new Error("Failed to fetch categories");
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};
