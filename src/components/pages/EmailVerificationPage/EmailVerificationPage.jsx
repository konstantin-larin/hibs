import "./style.scss";
import {useSignUp} from "@contexts/SignUpContext.jsx";
import {Link, Navigate} from "react-router-dom";
import {usePreferences} from "@contexts/PreferencesContext.jsx";
import Block from "@common/Block/Block.jsx";
import Text from "@common/Text/Text.jsx";
import FormGrid from "@common/FormGrid/FormGrid.jsx";
import CommonInput from "@common/CommonInput/CommonInput.jsx";
import NameIcon from "../../../assets/icons/NameIcon.jsx";
import PasswordHideIcon from "../../../assets/icons/PasswordHideIcon.jsx";

import Button from "@common/Button/Button.jsx";
import {useState} from "react";

export default function EmailVerificationPage() {
    const [code, setCode] = useState('');
    const {userData, reactivateEmailTime, emailCanBeReactivated} = useSignUp();
    const {useLastPath} = usePreferences();
    const lastPath = useLastPath();

    if (!userData) return <Navigate to={lastPath}/>
    const normalizedTime = reactivateEmailTime / 1000;
    const minutes = Math.trunc(normalizedTime / 60);
    const seconds = normalizedTime - minutes * 60;


    function handleOnSubmit(e) {
        e.preventDefault();

    }

    function handleCodeOnChange(e) {
        setCode(e.target.value);
    }

    return (
        <div className={'screen'}>
            {/*<AuthBg></AuthBg>*/}
            <Block style={'default'} className={'email-verify'} tag={'form'} onSubmit={handleOnSubmit}>
                <div className={'register__header'}>
                    <Text style={'h3-white'} tag={'h1'}>Подтверждение email</Text>
                </div>
                <div className={'email-verify-panel'}>
                    <div>
                        {emailCanBeReactivated
                            ?
                            <div>Отправить сообщение на почту заново заново</div>
                            :
                            <div>
                                Отправить сообщение на почту заново через {minutes > 9 ? minutes : '0' + minutes}:{seconds > 9 ? seconds : '0' + seconds}
                            </div>
                        }
                    </div>
                    <Button style={'black'} type={'submit'} className={'ml-auto'}>
                        <Text style={'btn'} tag={'p'}>Подтвердить</Text>
                    </Button>
                </div>
            </Block>
        </div>
    )
}
