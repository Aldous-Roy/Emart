import React, { createContext, useState } from 'react';

// Create a context object. Components that subscribe to this context will re-render when the value provided to it changes.
export const AuthContext = createContext();

/**
 * AuthProvider is a component that provides authentication-related state and functions
 * to all components wrapped inside it.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components that will have access to this context.
 */
export const AuthProvider = ({ children }) => {
    // State to track if a user is logged in
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // State to store the logged-in user's information
    const [user, setUser] = useState(null);
    // State to store any login errors
    const [error, setError] = useState('');

    /**
     * Handles the user login process.
     * This is a mock implementation for demonstration purposes.
     * @param {string} username - The username entered by the user.
     * @param {string} password - The password entered by the user.
     * @returns {boolean} - True if login is successful, false otherwise.
     */
    const login = (username, password) => {
        // Check for valid credentials for 'maker' or 'checker' roles
        if ((username === 'maker' || username === 'checker') && password === 'password') {
            setIsLoggedIn(true);
            setUser({ username, role: username });
            setError(''); // Clear any previous errors
            return true;
        }
        // If credentials are invalid, set an error message
        setError('Invalid credentials. Use "maker" or "checker" with password "password".');
        return false;
    };

    /**
     * Handles the user logout process.
     */
    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
    };

    // The value object contains all the state and functions that will be available to consuming components.
    const value = { isLoggedIn, user, error, login, logout };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
