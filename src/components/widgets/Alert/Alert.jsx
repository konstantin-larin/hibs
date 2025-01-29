import "./style.scss";
import Block from "@common/Block/Block.jsx";
import {usePreferences} from "@contexts/PreferencesContext.jsx";
import {useEffect} from "react";

export default function Alert() {
    const {alertIsOpen, setAlertIsOpen, alertMessage} = usePreferences();

    function handleOnClick(){
        setAlertIsOpen(false);
    }


    return (
        <div className={'alert ' + (alertIsOpen ? 'alert-opened' : 'd-none')} onClick={handleOnClick}>
            <Block style={'default'} className={'alert-inner'}>
                <div className={'text-h5-dark-blue'}>{alertMessage}</div>
            </Block>
        </div>
    )
}