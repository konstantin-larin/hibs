import "./style.scss";
import {useEffect, useRef} from "react";
import {Exercise, Pause, Train} from "@services/exercises.js";
import Button from "@common/Button/Button.jsx";
import Dropdown from "@pages/EditExercisePage/Dropdown/Dropdown.jsx";
import {v4 as uuidv4} from 'uuid';
import NumInput from "@pages/EditExercisePage/NumInput/NumInput.jsx";


export default function TrainsTable({exercise, setEditedExercise}) {
    const fields = Train.fieldsDictionary;

    function addTrain() {
        const train = new Train();
        const newEx = new Exercise(exercise);
        newEx.parts.push(train);
        setEditedExercise(newEx);
    }

    function addPause() {
        const pause = new Pause();

        const newEx = new Exercise(exercise);
        newEx.parts.push(pause);
        setEditedExercise(newEx);
    }

    return (
        <>
            <h2 className={'text-h4-dark-blue'}>Состав занятия</h2>
            <div className={'edited-exercise__table-container'}>
                <table className={'edited-exercise__table'}>
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
                                {Object.keys(part).filter(key => !key.startsWith('_')).map((key, i) => {
                                    const fieldType = Instance.types[key];
                                    const value = part[key];

                                    // определяем компонент
                                    let Inserted;

                                    if (!fieldType) {
                                        Inserted = () => <p>{value}</p>;
                                    } else if (Array.isArray(fieldType)) {
                                        Inserted = () => <Dropdown part={part} field={key}
                                            setEditedExercise={setEditedExercise}
                                            editedExercise={exercise}></Dropdown>
                                    } else if (fieldType === 'NUMBER') {
                                        let add = '';
                                        let max = 100;
                                        let disabled = false;

                                        if (Instance === Train) {
                                            const trainType = part.trainType;
                                            switch (key) {
                                                case 'hitsRange':
                                                    max = 10000;
                                                    add = 'уд.';
                                                    disabled = trainType === 'FTP';
                                                    break;
                                                case 'speed':
                                                    max = 1;
                                                    disabled = trainType !== 'Базовая';
                                                    break;
                                                case 'delay':
                                                    max = 100;
                                                    disabled = trainType === 'FTP';
                                                    break;
                                            }
                                        }
                                        if (key === 'pauseTime') {
                                            add = ' сек.';
                                        }

                                        const value = part[key];

                                        if (value !== null) {
                                            Inserted = () => <NumInput
                                                setEditedExercise={setEditedExercise}
                                                editedExercise={exercise}
                                                addValue={add}
                                                field={key}
                                                part={part}
                                                max={max}
                                                disabled={disabled}
                                            >

                                            </NumInput>
                                        } else {
                                            Inserted = () => <p>Н/Д</p>
                                        }
                                    }


                                    return <td key={uuidv4()}><Inserted></Inserted></td>
                                })}
                            </tr>
                        )
                    })}

                    </tbody>
                </table>
            </div>
            <div className={'edited-exercise__table-buttons'}>
                <Button style={'black'} onClick={addPause}>Добавить паузу</Button>
                <Button style={'black'} onClick={addTrain}>Добавить тренировку</Button>
            </div>
        </>
    )
}