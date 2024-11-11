import "./style.scss";
import Home from "../../../assets/icons/Home.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import {Fragment, useEffect, useRef, useState} from "react";
import {usePreferences} from "@contexts/PreferencesContext.jsx";
import Button from "@common/Button/Button.jsx";
import PlusIcon from "../../../assets/icons/PlusIcon.jsx";
import ArrowRight from "../../../assets/icons/ArrowRight.jsx";
import {useUsersExercises} from "@contexts/UsersExercisesContext.jsx";
import {Exercise} from "@services/exercises.js";

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
    const navigate = useNavigate();
    const location = useLocation();
    const pathName = location.pathname;
    const pathes = pathName.split('/');
    const {isMobile, setSidebarIsClosed} = usePreferences();
    const {setCurrentExercise} = useUsersExercises();
    const [isExercisePage, setIsExercisePage] = useState(pathes.includes('exercises'));

    function handleBurgerOnClick() {
        setSidebarIsClosed(false);
    }

    function handleCreateExerciseOnClick() {
        setCurrentExercise(new Exercise());
        navigate('/exercises/exercise');
    }

    function handleCancelCreationOnClick(){
        setCurrentExercise(null);
        // navigate(-1);
    }



    return (
        <header className={'header'}>
            <div className={'header__content'}>
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
            </div>

            <div className={'header__buttons'}>
                {isExercisePage && (
                    (pathes.includes('exercise')
                        ? (
                            <Button style={'red'} className={'header__create-exercise'} onClick={handleCancelCreationOnClick}>
                                <ArrowRight></ArrowRight>
                                <div>
                                    Отмена
                                </div>
                            </Button>
                        )
                        : (
                        <Button style={'red'} className={'header__create-exercise'} onClick={handleCreateExerciseOnClick}>
                            <PlusIcon></PlusIcon>
                            <span>СОЗДАТЬ ЗАНЯТИЕ</span>
                        </Button>
                    ))
                )}
                {isMobile && (
                    <div className={'header__burger'} onClick={handleBurgerOnClick}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                )}
            </div>
        </header>
    )
}