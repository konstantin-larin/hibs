import {createContext, useContext, useState} from "react";

const PreferencesContext = createContext({});

export const PreferencesProvider = ({children}) => {
    const [exercisesIsOpened, setExercisesIsOpened] = useState(true);

    return (
        <PreferencesContext.Provider value={{exercisesIsOpened, setExercisesIsOpened}}>
            {children}
        </PreferencesContext.Provider>
    )
}

export const usePreferences = () => (useContext(PreferencesContext))
