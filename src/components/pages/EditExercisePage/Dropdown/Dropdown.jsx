import "./style.scss";
import ShevronUp from "../../../../assets/icons/ShevronUp.jsx";
import {Exercise, Pause, Train} from "@services/exercises.js";
import {useEffect, useState, useRef} from "react";
import { v4 as uuidv4 } from 'uuid';

export default function Dropdown({currentExercise, setCurrentExercise, part, field}) {
    const [isOpened, setIsOpened] = useState(false);
    const el = useRef(null);
    const Instance = part instanceof Train ? Train : Pause;
    const fieldType = Instance.types[field];
    const value = part[field];
    const values = Instance.types[field];

    function handleTogglerOnClick() {
        setIsOpened(true);
    }

    useEffect(() => {
        if(isOpened){
            setTimeout(() => {
                document.addEventListener('click', () => {
                    setIsOpened(false);
                }, {once: true})
            }, 0)
        }
    }, [isOpened])

    function valOnClick(val){
        part[field] = val;
        currentExercise.parts.splice(currentExercise.parts.indexOf(part), 1, new Train(part));
        setCurrentExercise(new Exercise(currentExercise));
    }
    return (
        <div className={'dropdown'} ref={el}>
            <div className={'dropdown__trigger'} onClick={handleTogglerOnClick}>
                <div>{value}</div>
                <div className={'rotate-180'}>
                    <ShevronUp></ShevronUp>
                </div>
            </div>
            <div className={'dropdown__list ' + (isOpened ? 'dropdown__list_opened' : '')}>
                {values.filter(val => val !== value).map((val, i) => (
                    <div key={uuidv4()} onClick={() => valOnClick(val)}>{val}</div>
                ))}
            </div>
        </div>
    )
}