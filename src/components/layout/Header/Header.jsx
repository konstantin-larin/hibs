import "./style.scss";
import HomeIcon from "../../../assets/icons/HomeIcon.jsx";
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
    'admin': 'Администрирование',
    'users': 'Пользователи',
}


export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const pathName = location.pathname;
    const pathes = pathName.split('/');
    const {isMobile, setSidebarIsClosed} = usePreferences();
    const {setEditedExercise, setViewedExercise} = useUsersExercises();
    const [isEditExercisePage, setIsEditExercisePage] = useState(pathes.includes('exercises'));
    const [isViewExercisePage, setIsViewExercisePage] = useState(pathName.includes('exercises/exercise'));

    function handleBurgerOnClick() {
        setSidebarIsClosed(false);
    }

    function handleCreateExerciseOnClick() {
        setEditedExercise(new Exercise());
        navigate('/exercises/edit');
    }

    function handleCancelCreationOnClick(){
        setEditedExercise(null);
        // navigate(-1);
    }

    function handleBackFromViewOnClick(){
        setViewedExercise(null);
    }



    return (
        <header className={'header'}>
            <div className={'header__content'}>
                <div className="header__path">
                    <HomeIcon></HomeIcon>
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
                {(isEditExercisePage && !isViewExercisePage) && (
                    (pathes.includes('edit')
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
                {
                    isViewExercisePage &&
                    <Button className={'header__create-exercise'} style={'red'} onClick={setViewedExercise}>
                        Назад
                    </Button>
                }
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