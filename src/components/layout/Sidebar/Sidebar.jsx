import "./style.scss";
import Logo from "@common/Logo/Logo.jsx";
import SidebarLink from "@layout/Sidebar/SidebarLink.jsx";
import profile from '@images/brooklyn_alice.png';
import ExercisesIcon from "../../../assets/icons/ExercisesIcon.jsx";
import Text from "@common/Text/Text.jsx";
import {Link} from "react-router-dom";
import {useAuth} from "@contexts/AuthContext.jsx";
import {useState} from "react";
import ShevronUp from "../../../assets/icons/ShevronUp.jsx";
import ExSavedIcon from "../../../assets/icons/ExSavedIcon.jsx";
import ExLibIcon from "../../../assets/icons/ExLibIcon.jsx";
import MyExercisesIcon from "../../../assets/icons/MyExercisesIcon.jsx";
import CalendarIcon from "../../../assets/icons/CalendarIcon.jsx";
import StatisticIcon from "../../../assets/icons/StatisticIcon.jsx";
import {usePreferences} from "@contexts/PreferencesContext.jsx";


function ProfileImg() {
    return (
        <img src={profile} alt="Профиль"/>
    )
}

export default function Sidebar() {
    const {exercisesIsOpened, setExercisesIsOpened} = usePreferences();

    return (
        <aside className={'sidebar'}>
            <div className={'sidebar__content'}>
                <Logo></Logo>
            </div>
            <div className={'sidebar__strip'}></div>
            <div className="sidebar__content">
                <SidebarLink label={'Brooklyn Alice'} to={'/profile'} img={ProfileImg}></SidebarLink>
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
                    <div className={'transition-default ' + (exercisesIsOpened ? '' : 'rotate-180')}>
                        <ShevronUp></ShevronUp></div>
                </div>
                <div className={'sidebar__hidden ' + (exercisesIsOpened ? ' sidebar__hidden_opened' : '')}>
                    <div className={"sidebar__hidden-content "}>
                        <SidebarLink label={"Занятия на устройстве"} img={ExSavedIcon}
                            to={'/exercises/saved'}></SidebarLink>
                        <SidebarLink label={'Библиотека'} img={ExLibIcon} to={'/exercises/library'}></SidebarLink>
                        <SidebarLink label={'Мои занятия'} img={MyExercisesIcon} to={'/exercises/my'}></SidebarLink>
                    </div>
                </div>
            </div>
            <Text style={'h5'} tag={'p'}>ДНЕВНИК</Text>
            <div className={'sidebar__content'}>

                <SidebarLink label={'Календарь'} img={CalendarIcon} to={'/calendar'}></SidebarLink>
                <SidebarLink label={'Статистика'} img={StatisticIcon} to={'/statistic'}></SidebarLink>
            </div>
        </aside>
    )
}