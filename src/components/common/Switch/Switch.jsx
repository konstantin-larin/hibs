import "./style.scss";
import Text from "@common/Text/Text.jsx";

export default function Switch({label, switched, setSwitched, className=''}) {
    return (
        <div className={'switch ' + className} onClick={() => setSwitched(!switched)} >
            <div className={'switch__toggler ' + (switched ? 'switch__toggler_switched' : '')}>
                <div className={'switch__toggler-element'}>
                </div>
            </div>
            <Text style={'label'} tag={'label'}>{label}</Text>
        </div>
    )
}