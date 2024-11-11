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
        if (pathname !== 'exercises/exercise'){
            sessionStorage.setItem('history', JSON.stringify([...history, pathname]));
        }
    }, [location])


    const [isMobile, setIsMobile] = useState(window.innerWidth <= breakpoints.mdBreakpoint);
    const [sidebarIsClosed, setSidebarIsClosed] = useState(true);

    function windowOnResize(){
        setIsMobile(window.innerWidth <= breakpoints.mdBreakpoint);
    }
    useEffect(() => {
        window.addEventListener('resize', windowOnResize);
        return () => {
            window.removeEventListener('resize', windowOnResize);
        }
    }, []);

    useEffect(() => {
        if(!isMobile){
            setSidebarIsClosed(true);
        }
    }, [isMobile]);

    useEffect(() => {
        if(sidebarIsClosed){
            enableBodyScroll(document.body);
        } else {
            disableBodyScroll(document.body);
        }
    }, [sidebarIsClosed]);


    const [exercisesIsOpened, setExercisesIsOpened] = useState(true);

    return (
        <PreferencesContext.Provider value={{exercisesIsOpened, setExercisesIsOpened, isMobile, setSidebarIsClosed, sidebarIsClosed}}>
            {children}
        </PreferencesContext.Provider>
    )
}

export const usePreferences = () => (useContext(PreferencesContext))
