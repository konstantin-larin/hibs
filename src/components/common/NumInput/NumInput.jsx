import "./style.scss";
import {useState} from "react";

export default function NumInput({onChange = (value) => value, decimals=0, max, min, initialValue = 0, addValue='', className=''}) {
    const [value, setValue] = useState(initialValue);

    function handleOnInput(e){
        let _value = e.target.value;
        if(_value.startsWith("0") && !_value.includes(',') && _value.length > 1){
            _value = _value.slice(1)
        }


        if(_value.includes('.')){
            const indexOfComma = _value.indexOf('.')
            if(decimals === 0){
                _value = _value.slice(0, indexOfComma - 1);
            }
            else if(indexOfComma < _value.length - 1){
                _value = _value.slice(0, indexOfComma + decimals + 1);
            }
        }

        setValue(_value);
    }

    function handleOnBlur(e){
        let _value = e.target.value;


        if(_value.length === 0){
            _value = min;
        }

        const num = Number(_value);
        console.log(min, max, _value)
        if (num < min){
            _value = min;
        }
        else if(num > max){
            _value = max;
        }

        setValue(_value)
        onChange(+_value);
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