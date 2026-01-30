const API_URL = "http://localhost:5000/api/auth";

// SIGNUP SERVICE
export const signup = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/signup`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            // userData must contain { name, email, password }
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (!response.ok) {
            // This captures "User already exists" or other backend errors
            return { success: false, message: data.message || "Signup failed" };
        }

        return { success: true, ...data };
    } catch (error) {
        // This captures network errors (e.g., server not running)
        return { success: false, message: "Server connection failed. Is your backend running?" };
    }
};

// LOGIN SERVICE
export const login = async (loginData) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            // loginData must contain { email, password }
            body: JSON.stringify(loginData),
        });

        const data = await response.json();

        if (!response.ok) {
            return { success: false, message: data.message || "Invalid credentials" };
        }

        // If successful, we return the token and user data
        return { success: true, ...data };
    } catch (error) {
        return { success: false, message: "Server connection failed." };
    }
};