import './App.scss'
import {useEffect} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ProfilePage from "./components/pages/Profile/ProfilePage.jsx";
import {AuthProvider} from "./contexts/AuthContext.jsx";
import LoginPage from "./components/pages/Login/LoginPage.jsx";
import RegisterPage from "./components/pages/Register/RegisterPage.jsx";
import CalendarPage from "@pages/CalendarPage/CalendarPage.jsx";
import StatisticPage from "@pages/StatisticPage/StatisticPage.jsx";
import ExercisesLibraryPage from "@pages/ExercisesLibraryPage/ExercisesLibraryPage.jsx";
import MyExercisesPage from "@pages/MyExercisesPage/MyExercisesPage.jsx";
import SavedExercisesPage from "@pages/SavedExercisesPage/SavedExercisesPage.jsx";
import {PreferencesProvider} from "@contexts/PreferencesContext.jsx";
import {UsersExercisesProvider} from "@contexts/UsersExercisesContext.jsx";
import EditExercisePage from "@pages/EditExercisePage/EditExercisePage.jsx";
import ViewExercisePage from "@pages/ViewExercisePage/ViewExercisePage.jsx";
import {SignUpProvider} from "@contexts/SignUpContext.jsx";
import EmailVerificationPage from "@pages/EmailVerificationPage/EmailVerificationPage.jsx";

function App() {
    return (
        <SignUpProvider>

            <AuthProvider>
                <UsersExercisesProvider>
                    <BrowserRouter basename={'/hibs/'}>
                        <PreferencesProvider>
                            <Routes>
                                <Route path={'/exercises/exercise'} element={<ViewExercisePage/>}></Route>
                                <Route path={'/exercises/edit'} element={<EditExercisePage/>}></Route>
                                <Route path="/login" element={<LoginPage/>}/>
                                <Route path={'/register'} element={<RegisterPage/>}></Route>
                                <Route path={'/verify-email'} element={<EmailVerificationPage/>}></Route>
                                <Route path={'/profile'} element={<ProfilePage/>}></Route>
                                <Route path={'/calendar'} element={<CalendarPage/>}></Route>
                                <Route path={'/statistic'} element={<StatisticPage/>}></Route>
                                <Route path={'/exercises/library'} element={<ExercisesLibraryPage/>}></Route>
                                <Route path={'/exercises/my'} element={<MyExercisesPage/>}></Route>
                                <Route path={'/exercises/saved'} element={<SavedExercisesPage/>}></Route>
                                <Route path={"*"} element={<LoginPage/>}></Route>
                            </Routes>
                        </PreferencesProvider>
                    </BrowserRouter>
                </UsersExercisesProvider>
            </AuthProvider>
        </SignUpProvider>
    )
}

export default App
