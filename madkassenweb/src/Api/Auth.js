export const login = async (email, password) => {
    const response = await fetch('http://localhost:5092/api/Auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })  // Send email and password in the request body
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Invalid credentials');
    }

    return response.json();  // Assuming the Api returns the token in the response
};
