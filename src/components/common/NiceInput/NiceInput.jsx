import "./style.scss";
import Text from "@common/Text/Text.jsx";
import {useState} from "react";
import {Validation} from "@services/validation.js";

export default function NiceInput({label, className, validation, setValidation, ...props}) {
    const [isVoid, setIsVoid] = useState(true);

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
            <div className={'nice-input '}>
                <input {...props} className={'nice-input__input ' + (validation.error ? "nice-input__input_error" : '')}
                    onFocus={handleOnFocus}
                    onBlur={handleOnBlur}
                />
                <Text
                    style={'label'} tag={'label'}
                    className={
                        'nice-input__label ' +
                        (validation.error ? "nice-input__label_error " : '') +
                        (isVoid ? "" : 'nice-input__label_up')
                    }>
                    {label}
                </Text>
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