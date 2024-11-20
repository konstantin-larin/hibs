import "./style.scss";
import {useState} from "react";

export default function NumInput({onChange = (value) => value, max, min, initialValue = 0, addValue='', className=''}) {
    const [value, setValue] = useState(initialValue);

    function handleOnInput(e){
        let _value = e.target.value;
        if(_value.startsWith("0") && !_value.includes(',') && _value.length > 1){
            _value = _value.slice(1)
        }
        if(_value.length === 0){
            _value = 0;
        }
        const num = Number(_value);
        if (num < min) _value = min;
        else if(num > max) _value = max;

        setValue(+_value);
    }

    function handleOnBlur(e){
        onChange(value);
    }


    return (
        <div className={'number-input ' + className}>
            <div className={'number-input__input-container'}>
                <input className={'number-input__input'} //style={{ width: (value + '').length * 0.9 + 'rem'}}
                    type={"number"} onInput={handleOnInput}
                    value={value}
                    onBlur={handleOnBlur}/>
            </div>
            <div className={'number-input__add'}>{addValue}</div>
        </div>
    )
}