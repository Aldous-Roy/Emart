import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

/**
 * AuthProvider manages the user's login state.
 * * NOTE: This implementation does NOT persist the login state. The user state
 * is held in memory only. When the page is refreshed, the state is reset,
 * and the user will be logged out. This fulfills the requirement.
 * To persist login across refreshes, you would use localStorage or sessionStorage.
 */
export const AuthProvider = ({ children }) => {
    // State is initialized here. On page refresh, it will always reset to these default values.
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    const login = (username, password) => {
        if ((username === 'maker' || username === 'checker') && password === 'password') {
            setIsLoggedIn(true);
            setUser({ username, role: username });
            setError('');
            return true;
        }
        setError('Invalid credentials. Use "maker" or "checker" with password "password".');
        return false;
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
    };

    const value = { isLoggedIn, user, error, login, logout };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
