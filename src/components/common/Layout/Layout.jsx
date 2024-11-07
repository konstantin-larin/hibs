import "./style.scss";
import Header from "@common/Layout/Header.jsx";
import Sidebar from "@common/Layout/Sidebar.jsx";
import { useAuth } from "@contexts/AuthContext";
import { Navigate } from "react-router-dom"; // Используется для редиректа
export default function Layout({children}) {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" />; // Редирект на страницу логина, если не авторизован
    }
    return (
        <div>
            <Header></Header>
            <Sidebar></Sidebar>
            {children}
        </div>
    )
}