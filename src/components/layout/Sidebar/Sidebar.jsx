import "./style.scss";
import Logo from "@common/Logo/Logo.jsx";
import SidebarLink from "@layout/Sidebar/SidebarLink.jsx";
import ExercisesIcon from "../../../assets/icons/ExercisesIcon.jsx";
import Text from "@common/Text/Text.jsx";
import {useAuth} from "@contexts/AuthContext.jsx";
import ShevronUp from "../../../assets/icons/ShevronUp.jsx";
import ExSavedIcon from "../../../assets/icons/ExSavedIcon.jsx";
import ExLibIcon from "../../../assets/icons/ExLibIcon.jsx";
import MyExercisesIcon from "../../../assets/icons/MyExercisesIcon.jsx";
import CalendarIcon from "../../../assets/icons/CalendarIcon.jsx";
import StatisticIcon from "../../../assets/icons/StatisticIcon.jsx";
import {usePreferences} from "@contexts/PreferencesContext.jsx";
import {enableBodyScroll, disableBodyScroll} from "body-scroll-lock";
import {useEffect, useState} from "react";
import breakpoints from "@services/breakpoints.js";
import CrossIcon from "../../../assets/icons/CrossIcon.jsx";

function ProfileImg() {
    const {user} = useAuth();
    return (
        <img src={user.avatar} alt="Профиль"/>
    )
}

export default function Sidebar() {
    const {exercisesIsOpened, setExercisesIsOpened, isMobile, sidebarIsClosed, setSidebarIsClosed} = usePreferences();
    const {isAdmin, user} = useAuth();

    function handleCrossOnClick() {
        setSidebarIsClosed(true);
    }

    return (
        <aside className={'sidebar ' + (isMobile && sidebarIsClosed ? 'sidebar_closed' : '')}>
            {
                isMobile && (
                    <div className={'cross-container'} onClick={handleCrossOnClick}>
                        <CrossIcon></CrossIcon>
                    </div>
                )
            }
            <div className={'sidebar__content'}>
                <Logo></Logo>
            </div>
            <div className={'sidebar__strip'}></div>
            <div className="sidebar__content">
                <SidebarLink label={user.firstName + ' ' + user.lastName} to={'/profile'} img={ProfileImg}></SidebarLink>
            </div>
            <div className={'sidebar__strip'}></div>
            <div className="sidebar__content">
                <div className={'sidebar__link'} onClick={() => {
                    setExercisesIsOpened(!exercisesIsOpened);
                }}>
                    <div className={'sidebar__link-img'}>
                        <ExercisesIcon></ExercisesIcon>
                    </div>
                    <div className={'sidebar__link-label'}>
                        <Text style={'h5'}>Занятия</Text>
                    </div>
                    <div className={'transition-4 w-fit ' + (exercisesIsOpened ? '' : 'rotate-180')}>
                        <ShevronUp></ShevronUp></div>
                </div>
                <div className={'sidebar__hidden  ' + (exercisesIsOpened ? ' sidebar__hidden_opened' : '')}>
                    <div className={"sidebar__hidden-content "}>
                        <SidebarLink label={"Занятия на устройстве"} img={ExSavedIcon}
                            to={'/exercises/saved'}></SidebarLink>
                        <SidebarLink label={'Библиотека'} img={ExLibIcon} to={'/exercises/library'}></SidebarLink>
                        <SidebarLink label={'Мои занятия'} img={MyExercisesIcon} to={'/exercises/my'}></SidebarLink>
                    </div>
                </div>
            </div>
            <p className={'text-h5-white'}>Дневник</p>
            <div className={'sidebar__content'}>
                <SidebarLink label={'Календарь'} img={CalendarIcon} to={'/calendar'}></SidebarLink>
                <SidebarLink label={'Статистика'} img={StatisticIcon} to={'/statistic'}></SidebarLink>
            </div>

            {
                isAdmin &&
                <>
                    <p className={'text-h5-white'}>Админка</p>
                    <div className={'sidebar__content'}>
                        <SidebarLink label={'Пользователи'} img={CalendarIcon} to={'/admin/users'}></SidebarLink>
                    </div>
                </>
            }
        </aside>
    )
}