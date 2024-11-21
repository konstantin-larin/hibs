import "./style.scss";

import Button from "@common/Button/Button.jsx";
import PartForm from "../PartForm/PartForm.jsx";
import {usePreferences} from "@contexts/PreferencesContext.jsx";
import EditIcon from "../../../assets/icons/EditIcon.jsx";
import {ListValue, PARTS_TYPES, RangeValue} from "@services/exercises.js";
import {v4 as uuidv4} from 'uuid';

//
export default function PartsList({mode = 'view', parts = [], setParts,}) { //mode = view|edit
    const {setModalOpened, setModalInner} = usePreferences();

    function handleAddOnClick() {
        setModalOpened(true);
        setModalInner(<PartForm setParts={setParts} editPart={null} parts={parts}></PartForm>);
    }


    return (
        <>
            <h2 className={'text-h4-dark-blue mt-3'}>Состав занятия</h2>
            <div className={'parts-list'}>
                {parts.length > 0 ? parts.map(part => {
                        const PartType = PARTS_TYPES.find(T => part instanceof T);
                        return (
                            <div className={'parts-list__item mt-2'} key={uuidv4()}>
                                <div className={'parts-list__item-head'}>
                                    <h4 className={'parts-list__item text-h5-dark-blue'}>{PartType.name}</h4>
                                    {mode === 'edit' &&
                                        <button className={'parts-list__edit'} type={'button'} onClick={() => {
                                            setModalOpened(true);
                                            setModalInner(<PartForm editPart={part} setParts={setParts}
                                                parts={parts}></PartForm>);
                                        }}>
                                            <EditIcon></EditIcon>
                                        </button>}
                                </div>

                                <div className={'parts-list__item-row mt-1'}>
                                    {PartType.keys.map(key => {
                                        const param = part.getParam(key);
                                        return (
                                            <div className={'parts-list__item-value'} key={uuidv4()}>
                                                <span className={'text-sm-dark-blue'}>{param.name}:</span>
                                                <span>
                                                    {param instanceof ListValue ? param.currentItem.label : param.value}
                                                    {param instanceof RangeValue && " " + param.addValue}
                                                </span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    }) :
                    <p className={'text-h5-dark-blue'}>Тренировки не назначены</p>
                }
            </div>
            {mode === 'edit' &&  <Button style={'black'} className={'ml-auto'} onClick={handleAddOnClick}>Добавить тренировку</Button>}
        </>
    )
}