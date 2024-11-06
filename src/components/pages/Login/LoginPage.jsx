import AuthBg from "@common/AuthBg/AuthBg.jsx";
import Block from "@common/Block/Block.jsx";
import "./style.scss"
export default function LoginPage(){
    return (
        <div className={'screen'}>
            <AuthBg></AuthBg>
            <Block style={'default'} className={'login-block'}>
                Привет
            </Block>
        </div>
    )
}