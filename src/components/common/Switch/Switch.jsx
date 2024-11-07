import "./style.scss";
import Text from "@common/Text/Text.jsx";
import {useEffect, useLayoutEffect, useRef} from "react";

export default function Switch({label, switched, setSwitched, className = ''}) {
    const anim = useRef(null);
    function handleOnClick(){
        setTimeout(() => {
            anim.current.classList.add('switch__toggler-element-anim_active');
        }, 0);
        anim.current.addEventListener('animationend', () => {
            anim.current.classList.remove('switch__toggler-element-anim_active');
        }, {once: true});
        setSwitched(!switched)
    }
    return (
        <div className={'switch ' + className} onClick={handleOnClick}>
            <div className={'switch__toggler ' + (switched ? 'switch__toggler_switched' : '')}>
                <div className={'switch__toggler-element'}>
                    <div className="switch__toggler-element-anim" ref={anim}></div>
                </div>
            </div>
            <Text style={'label'} tag={'label'}>{label}</Text>
        </div>
    )
}