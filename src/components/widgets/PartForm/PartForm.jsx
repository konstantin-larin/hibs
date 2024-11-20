import "./style.scss";
import Block from "@common/Block/Block.jsx";
import {v4 as uuidv4} from 'uuid';

import {BaseTrain, ConstantValue, Exercise, ListValue, PARTS_TYPES, RangeValue} from "@services/exercises.js";
import {useEffect, useRef, useState} from "react";
import DropdownList from "../../common/DropdownList/DropdownList.jsx";
import NumInput from "../../common/NumInput/NumInput.jsx";
import Button from "@common/Button/Button.jsx";
import {usePreferences} from "@contexts/PreferencesContext.jsx";

const itemsParts = PARTS_TYPES.map(partType => {
    return {label: partType.name, value: partType}
})


export default function PartForm({editPart = new BaseTrain(), setParts, parts}) {
    const {setModalOpened} = usePreferences();
    const [part, setPart] = useState(editPart);
    const [partType, setPartType] = useState(itemsParts[0]);
    const PartType = useRef(partType.value);

    function handleOnChooseType(type) {
        PartType.current = type.value;
        setPart(new PartType.current({id: part.id}));
        setPartType(type);
    }

    function handleOnSubmit(e) {
        e.preventDefault();
        const partIndex = parts.findIndex(p => p.id === part.id);
        if(partIndex >= 0){
            parts.splice(partIndex, 1, part);
        } else{
            parts.push(part);
        }

        setParts([...parts]);
        setModalOpened(false);
    }


    return (
        <Block style={'default'} tag={'form'} className={'train-form'} onSubmit={handleOnSubmit}>
            <h3 className={'text-h3-dark-blue'}>Создание тренировки</h3>
            <div className={'aligned-between mt-1'}>
                <h4 className={'text-h5-dark-blue w-fit'}>Выберите тип тренировки</h4>
                <DropdownList items={itemsParts} currentItem={partType} onChoose={handleOnChooseType}
                    className={'train-form__input'}></DropdownList>
            </div>
            {
                PartType.current.keys.map(key => {
                    const param = part.getParam(key);
                    let Input = <></>;
                    if (param instanceof ConstantValue) {
                        Input = <p className={'train-form__input'}>{param.value}</p>
                    }
                    if (param instanceof RangeValue) {
                        function handleOnChange(value) {
                            part[key] = new RangeValue({
                                ...param,
                                value,
                            });
                            setPart(new PartType.current(part));
                        }

                        Input = <NumInput
                            max={param.max}
                            onChange={handleOnChange}
                            initialValue={param.value}
                            min={param.min}
                            addValue={param.addValue}
                            className={'train-form__input'}
                        ></NumInput>
                    }
                    if (param instanceof ListValue) {
                        function handleOnChoose(item) {
                            part[key] = new ListValue({
                                name: param.name,
                                currentItem: item,
                                items: param.items,
                                });
                            setPart(new PartType.current(part));
                        }

                        Input = <DropdownList
                            items={param.items}
                            className={'train-form__input'}
                            onChoose={handleOnChoose}
                            currentItem={param.currentItem}
                        ></DropdownList>

                    }

                    return (
                        <div className={'aligned-between mt-1'} key={uuidv4()}>
                            <h4 className={'text-h5-dark-blue w-fit'}>Выберите {param.name.toLowerCase()}</h4>
                            {Input}
                        </div>
                    )
                })
            }
            <Button type={'submit'} style={'red'} className={'ml-auto mt-2'}>Создать</Button>
        </Block>
    )
}