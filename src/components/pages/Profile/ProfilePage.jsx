import "./style.scss";
import Layout from "@layout/Layout.jsx";
import Block from "@common/Block/Block.jsx";
import ProfileIcon from "../../../assets/icons/ProfileIcon.jsx";
import InfoIcon from "../../../assets/icons/InfoIcon.jsx";
import LockIcon from "../../../assets/icons/LockIcon.jsx";
import TrashIcon from "../../../assets/icons/TrashIcon.jsx";
import ProfileMe from "@pages/Profile/ProfileMe.jsx";
import {useAuth} from "@contexts/AuthContext.jsx";
import ProfileInfo from "@pages/Profile/ProfileInfo.jsx";
import ProfilePassword from "@pages/Profile/ProfilePassword.jsx";
import ProfileDelete from "@pages/Profile/ProfileDelete.jsx";

export default function ProfilePage() {
    return (
        <Layout>
            <div className={'profile-page'}>
                <Block style={'default'} tag={'nav'} className={'profile-nav'}>
                    <a href="#me" className={'profile-nav__elem'}>
                        <ProfileIcon></ProfileIcon>
                        Профиль
                    </a>
                    <a href={'#info'} className={'profile-nav__elem'}>
                        <InfoIcon></InfoIcon>
                        Информация
                    </a>
                    <a href={'#password'} className={'profile-nav__elem'}>
                        <LockIcon></LockIcon>
                        Изменить пароль
                    </a>
                    <a href={'#delete'} className={'profile-nav__elem'}>
                        <TrashIcon></TrashIcon>
                        Удалить учетную запись
                    </a>
                </Block>
                <div className={'profile'}>
                    <ProfileMe></ProfileMe>
                    <ProfileInfo></ProfileInfo>
                    <ProfilePassword></ProfilePassword>
                    <ProfileDelete></ProfileDelete>
                </div>
            </div>
        </Layout>
    )
}