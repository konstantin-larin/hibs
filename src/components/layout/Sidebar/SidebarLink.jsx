import "@layout/style.scss";
import {Link, useLocation} from "react-router-dom";
import Text from "@common/Text/Text.jsx";

export default function SidebarLink({to, img, label}) {
    const Img = img;
    const location = useLocation();

    return (
        <Link to={to} className={'sidebar__link ' + (location.pathname === to ? "sidebar__link_active" : '')}>
            <div className={'sidebar__link-img'}>
                <Img></Img>
            </div>
            <div className={'sidebar__link-label'}>
                <Text style={'h5'}>{label}</Text>
            </div>
        </Link>
    )
}