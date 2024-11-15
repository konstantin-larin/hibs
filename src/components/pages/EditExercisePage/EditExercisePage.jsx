import "./style.scss";
import {Exercise, Pause, Train} from "@services/exercises.js";
import TrainsTable from "@pages/EditExercisePage/TrainsTable.jsx";
import Layout from "@layout/Layout.jsx";
import Block from "@common/Block/Block.jsx";
import Button from "@common/Button/Button.jsx";
import CommonInput from "@common/CommonInput/CommonInput.jsx";
import {useEffect, useState} from "react";
import {useUsersExercises} from "@contexts/UsersExercisesContext.jsx";
import {Navigate, useNavigate} from "react-router-dom";
import {useAuth} from "@contexts/AuthContext.jsx";
export default function EditExercisePage() {
    const {user} = useAuth();
    const navigate = useNavigate();
    const {currentExercise, setCurrentExercise, sendExercise} = useUsersExercises();
    const [name, setName] = useState('');
    const [shortName, setShortName] = useState('');
    const [description, setDescription] = useState('');
    const [isPending, setIsPending] = useState(false);

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
        currentExercise.name = name;
        currentExercise.shortName = shortName;
        currentExercise.description = description;
        setIsPending(true);
        sendExercise(currentExercise).then(res => {
            if(res){
                setIsPending(false);
                setCurrentExercise(null);
            }
        })
    }

    if(currentExercise){

        return (
            <Layout>
                <Block style={'default'} tag={'form'} onSubmit={handleOnSubmit} className={'exercise'}>
                    <div className={'exercise__head'}>
                        <h1 className={'text-h4-dark-blue'}>О занятии</h1>
                        <div className={'exercise__head-buttons'}>
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
                    <TrainsTable exercise={currentExercise} setCurrentExercise={setCurrentExercise}></TrainsTable>
                </Block>
            </Layout>
        )
    } else {
        const history = JSON.parse(sessionStorage.getItem('history'));
        let lastPath;
        if(history.length > 1){
            history.pop();
            lastPath  = history[history.length - 1];
            if (lastPath.includes('edit')){
                lastPath = '/'
            }
        } else {
            lastPath = '/';
        }
        return (<Navigate to={lastPath}>fijg</Navigate>)
    }

}