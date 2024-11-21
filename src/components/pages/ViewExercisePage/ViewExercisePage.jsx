import "./style.scss";
import Layout from "@layout/Layout.jsx";
import Block from "@common/Block/Block.jsx";
import {useEffect, useRef, useState} from "react";
import {useUsersExercises} from "@contexts/UsersExercisesContext.jsx";
import {Navigate, useNavigate} from "react-router-dom";
import {useAuth} from "@contexts/AuthContext.jsx";
import ExerciseGraph from "../../widgets/ExerciseGraph/ExerciseGraph.jsx";
import Button from "@common/Button/Button.jsx";
import EditIcon from "../../../assets/icons/EditIcon.jsx";
import PartsList from "../../widgets/PartsList/PartsList.jsx";

export default function EditExercisePage() {
    const {user} = useAuth();
    const navigate = useNavigate();
    const {viewedExercise, setViewedExercise, setEditedExercise} = useUsersExercises();
    const [parts, setParts] = useState(viewedExercise ? [...viewedExercise.parts] : null);
    const history = JSON.parse(sessionStorage.getItem('history'));
    const pathName = location.pathname;
    const lastPath = useRef('/');

    if(history.length > 1){
        const _lastPath = history.at(-1);
        if(!pathName.includes(_lastPath)){
            lastPath.current = _lastPath;
        }
    }


    function editExercise(){
        setEditedExercise(viewedExercise);
        navigate('/exercises/edit');
    }


    if (viewedExercise && parts) {

        return (
            <Layout>
                <Block style={'default'} tag={'div'} className={'viewed-exercise'}>
                    <h2 className={'text-h4-dark-blue'}>О занятии</h2>
                    <div className={'viewed-exercise__info mt-3'}>
                        <ExerciseGraph exercise={viewedExercise}></ExerciseGraph>
                        <div>
                            <div className={'viewed-exercise__head'}>
                                <div>
                                    <h3 className={'text-h2-dark-blue'}>{viewedExercise.name}</h3>
                                    <div className={'viewed-exercise__charts'}>
                                        <div
                                            className={'viewed-exercise__charts-green'}>{viewedExercise.getMaxEnergy()} BSP
                                        </div>
                                        <div>0.7 ip</div>
                                        <div>{viewedExercise.getMaxHits()} ударов</div>
                                    </div>
                                </div>
                                <Button style={'black'} onClick={editExercise}>
                                    <EditIcon></EditIcon>
                                    Редактировать
                                </Button>
                            </div>
                            <h4 className={'text-sm-dark-blue mt-1'}>Описание</h4>
                            <p className={'mt-1 ml-1'}>
                                {viewedExercise.description || 'Без описания'}
                            </p>

                            <div className={'mt-2 viewed-exercise__buttons'}>
                                {!lastPath.current.endsWith('/saved') &&
                                    <Button style={'blue'}>Добавить на устройство</Button>}
                                {!lastPath.current.endsWith('/my') && <Button style={'green'}>Добавить в Мои занятия</Button>}
                            </div>
                        </div>
                    </div>
                    <PartsList parts={parts} setParts={setParts} mode={'view'}></PartsList>
                </Block>
            </Layout>
        )
    } else {
        return (<Navigate to={lastPath.current}></Navigate>)
    }

}