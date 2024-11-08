import "./style.scss";
import Header from "@layout/Header/Header.jsx";
import Sidebar from "@layout/Sidebar/Sidebar.jsx";
import { useAuth } from "@contexts/AuthContext.jsx";
import { Navigate } from "react-router-dom"; // Используется для редиректа
export default function Layout({children}) {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" />; // Редирект на страницу логина, если не авторизован
    }
    return (
        <div className={'layout'}>
            <Sidebar></Sidebar>
            <Header></Header>
            <main>
                {children}
            </main>
        </div>
    )
}