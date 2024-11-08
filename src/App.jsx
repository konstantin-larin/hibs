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
import Layout from "@layout/Layout.jsx";
import CalendarPage from "@pages/CalendarPage/CalendarPage.jsx";
import StatisticPage from "@pages/StatisticPage/StatisticPage.jsx";
import ExercisesLibraryPage from "@pages/ExercisesLibraryPage/ExercisesLibraryPage.jsx";
import MyExercicesPage from "@pages/MyExercisesPage/MyExercicesPage.jsx";
import SavedExercisesPage from "@pages/SavedExercisesPage/SavedExercisesPage.jsx";
import {PreferencesProvider} from "@contexts/PreferencesContext.jsx";

function App() {
    return (
        <AuthProvider>
            <PreferencesProvider>
                <BrowserRouter basename={'/hibs/'}>
                    <Routes>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path={'/register'} element={<RegisterPage/>}></Route>
                        <Route path={'/profile'} element={<ProfilePage/>}></Route>
                        <Route path={'/calendar'} element={<CalendarPage/>}></Route>
                        <Route path={'/statistic'} element={<StatisticPage/>}></Route>
                        <Route path={'/exercises/library'} element={<ExercisesLibraryPage/>}></Route>
                        <Route path={'/exercises/my'} element={<MyExercicesPage/>}></Route>
                        <Route path={'/exercises/saved'} element={<SavedExercisesPage/>}></Route>
                        <Route path={"*"} element={<LoginPage/>}></Route>
                    </Routes>
                </BrowserRouter>
            </PreferencesProvider>
        </AuthProvider>
    )
}

export default App
