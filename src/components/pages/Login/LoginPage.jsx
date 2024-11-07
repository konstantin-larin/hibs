import AuthBg from "@common/AuthBg/AuthBg.jsx";
import Block from "@common/Block/Block.jsx";
import "./style.scss"
import Text from "@common/Text/Text.jsx";
import Logo from "@common/Logo/Logo.jsx";
import NiceInput from "@common/NiceInput/NiceInput.jsx";
import {useState} from "react";
import Switch from "@common/Switch/Switch.jsx";
import Button from "@common/Button/Button.jsx";
import {Link} from "react-router-dom";
import {validateEmail, validatePassword, Validation} from "@services/validation.js";
import {useAuth} from "@contexts/AuthContext.jsx";

export default function LoginPage() {
    const auth = useAuth();
    const [email, setEmail] = useState("");
    const [emailValidation, setEmailValidation] = useState(new Validation());
    const [password, setPassword] = useState("");
    const [passwordValidation, setPasswordValidation] = useState(new Validation());
    const [rememberMe, setRememberMe] = useState(false);

    function handleEmailChange(evt) {
        setEmail(evt.target.value);
    }

    function handlePasswordChange(evt) {
        setPassword(evt.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setEmailValidation(validateEmail(email));
        if(emailValidation.error){
            return;
        }

        setPasswordValidation(validatePassword(password));
        if(passwordValidation.error){
            return;
        }

        auth.login({user: {email, password}, remember: rememberMe})
    }

    return (
        <div className={'screen'}>
            <AuthBg></AuthBg>
            <Block style={'default'} tag={'form'} className={'login-block'} onSubmit={handleSubmit}>
                <div className={'login-block__header'}>
                    <Logo></Logo>
                    <Text style={'h3'} tag={'h3'}>
                        Вход
                    </Text>
                </div>
                <NiceInput
                    required
                    label={'Email'}
                    type={'email'}
                    value={email}
                    validation={emailValidation}
                    setValidation={setEmailValidation}
                    onChange={handleEmailChange}
                    autoComplete={'username'}
                ></NiceInput>

                <NiceInput
                    required
                    label={'Пароль'}
                    type={'password'}
                    value={password}
                    validation={passwordValidation}
                    setValidation={setPasswordValidation}
                    className={'mt-1'}
                    onChange={handlePasswordChange}
                    autoComplete="current-password"
                ></NiceInput>

                <Switch label={'Запомнить меня'} className={'mt-1'} switched={rememberMe}
                    setSwitched={setRememberMe}></Switch>
                <Button style={'stretched'} className={'mt-3'} type={'submit'}>Войти</Button>
                <div className={'mt-3 text-center mb-1'}>
                    <Text style={'label'} tag={'span'}>Нет аккаунта?{" "}</Text>
                    <Link to={'/register'}><Text style={"link"} tag={'span'}>Зарегистрироваться</Text></Link>
                </div>
            </Block>
        </div>
    )
}