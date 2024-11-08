import "./style.scss";
import Home from "../../../assets/icons/Home.jsx";
import {useLocation} from "react-router-dom";

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
    const location = useLocation();
    const pathes = location.pathname.split('/');
    return (
        <header className={'header'}>
            <div className="header__path">
                <Home></Home>
                <div>/</div>
                <div>HIBS</div>
                {
                    pathes.map((path, index) => {
                        if (index === pathes.length - 1) {
                            return (
                                <div className={'header__path-current'}>{pathesDictionary[path]}</div>
                            )
                        }
                        return (
                            <>
                                <div>{pathesDictionary[path]}</div>
                                <div>/</div>
                            </>
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