import React, { createContext, useState } from 'react';

// Create the authentication context
export const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Function to handle user login
    const login = (userData) => {
        setUser(userData);
        setIsLoggedIn(true);
    };

    // Function to handle user logout
    const logout = () => {
        setUser(null);
        setIsLoggedIn(false);
    };

    // Provide the user and login/logout functions to the child components
    const authContextValue = {
        user,
        isLoggedIn,
        login,
        logout,
    };

    return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};
