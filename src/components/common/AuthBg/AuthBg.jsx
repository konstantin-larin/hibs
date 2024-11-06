import bg from "@images/auth_bg.png"
import "./style.scss";
export default function AuthBg(){
    return (
        <div className={'auth-bg'}>
            <img src={bg} alt="auth_bg"/>
        </div>
    )
}