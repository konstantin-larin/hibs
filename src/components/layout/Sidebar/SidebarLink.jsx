import "@layout/style.scss";
import {Link, useLocation} from "react-router-dom";
import Text from "@common/Text/Text.jsx";
import {usePreferences} from "@contexts/PreferencesContext.jsx";

export default function SidebarLink({to, img, label}) {
    const {isMobile, setSidebarIsClosed} = usePreferences();
    const Img = img;
    const location = useLocation();

    function handleOnClick(){
        if(isMobile){
            setSidebarIsClosed(true);
        }
    }
    return (
        <Link to={to} onClick={handleOnClick} className={'sidebar__link ' + (location.pathname === to ? "sidebar__link_active" : '')}>
            <div className={'sidebar__link-img'}>
                <Img></Img>
            </div>
            <div className={'sidebar__link-label'}>
                <Text style={'h5'}>{label}</Text>
            </div>
        </Link>
    )
}