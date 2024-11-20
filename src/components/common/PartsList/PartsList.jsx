import "./style.scss";
import PartItem from "./PartItem.jsx";
import Button from "@common/Button/Button.jsx";
import PartForm from "../../widgets/PartForm/PartForm.jsx";
import {usePreferences} from "@contexts/PreferencesContext.jsx";
//
export default function PartsList({mode = 'view', parts = [], setParts,}) { //mode = view|edit
    const {setModalOpened, setModalInner} = usePreferences();

    function handleAddOnClick() {
        setModalOpened(true);
        setModalInner(<PartForm setParts={setParts} parts={parts}></PartForm>);
    }

    return (
        <>
            <h2 className={'text-h4-dark-blue mt-3'}>Состав занятия</h2>
            <div className={'parts-list'}>
                {parts.length > 0 ? parts.map(part => (<PartItem part={part}></PartItem>)) :
                    <p className={'text-h5-dark-blue'}>Тренировки не назначены</p>
                }
            </div>
            <Button style={'black'} className={'ml-auto'} onClick={handleAddOnClick}>Добавить тренировку</Button>
        </>
    )
}