import {createContext, useContext, useEffect, useState} from "react";
import breakpoints from "@services/breakpoints.js";
import {disableBodyScroll, enableBodyScroll} from "body-scroll-lock";
import {useLocation} from "react-router-dom";

const PreferencesContext = createContext({});


export const PreferencesProvider = ({children}) => {
    const location = useLocation();
    useEffect(() => {
        const history = JSON.parse(sessionStorage.getItem('history'));
        const pathname = location.pathname;
        if (history.at(-1) !== pathname) {
            sessionStorage.setItem('history', JSON.stringify([...history, pathname]));
        }
    }, [location])

    const [modalOpened, setModalOpened] = useState(false);
    const [ModalInner, setModalInner] = useState(<>Привет</>);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= breakpoints.mdBreakpoint);
    const [sidebarIsClosed, setSidebarIsClosed] = useState(true);

    function windowOnResize() {
        setIsMobile(window.innerWidth <= breakpoints.mdBreakpoint);
    }

    useEffect(() => {
        if(!modalOpened){
            setModalInner(<></>);
        }
        if (sidebarIsClosed && !modalOpened) {
            enableBodyScroll(document.body);
        } else {
            disableBodyScroll(document.body);
        }
    }, [sidebarIsClosed, modalOpened]);

    useEffect(() => {
        window.addEventListener('resize', windowOnResize);
        return () => {
            window.removeEventListener('resize', windowOnResize);
        }
    }, []);

    useEffect(() => {
        if (!isMobile) {
            setSidebarIsClosed(true);
        }
    }, [isMobile]);




    const [exercisesIsOpened, setExercisesIsOpened] = useState(true);

    return (
        <PreferencesContext.Provider
            value={{
                exercisesIsOpened,
                setExercisesIsOpened,
                isMobile,
                setSidebarIsClosed,
                sidebarIsClosed,
                modalOpened,
                setModalOpened,
                ModalInner,
                setModalInner,
            }}>
            {children}
        </PreferencesContext.Provider>
    )
}

export const usePreferences = () => (useContext(PreferencesContext))
