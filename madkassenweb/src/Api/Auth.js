export const login = async (email, password) => {
    const response = await fetch('http://localhost:5092/api/Auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Forkert Email eller Kode');
    }

    return response.json();
};
