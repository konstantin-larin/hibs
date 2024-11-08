import "./style.scss";
import Home from "../../../assets/icons/Home.jsx";
import {useLocation} from "react-router-dom";
import {Fragment} from "react";
import {usePreferences} from "@contexts/PreferencesContext.jsx";

const pathesDictionary = {
    'exercises': 'Занятия',
    'saved': 'На устройстве',
    'library': 'Библиотека',
    'my': 'Мои занятия',
    'profile': 'Профиль',
    'calendar': 'Календарь',
    'statistic': 'Статистика',
}
export default function Header() {
    const {isMobile, setSidebarIsClosed} = usePreferences();
    const location = useLocation();
    const pathes = location.pathname.split('/');
    function handleBurgerOnClick(){
        setSidebarIsClosed(false);
    }
    return (
        <header className={'header'}>
            {isMobile && (
                <div className={'header__burger'} onClick={handleBurgerOnClick}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            )}
            <div className="header__path">
                <Home></Home>
                <div>/</div>
                <div>HIBS</div>
                {
                    pathes.map((path, index) => {
                        if (index === pathes.length - 1) {
                            return (
                                <div className={'header__path-current'} key={index}>{pathesDictionary[path]}</div>
                            )
                        }
                        return (
                            <Fragment key={index}>
                                <div>{pathesDictionary[path]}</div>
                                <div>/</div>
                            </Fragment>
                    )
                    })
                }
            </div>
            <div className="header__title">
                {pathesDictionary[pathes[pathes.length - 1]]}
            </div>
        </header>
    )
}