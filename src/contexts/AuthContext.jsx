// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    // console.log(JSON.parse(localStorage.getItem('user')));
    let rememberedUser = localStorage.getItem('user');
    if(rememberedUser){
        rememberedUser = JSON.parse(rememberedUser);
    } else rememberedUser = null;
    const [user, setUser] = useState(rememberedUser); // user = null означает, что пользователь не авторизован

    const login = ({user, remember}) => {
        if(remember){
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
        setUser(user); // Эмулируем логин, устанавливая имя пользователя
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null); // Эмулируем выход
    };

    const isAuthenticated = () => !!user;

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
