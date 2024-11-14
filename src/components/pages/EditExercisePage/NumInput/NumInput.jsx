import "./style.scss";
import {Exercise} from "@services/exercises.js";
import {useState} from "react";

export default function NumInput({currentExercise, setCurrentExercise, part, field, addValue}) {
    const [value, setValue] = useState(part[field]);


    function handleOnChange(e){
        const str = e.target.value;
        let newValue = +e.target.value;
        if(newValue < 0) newValue = 0;

        // else if(newValue > 0 && str.includes('0')){
        //     setValue(str.split('').filter(s => s !== '0').join(''));
        // }

        else if(newValue > 500){
            newValue = 500;
        }
        setValue(newValue);
    }

    function handleOnBlur(e){
        part[field] = value;
        setCurrentExercise(new Exercise(currentExercise));
    }
    return (
        <div className={'number-input'}>
            <input className={'number-input__input'} type={"number"} value={value} onChange={handleOnChange} onBlur={handleOnBlur}/>
            <div className={'number-input__add'}>{addValue}</div>
        </div>
    )
}