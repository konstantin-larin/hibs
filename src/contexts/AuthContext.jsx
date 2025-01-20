// AuthContext.js
import React, {createContext, useContext, useEffect, useState} from 'react';
import avatar from "@images/richard.png";
import {loginUser, fetchUserData, refreshToken, logoutUser} from "@services/auth.js";

const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
    const [refreshTokenValue, setRefreshTokenValue] = useState(localStorage.getItem('refreshToken'));
    const [error, setError] = useState(null);

    function _setUser(_user){
        _user = {
        ..._user,
            avatar,
            firstTime: true, //первый раз

            role: 'admin',
            name: "Константин",
            surname: "Ларин",
            minSpeed: 3,
            maxSpeed: 40,
            hits: 1000,
        }
        setUser(_user);
    }

    useEffect(() => {
        if(accessToken){
            fetchUserData(accessToken)
                .then(_setUser)
                .catch(handleError)
        }
    }, [accessToken]);

    const handleError = (err) => {
        console.log(err);
        setError(err);
    }

    const login = async ({credentials, remember}) => {
        try {
            const {accessToken, refreshToken} = await loginUser(credentials);
            setAccessToken(accessToken)
            setRefreshTokenValue(refreshToken);
        } catch(err) {
            handleError(err);
        }
    };

    const refreshAccessToken = async () => {
        if(!refreshTokenValue) return;

        try {
            const {token} = await refreshToken(refreshToken);
            setAccessToken(token);
        } catch(err) {
            handleError(err);
        }
    }

    const logout = async () => {
        await logoutUser();
        setUser(null);
        setAccessToken(null);
        setRefreshTokenValue(null);
    };


    const isAuthenticated = () => {
        return !!user;
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, refreshAccessToken, isAuthenticated, error}}>
            {children}
        </AuthContext.Provider>
    );
};




