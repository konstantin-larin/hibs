import "./style.scss";
import Block from "@common/Block/Block.jsx";
import Button from "@common/Button/Button.jsx";
import ArrowRight from "../../../assets/icons/ArrowRight.jsx";
import {useAuth} from "@contexts/AuthContext.jsx";

export default function ProfileMe() {
    const {logout, user} = useAuth();
    console.log(user);
    return (
        <Block style={'default'} tag={'section'} id={'me'} className={'profile__me'}>
            <div className={'profile__name'}>
                <div className={'profile__name-img'}>
                    <img src={user.avatar} alt="avatar"/>
                </div>
                {user.name} {user.surname}
            </div>
            <Button style={'red'} onClick={() => {
                logout();
            }}>
                <ArrowRight></ArrowRight>
                <div>
                    Выйти из аккаунта
                </div>
            </Button>
        </Block>
    )
}