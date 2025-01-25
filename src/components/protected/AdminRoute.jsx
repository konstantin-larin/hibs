import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "@contexts/AuthContext.jsx";

export default function AdminRoute() {
    const {isAdmin} = useAuth();
    if(!isAdmin){
        return <></>
    }
    if(!isAdmin()){
        return <Navigate to="/login" />;
    }
    return <Outlet/>;
}