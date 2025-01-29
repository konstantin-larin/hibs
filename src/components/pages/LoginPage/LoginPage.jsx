import Block from "@common/Block/Block.jsx";
import "./style.scss"
import Text from "@common/Text/Text.jsx";
import Logo from "@common/Logo/Logo.jsx";
import NiceInput from "@common/NiceInput/NiceInput.jsx";
import {useState} from "react";
import Switch from "@common/Switch/Switch.jsx";
import Button from "@common/Button/Button.jsx";
import {Link, Navigate, useNavigate} from "react-router-dom";
import {validateEmail, validatePassword, Validation} from "@services/validation.js";
import {useAuth} from "@contexts/AuthContext.jsx";
import {usePreferences} from "@contexts/PreferencesContext.jsx";
import Spinner from "@common/Spinner/Spinner.jsx";
import Alert from "@widgets/Alert/Alert.jsx";

export default function LoginPage() {
    const auth = useAuth();

    const {useLastPath, setAlertIsOpen, setAlertMessage} = usePreferences();
    const lastPath = useLastPath();

    const [disabled, setDisabled] = useState(false);
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


        const emailValid = validateEmail(email);
        if (emailValid.error) {
            setEmailValidation(emailValid);
            return;
        }

        const passwordValid = validatePassword(password);
        if (passwordValid.error) {
            setPasswordValidation(passwordValid)
            return;
        }
        setDisabled(true);


        auth.login({credentials: {username: email, password}, remember: rememberMe})
            .then(() => {
                    setDisabled(false);
                })
            .catch(err => {
                if(err.status === 401){
                    setAlertIsOpen(true);
                    setAlertMessage('Введены неверные email или пароль')
                }
                setDisabled(false);
            })
        ;
    }

    if (auth.isFetching()) {
        return <Spinner></Spinner>
    }
    if (auth.isAuthenticated()) {
        return (
            <Navigate to={lastPath}></Navigate>
        )
    }
    return (
        <div className={'screen'}>
            <Alert></Alert>
            {/*<AuthBg></AuthBg>*/}
            <Block style={'default'} tag={'form'} className={'login'} onSubmit={handleSubmit}>
                <div className={'login__header'}>
                    <Logo></Logo>
                    <Text style={'h3-white'} tag={'h1'}>
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

                <Switch label={'Запомнить меня'} className={'mt-3'} switched={rememberMe}
                    setSwitched={setRememberMe}></Switch>
                <Button style={'red'} className={'mt-4 w-full'} type={'submit'} disabled={disabled}>
                    <Text style={'btn'} tag={'p'}>ВОЙТИ</Text>
                </Button>
                <div className={'mt-4 text-center mb-1'}>
                    <Text style={'label'} tag={'span'}>Нет аккаунта?{" "}</Text>
                    <Link to={'/register'}><Text style={"important"} tag={'span'}>Зарегистрироваться</Text></Link>
                </div>
            </Block>
        </div>
    )

}