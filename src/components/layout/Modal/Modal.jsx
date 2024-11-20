import "./style.scss";
import {useState} from "react";
import {usePreferences} from "@contexts/PreferencesContext.jsx";
import CrossIcon from "../../../assets/icons/CrossIcon.jsx";

export default function Modal() {
    const {modalOpened, setModalOpened, ModalInner, setModalInner} = usePreferences();
    function close(){
        setModalOpened(false);
    }
    return (
        modalOpened && (
            <div className={'modal'}>
                <button className={'modal__close'} onClick={close}>
                    <CrossIcon></CrossIcon>
                </button>
                <div className="modal__inner">
                    {ModalInner}
                </div>
            </div>
        )
    )
}