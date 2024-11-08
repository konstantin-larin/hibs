import "./style.scss";
import Text from "@common/Text/Text.jsx";
import {useState} from "react";
import {Validation} from "@services/validation.js";

export default function NiceInput({label, icon = null, className, validation, setValidation, value, onChange, ...props}) {
    const [isVoid, setIsVoid] = useState(true);
    const Icon = icon;
    function handleOnFocus() {
        setValidation(new Validation({error: false}));
        setIsVoid(false);
    }

    function handleOnBlur(e) {
        if (e.target.value.length === 0) {
            setIsVoid(true);
        }
    }

    return (
        <div className={className}>
            <div className={'nice-input ' + (validation.error ? "nice-input_error" : '')} >
                <Text
                    style={'label'} tag={'label'}
                    className={
                        'nice-input__label ' +
                        (validation.error ? "nice-input__label_error " : '') +
                        (isVoid ? "" : 'nice-input__label_up')
                    }>
                    {label}
                </Text>
                <input {...props} className={'nice-input__input '}
                    value={value}
                    onChange={onChange}
                    onFocus={handleOnFocus}
                    onBlur={handleOnBlur}
                />
                {Icon && <Icon></Icon>}
            </div>

            {
                validation.error &&
                <Text className={'nice-input__error'} style={'error'} tag={'p'}>
                    {validation.message}
                </Text>
            }
        </div>
)
}