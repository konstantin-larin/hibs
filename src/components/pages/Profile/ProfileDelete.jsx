import "./style.scss";
import Block from "@common/Block/Block.jsx";
import Button from "@common/Button/Button.jsx";
import {useAuth} from "@contexts/AuthContext.jsx";

export default function ProfileDelete() {
    const {logout} = useAuth();
    function handleOnClick(){
        alert('Ваш аккаунт удален.')
        logout();
    }
    return (
        <Block style={'default'} tag={'section'} id={'delete'} className={'profile__delete'}>
            <div>
                <h2 className={'text-h4-dark-blue'}>Удалить учетную запись</h2>
                <p className={'mt-2 text-sm-gray'}>Это действие невозможно отменить</p>
            </div>

            <Button style={'red'} onClick={handleOnClick}>
                Удалить учетную запись
            </Button>
        </Block>
    )
}