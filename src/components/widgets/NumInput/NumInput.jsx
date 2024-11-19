import "./style.scss";
import {Exercise} from "@services/exercises.js";
import {useState} from "react";

export default function NumInput({editedExercise, setEditedExercise, part, field, addValue, max, disabled=false}) {
    const [value, setValue] = useState(part[field]);


    function handleOnInput(e){
        let value = e.target.value;
        if(value.startsWith("0") && !value.includes(',') && value.length > 1){
            value = value.slice(1)
        }
        if(value.length === 0){
            value = 0;
        }
        const num = Number(value);
        if (num < 0) value = 0;
        else if(num > max) value = max;

        setValue(value);
    }

    function handleOnBlur(e){
        part[field] = +value;
        setEditedExercise(new Exercise(editedExercise));
    }
    return (
        <div className={'number-input'}>
            <input style={{
                width: (value + '').length * 0.9 + 'rem'
            }} className={'number-input__input'}
                type={"number"} onInput={handleOnInput}
                value={value}
                disabled={disabled}
                onBlur={handleOnBlur}/>
            <div className={'number-input__add'}>{addValue}</div>
        </div>
    )
}