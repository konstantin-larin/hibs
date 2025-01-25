import "./style.scss";
import CommonInput from "@common/CommonInput/CommonInput.jsx";
import {useState} from "react";
import {validateEmail, validateName, Validation} from "@services/validation.js";
import Block from "@common/Block/Block.jsx";
import Text from "@common/Text/Text.jsx";
import Button from "@common/Button/Button.jsx";
import DropdownList from "@common/DropdownList/DropdownList.jsx";
import Switch from "@common/Switch/Switch.jsx";
import {postUser} from "@services/api.js";
import {useAuth} from "@contexts/AuthContext.jsx";

const AUTHORITIES = [
    {label: 'CUSTOMER_USER', value: 'CUSTOMER_USER'},
    {label:'SYS_ADMIN', value: 'SYS_ADMIN'},
    {label: 'TENANT_ADMIN', value: 'TENANT_ADMIN'},
];

export default function UserForm({user, submitUser}) {
    const auth = useAuth();
    const [firstName, setFirstName] = useState(user?.firstName ?? '');
    const [firstNameValidation, setFirstNameValidation] = useState(new Validation());
    const [lastName, setLastName] = useState(user?.lastName ?? '');
    const [lastNameValidation, setLastNameValidation] = useState(new Validation());
    const [email, setEmail] = useState(user?.email ?? '');
    const [emailValidation, setEmailValidation] = useState(new Validation());
    const [phone, setPhone] = useState(user?.phone ?? '');
    const [authority, setAuthority] = useState({
        label: user?.authority ?? AUTHORITIES[0].label,
        value: user?.authority ?? AUTHORITIES[0].value,
    });
    const [sendActivationEmail, setSendActivationEmail] = useState(false);


    function handleAuthorityOnChoose(item){
        setAuthority(item);
    }

    function firstNameOnChange(e) {
        setFirstName(e.target.value);
    }

    function lastNameOnChange(e) {
        setLastName(e.target.value);
    }

    function emailOnChange(e) {
        setEmail(e.target.value);
    }
    function phoneOnChange(e){
        setPhone(e.target.value);
    }

    function handleOnSubmit(e){
        e.preventDefault();

        // const firstNameValid = validateName(firstName);
        // if(firstNameValid.error){
        //     setFirstNameValidation(firstNameValid);
        //     return;
        // }
        //
        // const lastNameValid = validateName(lastName);
        // if(lastNameValid.error){
        //     setLastNameValidation(lastNameValid);
        //     return;
        // }


        const emailValid = validateEmail(email);
        if(emailValid.error){
            setEmailValidation(emailValid);
            return;
        }

        const _user = structuredClone(user);
        _user.firstName = firstName;
        _user.lastName = lastName;
        _user.email =  email;
        _user.phone = phone;
        _user.authority = authority.value;
        _user.version = _user.version ?? 0;
        postUser(_user, sendActivationEmail, auth.user)
            .then(data => {
                submitUser(data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <Block style={'default'} tag={'form'} className={'user-form'} onSubmit={handleOnSubmit}>
            <Text style={'h4-dark-blue'} tag={'h2'} className={'mb-4'}>Информация о пользователе</Text>
            <div className={'aligned-between'}>
                <Text style={'label'} tag={'div'} className={'w-fit'}>
                    Роль:
                </Text>
                <DropdownList items={AUTHORITIES} currentItem={authority} onChoose={handleAuthorityOnChoose}></DropdownList>
            </div>
            <CommonInput
                className={'mt-2'}
                label={'Имя'}
                value={firstName} onChange={firstNameOnChange}
                validation={firstNameValidation} setValidation={setFirstNameValidation}
            ></CommonInput>
            <CommonInput
                className={'mt-2'}
                label={'Фамилия'}
                value={lastName} onChange={lastNameOnChange}
                validation={lastNameValidation} setValidation={setLastNameValidation}
            ></CommonInput>
            <CommonInput
                className={'mt-2'}
                label={'Email'}
                value={email} onChange={emailOnChange}
                validation={emailValidation} setValidation={setEmailValidation}
            ></CommonInput>
            <div className={'mt-1'}>
                <Switch label={'Выслать активационную ссылку'} switched={sendActivationEmail} setSwitched={setSendActivationEmail}></Switch>
            </div>
            <CommonInput
                className={'mt-2'}
                label={'Phone'}
                value={phone}
                onChange={phoneOnChange}
            >
            </CommonInput>

            <Button style={'red'} className={'mt-3 w-full'} type={'submit'}>Подтвердить</Button>
        </Block>
    )
}