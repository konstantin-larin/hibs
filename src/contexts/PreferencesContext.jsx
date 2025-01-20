import {createContext, useContext, useEffect, useState, useRef} from "react";
import breakpoints from "@services/breakpoints.js";
import {disableBodyScroll, enableBodyScroll} from "body-scroll-lock";
import {useLocation} from "react-router-dom";

const PreferencesContext = createContext({});


export const PreferencesProvider = ({children}) => {
    const location = useLocation();
    useEffect(() => {
        const history = JSON.parse(sessionStorage.getItem('history'));
        const pathname = location.pathname;
        if (history.at(-1) === pathname){
            history.pop();
            sessionStorage.setItem('history', JSON.stringify([...history, pathname]));
        }
        if (pathname !== '/exercises/edit' ) {
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

    function useLastPath(){
        const history = JSON.parse(sessionStorage.getItem('history'));
        const pathName = location.pathname;
        const lastPath = useRef('/');


        if (history.length > 1) {
            const _lastPath = history.at(-1);
            if (!pathName.includes(_lastPath)) {
                lastPath.current = _lastPath;
            }
        }

        return lastPath.current;
    }

    return (
        <PreferencesContext.Provider
            value={{
                useLastPath,
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
