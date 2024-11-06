import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.scss'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ProfilePage from "./components/pages/Profile/ProfilePage.jsx";
import {AuthProvider} from "./contexts/AuthContext.jsx";
import ProtectedRoute from "./components/protected/ProtectedRoute.jsx";
import LoginPage from "./components/pages/Login/LoginPage.jsx";
import RegisterPage from "./components/pages/Register/RegisterPage.jsx";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter basename={'/hibs/'}>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <ProfilePage></ProfilePage>
                            </ProtectedRoute>
                        }
                    />
                    <Route path={'/register'} element={<RegisterPage/>}></Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App
