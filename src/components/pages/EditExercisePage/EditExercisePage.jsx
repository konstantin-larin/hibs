import "./style.scss";
import Layout from "@layout/Layout.jsx";
import Block from "@common/Block/Block.jsx";
import Button from "@common/Button/Button.jsx";
import CommonInput from "@common/CommonInput/CommonInput.jsx";
import {useEffect, useRef, useState} from "react";
import {useUsersExercises} from "@contexts/UsersExercisesContext.jsx";
import {Navigate, useNavigate} from "react-router-dom";
import {useAuth} from "@contexts/AuthContext.jsx";
export default function EditExercisePage() {
    const {user} = useAuth();
    const navigate = useNavigate();
    const {editedExercise, setEditedExercise, sendExercise} = useUsersExercises();
    const [name, setName] = useState('');
    const [shortName, setShortName] = useState('');
    const [description, setDescription] = useState('');
    const [isPending, setIsPending] = useState(false);
    const history = JSON.parse(sessionStorage.getItem('history'));
    const pathName = location.pathname;
    const lastPath = useRef('/');

    if(history.length > 1){
        const _lastPath = history.at(-1);
        if(!pathName.includes(_lastPath)){
            lastPath.current = _lastPath;
        }
    }

    function handleNameOnChange(e){
        setName(e.target.value);
    }
    function handleShortNameOnChange(e){
        setShortName(e.target.value);
    }
    function handleDescriptionOnChange(e){
        setDescription(e.target.value);
    }

    function handleOnSubmit(e){
        e.preventDefault();
        editedExercise.name = name;
        editedExercise.shortName = shortName;
        editedExercise.description = description;
        setIsPending(true);
        sendExercise(editedExercise).then(res => {
            if(res){
                setIsPending(false);
                setEditedExercise(null);
            }
        })
    }

    if(editedExercise){

        return (
            <Layout>
                <Block style={'default'} tag={'form'} onSubmit={handleOnSubmit} className={'edited-exercise'}>
                    <div className={'edited-exercise__head'}>
                        <h1 className={'text-h4-dark-blue'}>О&nbsp;занятии</h1>
                        <div className={'edited-exercise__head-buttons'}>
                            {user.role === 'admin' && <Button style={'green'}>Опубликовать</Button>}
                            <Button style={'black'} disabled={isPending} type={'submit'}>Сохранить</Button>
                        </div>
                    </div>
                    <CommonInput value={name} onChange={handleNameOnChange}
                        required={true}
                        className={'mt-3'}
                        label={'Название'} placeholder={'Введите название'}></CommonInput>
                    <CommonInput value={shortName} onChange={handleShortNameOnChange}
                        required={true}
                        label={'Короткое описание (отображается в тренажере)'}
                        placeholder={'Введите описание'}></CommonInput>
                    <CommonInput value={description} onChange={handleDescriptionOnChange}
                        label={'Описание'} placeholder={'Введите описание'}></CommonInput>
                </Block>
            </Layout>
        )
    } else {
        return (<Navigate to={lastPath.current}></Navigate>)
    }

}