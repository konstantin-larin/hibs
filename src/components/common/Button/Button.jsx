import "./style.scss";
import Text from "@common/Text/Text.jsx";

export default function Button({style, children, className, onClick, ...props}) {

    return (
        <button className={`button-${style} ${className || ''}`} onClick={onClick} type={props.type || 'button'} {...props}>
            {children}
        </button>
    )
}