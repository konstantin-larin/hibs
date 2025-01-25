import "./style.scss";
import {useAuth} from "@contexts/AuthContext.jsx";
import {Navigate} from "react-router-dom";

export default function MainPage() {
    const {user} = useAuth();
    if(user){
        if(user.role === "admin"){
            return <Navigate to={'/admin/users'}></Navigate>
        }
        return <Navigate to="/profile" />;
    }

    return (
        <Navigate to={'/login'}></Navigate>
    )
}