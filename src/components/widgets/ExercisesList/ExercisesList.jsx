import "./style.scss";
import {v4 as uuidv4} from 'uuid';
import {Exercise, Train} from "@services/exercises.js";
import Block from "@common/Block/Block.jsx";
import ExerciseGraph from "../ExerciseGraph/ExerciseGraph.jsx";

export default function ExercisesList({exercises}) {

    return (
        <div className={'exercises-list'}>
            {exercises.map(exercise => {
                    if (exercise instanceof Exercise) {
                        let hitsSum = 0;
                        exercise.parts.forEach(train => {
                            if (train instanceof Train){
                                hitsSum += train.hitsRange;
                            }
                        })
                        return (
                            <Block style={'default'}>
                                <ExerciseGraph></ExerciseGraph>
                                <div className={'text-xs-gray'}>{hitsSum}</div>
                                <div className={'text-h5-dark-blue'}>{exercise.name}</div>
                            </Block>
                        )
                    } else throw new Error("Это не массив Exercise");
                }
            )}
        </div>
    )
}