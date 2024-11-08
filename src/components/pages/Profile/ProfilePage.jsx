import "./style.scss";
import Layout from "@layout/Layout.jsx";
import Block from "@common/Block/Block.jsx";
import {Link} from "react-router-dom";

export default function ProfilePage() {
    return (
        <Layout>
            <div className={'profile-page'}>
                <Block style={'default'} tag={'nav'} className={'profile-nav'}>
                    <a href="#me" className={'profile-nav__elem'}>Профиль</a>
                </Block>
                <div className={'profile'}>
                    <Block style={'default'} tag={'section'} id={'me'} className={'profile__me'}></Block>
                    <Block style={'default'} tag={'section'} id={'info'} className={'profile__info'}></Block>
                    <Block style={'default'} tag={'section'} id={'password'} className={'profile__password'}></Block>
                    <Block style={'default'} tag={'section'} id={'delete'} className={'profile__delete'}></Block>
                </div>
            </div>
        </Layout>
    )
}