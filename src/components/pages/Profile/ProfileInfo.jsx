import "./style.scss";
import Block from "@common/Block/Block.jsx";
import Text from "@common/Text/Text.jsx";
import CommonInput from "@common/CommonInput/CommonInput.jsx";
import {useAuth} from "@contexts/AuthContext.jsx";
import {useEffect, useState} from "react";
import {validateName, validateEmail, Validation} from "@services/validation.js";
import FormGrid from "@common/FormGrid/FormGrid.jsx";
import Button from "@common/Button/Button.jsx";

export default function ProfileInfo() {
    const {user} = useAuth();
    const [name, setName ] = useState(user.name);
    const [nameValidation, setNameValidation] = useState(new Validation());
    const [surname, setSurname] = useState(user.surname);
    const [surnameValidation, setSurnameValidation] = useState(new Validation());
    const [email, setEmail] = useState(user.email);
    const [emailValidation, setEmailValidation] = useState(new Validation());

    const [isChanged, setIsChanged] = useState(false);

    function handleOnChangeName(e){
        setName(e.target.value);
    }
    function handleOnChangeSurname(e){
        setSurname(e.target.value);
    }
    function handleOnChangeEmail(e){
        setEmail(e.target.value);
    }

    function handleOnSubmit(e){
        e.preventDefault();
        const nameValid = validateName(name);
        if(nameValid.error){
            setNameValidation(nameValid);
            return;
        }
        const surnameValid = validateName(surname);
        if(surnameValid.error){
            setSurnameValidation(surnameValid);
            return;
        }
        const emailValid = validateEmail(email);
        if(emailValid.error){
            setEmailValidation(emailValid);
            return
        }

        alert("Изменено");
    }


    useEffect(() => {
        if(
            name !== user.name || email !== user.email || surname !== user.surname
        ){
            setIsChanged(true);
        } else {
            setIsChanged(false);
        }
    }, [name, email, surname]);
    return (
        <Block style={'default'} tag={'section'} id={'info'} className={'profile__info'}>
            <h2 className={'text-h4-dark-blue'}>Информация</h2>
            <FormGrid className={'mt-3'} tag={'form'} onSubmit={handleOnSubmit}>
                <CommonInput
                    label={'Имя'} value={name} onChange={handleOnChangeName}
                    placeholder={name}
                    validation={nameValidation} setValidation={setNameValidation}
                ></CommonInput>
                <CommonInput
                    label={'Фамилия'} value={surname} onChange={handleOnChangeSurname}
                    placeholder={surname}
                    validation={surnameValidation} setValidation={setSurnameValidation}
                ></CommonInput>
                <CommonInput
                    label={'Email'} value={email} onChange={handleOnChangeEmail}
                    placeholder={email}
                    validation={emailValidation} setValidation={setEmailValidation}
                ></CommonInput>
                {isChanged && <Button style={'black'} type={'submit'}>Изменить</Button>}
            </FormGrid>
        </Block>
    )
}