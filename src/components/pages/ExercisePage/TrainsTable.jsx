import "./style.scss";
import {useEffect, useRef} from "react";
import {Exercise, Pause, Train} from "@services/exercises.js";
import Button from "@common/Button/Button.jsx";
import Dropdown from "@pages/ExercisePage/Dropdown/Dropdown.jsx";
import { v4 as uuidv4 } from 'uuid';
import NumInput from "@pages/ExercisePage/NumInput/NumInput.jsx";


export default function TrainsTable({exercise, setCurrentExercise}) {
    const fields = Train.fieldsDictionary;

    function addTrain(){
        const train = new Train();
        const newEx = new Exercise(exercise);
        newEx.parts.push(train);
        setCurrentExercise(newEx);
    }

    function addPause(){
        const pause = new Pause();
        const newEx = new Exercise(exercise);
        newEx.parts.push(pause);
        setCurrentExercise(newEx);
    }

    return (
        <>
            <h2 className={'text-h4-dark-blue'}>Состав занятия</h2>
            <div className={'exercise__table-container'}>
                <table className={'exercise__table'}>
                    <thead>
                    <tr>
                        {Object.values(fields).map((field, i) => (<th key={i}>{field}</th>))}
                    </tr>
                    </thead>
                    <tbody>

                        {exercise.parts.map((part, i) => {
                            const Instance = part instanceof Train ? Train : Pause;

                            return (
                                <tr key={uuidv4()}>
                                    {Object.keys(part).map((key, i) => {
                                        const fieldType = Instance.types[key];
                                        const value = part[key];


                                        // определяем компонент
                                        let Inserted;

                                        if(!fieldType){
                                            Inserted = () => <p>{value}</p>;
                                        }
                                        else if(Array.isArray(fieldType)){
                                            Inserted =() => <Dropdown part={part} field={key} setCurrentExercise={setCurrentExercise} currentExercise={exercise}></Dropdown>
                                        }
                                        else if(fieldType === 'NUMBER'){
                                            let add = '';
                                            if(key === 'hitsRange'){
                                                 add = 'уд. (1 - 100)'
                                            }
                                            else if(key === 'pauseTime'){
                                                add = ' сек.';
                                            }
                                            Inserted =() => <NumInput
                                                setCurrentExercise={setCurrentExercise}
                                                currentExercise={exercise}
                                                addValue={add}
                                                field={key}
                                                part={part}
                                            >

                                            </NumInput>
                                        }


                                        return <td key={uuidv4()}><Inserted></Inserted></td>
                                    })}
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            </div>
            <div className={'exercise__table-buttons'}>
                <Button style={'black'} onClick={addPause}>Добавить паузу</Button>
                <Button style={'black'} onClick={addTrain}>Добавить тренировку</Button>
            </div>
        </>
    )
}