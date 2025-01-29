// AuthContext.js
import React, {createContext, useContext, useEffect, useState} from 'react';
import avatar from "@images/richard.png";
import {loginUser, fetchUserData, refreshToken, logoutUser} from "@services/api.js";
import {useSignUp} from "@contexts/SignUpContext.jsx";
const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const {setUserData, setEmailCanBeReactivated} = useSignUp();
    const [user, setUser] = useState(null);
    const [fetching, setFetching] = useState(true);
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
    const [refreshTokenValue, setRefreshTokenValue] = useState(localStorage.getItem('refreshToken'));
    const [error, setError] = useState(null);

    function _setUser(_user){
        _user = {
        ..._user,
            avatar,
            firstTime: true, //первый раз
            role: 'admin',
            minSpeed: 3,
            maxSpeed: 40,
            hits: 1000,
        }
        setUser(_user);
    }

    useEffect(() => {
        if(accessToken){
            fetchUserData(accessToken)
                .then((user) => {
                    _setUser(user);
                    setUserData(null);
                    setFetching(false);
                })
                .catch(handleError)
        }
        else {
            setFetching(false);
        }
    }, [accessToken]);

    const handleError = (err) => {
        setError(err);
    }

    const isAdmin = () => {
        if(user){
            return user.role === 'admin';
        }
        return false;
    }
    const login = async ({credentials, remember}) => {
        try {
            const {accessToken, refreshToken} = await loginUser(credentials);
            setAccessToken(accessToken)
            setRefreshTokenValue(refreshToken);
            if(remember){
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
            }
        } catch(err) {
            throw err;
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


    const isFetching = () => fetching
    const isAuthenticated = () => !!user;

    return (
        <AuthContext.Provider value={{
            user, login, logout, refreshAccessToken, isAuthenticated, isFetching, error, isAdmin
        }}>
            {children}
        </AuthContext.Provider>
    );
};




