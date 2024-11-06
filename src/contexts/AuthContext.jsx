// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // user = null означает, что пользователь не авторизован

    const login = (username) => {
        setUser(username); // Эмулируем логин, устанавливая имя пользователя
    };

    const logout = () => {
        setUser(null); // Эмулируем выход
    };

    const isAuthenticated = () => !!user;

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
