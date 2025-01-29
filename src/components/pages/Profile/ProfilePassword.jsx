import "./style.scss";
import Block from "@common/Block/Block.jsx";
import Text from "@common/Text/Text.jsx";
import NiceInput from "@common/NiceInput/NiceInput.jsx";
import {useAuth} from "@contexts/AuthContext.jsx";
import {useEffect, useState} from "react";

import {validateCorrectPassword, validatePassword, validateRepeatedPassword, Validation} from "@services/validation.js";
import Button from "@common/Button/Button.jsx";
import PasswordHideIcon from "../../../assets/icons/PasswordHideIcon.jsx";

export default function ProfilePassword() {
    const {user} = useAuth();
    const [password, setPassword] = useState('');
    const [passwordValidation, setPasswordValidation] = useState(new Validation());
    const [repeatedPassword, setRepeatedPassword] = useState('');
    const [repeatedPasswordValidation, setRepeatedPasswordValidation] = useState(new Validation());
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordValidation, setNewPasswordValidation] = useState(new Validation());

    const [isChanged, setIsChanged] = useState(false);
    useEffect(() => {
        setIsChanged((password.trim().length > 0 || repeatedPassword.trim().length > 0 || newPassword.trim().length > 0));
    }, [password, repeatedPassword, newPassword]);

    function handlePasswordOnChange(e){
        setPassword(e.target.value);
    }
    function handleRepeatedPasswordOnChange(e){
        setRepeatedPassword(e.target.value);
    }
    function handleNewPasswordOnChange(e){
        setNewPassword(e.target.value);
    }
    function handleOnSubmit(e){
        e.preventDefault();
        const passwordValid = validateCorrectPassword(user.password, password);
        console.log(passwordValid);
        if(passwordValid.error){
            setPasswordValidation(passwordValid);
            return;
        }


        const newPasswordValid = validatePassword(newPassword);
        if(newPasswordValid.error){
            setNewPasswordValidation(newPasswordValid);
            return;
        }

        const repeatedPasswordValid = validateRepeatedPassword(newPassword, repeatedPassword);
        if(repeatedPasswordValid.error){
            setRepeatedPasswordValidation(repeatedPasswordValid);
            return;
        }

        alert('Пароль изменен');
    }

    return (
        <Block style={'default'} tag={'section'} id={'password'} className={'profile__password'}>
            <h2 className={'text-h4-dark-blue'}>Изменить пароль</h2>
            <form onSubmit={handleOnSubmit}>
                <div className={'mt-3'}>
                    <NiceInput
                        icon={PasswordHideIcon}
                        label={'Текущий пароль'} className={'mt-1'}
                        setValidation={setPasswordValidation}
                        validation={passwordValidation}
                        value={password}
                        type={'password'}
                        onChange={handlePasswordOnChange}
                    ></NiceInput>
                    <NiceInput
                        icon={PasswordHideIcon}
                        label={'Новый пароль'} className={'mt-1'}
                        type={'password'}
                        setValidation={setNewPasswordValidation}
                        validation={newPasswordValidation}
                        value={newPassword}
                        onChange={handleNewPasswordOnChange}
                    ></NiceInput>

                    <NiceInput
                        icon={PasswordHideIcon}
                        label={'Повторите новый пароль'} className={'mt-1'}
                        type={'password'}
                        setValidation={setRepeatedPasswordValidation}
                        validation={repeatedPasswordValidation}
                        value={repeatedPassword}
                        onChange={handleRepeatedPasswordOnChange}
                    ></NiceInput>
                </div>

                <div className="profile__password-info">
                    <div>
                        <h3 className={'text-h4-dark-blue'}>Изменить пароль</h3>
                        <h4 className={'text-h5-gray mt-1'}>Следуйте инструкции, чтобы подобрать надежный пароль</h4>
                        <ul>
                            <li>Только уникальные символы</li>
                            <li>Минимум 6 символов</li>
                            <li>Один из символов - число (рекомендуется 2)</li>
                            <li>Рекомендуется менять пароль часто</li>
                        </ul>
                    </div>

                    {isChanged && (
                        <Button style={'black'} type={'submit'}>
                            Обновить пароль
                        </Button>
                    )}
                </div>
            </form>
        </Block>
    )
}