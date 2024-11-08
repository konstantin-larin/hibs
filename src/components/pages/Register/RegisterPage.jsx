import "./style.scss";
import AuthBg from "@common/AuthBg/AuthBg.jsx";
import Block from "@common/Block/Block.jsx";
import Text from "@common/Text/Text.jsx";
import FormGrid from "@common/FormGrid/FormGrid.jsx";
import CommonInput from "@common/CommonInput/CommonInput.jsx";
import {
    validateEmail,
    validatePassword,
    Validation,
    validateRepeatedPassword,
    validateName
} from "@services/validation.js";
import {useState} from "react";
import PasswordHideIcon from "../../../assets/icons/PasswordHideIcon.jsx";
import NameIcon from "../../../assets/icons/NameIcon.jsx";
import {Link, Navigate, useNavigate} from "react-router-dom";
import Button from "@common/Button/Button.jsx";

export default function RegisterPage() {
    const navigate =useNavigate();

    const [name, setName] = useState('');
    const [nameValidation, setNameValidation] = useState(new Validation());
    const [surname, setSurname] = useState('');
    const [surnameValidation, setSurnameValidation] = useState(new Validation());
    const [email, setEmail] = useState('');
    const [emailValidation, setEmailValidation] = useState(new Validation());
    const [password, setPassword] = useState('');
    const [passwordValidation, setPasswordValidation] = useState(new Validation());
    const [repeatedPassword, setRepeatedPassword] = useState('');
    const [repeatedPasswordValidation, setRepeatedPasswordValidation] = useState(new Validation());

    function handleOnSubmit(e){
        e.preventDefault();

        const nameValid = validateName(name);
        if(nameValid.error){
            setNameValidation(nameValid);
        }

        const surnameValid = validateName(surname);
        if(surnameValid.error){
            setSurnameValidation(surnameValid);
        }


        const emailValid = validateEmail(email);
        if(emailValid.error){
            setEmailValidation(emailValid);
            return;
        }


        const passwordValid = validatePassword(password);
        if(passwordValid.error){
            setPasswordValidation(passwordValid)
            return;
        }

        const repeatedPasswordValid = validateRepeatedPassword(password, repeatedPassword);
        if(repeatedPasswordValid.error){
            setRepeatedPasswordValidation(repeatedPasswordValid);
            return;
        }

        navigate('/profile');
    }
    function handleNameOnChange(evt) {
        setName(evt.target.value);
    }

    function handleSurnameOnChange(evt) {
        setSurname(evt.target.value);
    }

    function handlePasswordOnChange(evt) {
        setPassword(evt.target.value);
    }

    function handleEmailOnChange(evt) {
        setEmail(evt.target.value);
    }

    function handleRepeatedPasswordOnChange(evt) {
        setRepeatedPassword(evt.target.value);
    }

    return (
        <div className={'screen'}>
            <AuthBg></AuthBg>
            <Block style={'default'} className={'register'} tag={'form'} onSubmit={handleOnSubmit}>
                <div className={'register__header'}>
                    <Text style={'h3-white'} tag={'h1'}>Регистрация</Text>
                </div>
                <Text style={'h4-dark-blue'} tag={'h2'} className={'mb-4'}>Заполните информацию</Text>

                <FormGrid>
                    <CommonInput
                        label={'Имя'}
                        placeholder={'Введите ваше имя'}
                        icon={NameIcon}
                        validation={nameValidation} setValidation={setNameValidation}
                        value={name} onChange={handleNameOnChange}
                    >
                    </CommonInput>
                    <CommonInput
                        label={'Фамилия'}
                        placeholder={'Введите вашу фамилию'}
                        validation={surnameValidation} setValidation={setSurnameValidation}
                        value={surname} onChange={handleSurnameOnChange}
                    >
                    </CommonInput>

                    <CommonInput
                        placeholder={'Введите вашу почту'}
                        autoComplete={'username'}
                        label={'Email'} validation={emailValidation} setValidation={setEmailValidation}
                        value={email} onChange={handleEmailOnChange} type={'email'}
                    >
                    </CommonInput>
                    <div></div>
                    <CommonInput
                        placeholder={'Введите ваш пароль'}
                        autoComplete={'new-password'}
                        icon={PasswordHideIcon}
                        label={'Пароль'} validation={passwordValidation} setValidation={setPasswordValidation}
                        value={password} onChange={handlePasswordOnChange} type={'password'}
                    >
                    </CommonInput>
                    <CommonInput
                        icon={PasswordHideIcon}
                        label={'Повторите пароль'}
                        autoComplete={'new-password'}
                        placeholder={'Введите ваш пароль'}
                        validation={repeatedPasswordValidation} setValidation={setRepeatedPasswordValidation}
                        value={repeatedPassword} onChange={handleRepeatedPasswordOnChange} type={'password'}
                    >
                    </CommonInput>

                    <div className={'center-row'}>
                        <Text style={'p'} tag={'div'} className={''}>
                            Уже есть аккаунт?{" "}
                            <Text style={'important'} tag={'span'}>
                                <Link to={'/login'}>Войти</Link>
                            </Text>
                        </Text>
                    </div>
                    <Button style={'black'} type={'submit'} className={'ml-auto'}>
                        <Text style={'btn'} tag={'p'}>Далее</Text>
                    </Button>
                </FormGrid>
            </Block>
        </div>
    )
}