import "./style.scss";
import Text from "@common/Text/Text.jsx";

export default function Button({style, children, onClick, ...props}) {

    return (
        <button className={`button-${style} ${props.className || ''}`} onClick={onClick} type={props.type || 'button'}>
            <Text style={'btn'} tag={'p'}>{children}</Text>
        </button>
    )
}