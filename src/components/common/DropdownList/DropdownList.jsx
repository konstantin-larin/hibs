import "./style.scss";
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import ShevronUp from "../../../assets/icons/ShevronUp.jsx";
import {v4 as uuidv4} from "uuid";

export default function DropdownList({
                                         items = [{value: 1, label: 'dkfe'}, {value: 2, label: 'dlwee'},],
                                         currentItem = items[0],
                                         onChoose = (val) => val,
                                         className}
)
{
    const [isOpened, setIsOpened] = useState(false);
    const list = useRef(null);
    const el = useRef(null);

    function handleTogglerOnClick() {
        setIsOpened(true);
    }

    useLayoutEffect(() => {
        if (isOpened && list) {
            list.current.addEventListener('transitionend', () => {
                list.current.classList.remove('dropdown__list_noscroll');
            }, {once: true})
        }
    }, [isOpened]);

    useEffect(() => {
        if (isOpened) {
            setTimeout(() => {
                document.addEventListener('click', () => {
                    setIsOpened(false);
                }, {once: true})
            }, 0)
        }
    }, [isOpened])

    return (
        <div className={'dropdown ' + className} ref={el}>
            <div className={'dropdown__trigger'} onClick={handleTogglerOnClick}>
                <div className={'dropdown__label'}>{currentItem.label}</div>
                <div className={'rotate-180 dropdown__trigger-btn'}>
                    <ShevronUp></ShevronUp>
                </div>
            </div>
            <div className={'dropdown__list dropdown__list_noscroll ' + (isOpened ? 'dropdown__list_opened' : '')}
                ref={list}>
                {items
                    .filter((item, i) => item.value !== currentItem.value)
                    .map((item, i) => (
                        <div key={uuidv4()} onClick={() => onChoose(item)}>{item.label}</div>
                    ))}
            </div>
        </div>
    )
}