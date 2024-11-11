import "./style.scss";
import Text from "@common/Text/Text.jsx";
import {Validation} from "@services/validation.js";

export default function CommonInput({icon = null,
                                        label, value, onChange,
                                        className, validation=(new Validation()),
                                        setValidation=() => (new Validation()),
                                        ...props}) {

    function handleOnFocus() {
        setValidation(new Validation({error: false}));
    }
    const Icon = icon;
    return (
        <div className={className}>
            <div className={'common-input ' + (validation.error ? "common-input_error" : '')}>
                <Text
                    style={'label'} tag={'label'}
                    className={
                        'common-input__label ' +
                        (validation.error ? "common-input__label_error " : '')
                    }>
                    {label}
                </Text>


                <input {...props} onChange={onChange} value={value}
                    className={'common-input__input ' + (validation.error ? "common-input__input_error" : '')}
                    onFocus={handleOnFocus}
                />
                {icon &&  <Icon className={'common-input__icon'}></Icon>}
            </div>

            {
                validation.error &&
                <Text className={'common-input__error'} style={'error'} tag={'p'}>
                    {validation.message}
                </Text>
            }
        </div>
    )
}