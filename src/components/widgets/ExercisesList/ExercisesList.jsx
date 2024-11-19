import "./style.scss";
import {v4 as uuidv4} from 'uuid';
import {Exercise} from "@services/exercises.js";
import Block from "@common/Block/Block.jsx";
import ExerciseGraph from "../ExerciseGraph/ExerciseGraph.jsx";
import {useUsersExercises} from "@contexts/UsersExercisesContext.jsx";
import {useNavigate} from "react-router-dom";

export default function ExercisesList({exercises}) {
    const {setViewedExercise} = useUsersExercises();
    const navigate = useNavigate();
    return (
        <div className={'exercises-list'}>
            {exercises.map(exercise => {
                    if (exercise instanceof Exercise) {

                        return (
                            <Block
                                style={'default'} key={uuidv4()}
                                onClick={() => {
                                    setViewedExercise(exercise);
                                    navigate('/exercises/exercise');
                                }}
                            >
                                <ExerciseGraph exercise={exercise} className={'graph-on-card'}></ExerciseGraph>
                                <div className={'text-xs-gray'}>{exercise.getHitsSum()}</div>
                                <div className={'text-h5-dark-blue'}>{exercise.name}</div>
                            </Block>
                        )
                    } else throw new Error("Это не массив Exercise");
                }
            )}
        </div>
    )
}