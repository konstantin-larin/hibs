// взаимодействует с БД. Хранит все занятия пользователя
// при взаимодействии с приложением эти занятия постоянно меняются, поэтому контекст необходим
import {createContext, useContext, useEffect, useState} from "react";
import {Exercise} from "@services/exercises.js";

// ДВЕ КНОПКИ - ДОБАВИТЬ ПАУЗУ И ДОБАВИТЬ ТРЕНИРОВКУ
const UsersExercisesContext = createContext({});

// так как это взаимодействие с бд нужны функции как add, delete, edit, чтобы не было ошибок с бд, чтобы
// контекст понимал какой запрос отправлять в бд
export const UsersExercisesProvider = ({children}) => {

    const [exercises, setExercises] = useState([]); // массив экземпляров Exercises (в будущем поступает из бд)
    const [editedExercise, _setEditedExercise] = useState(null); //занятие, которое щас добавляется или редактируется. Это нужно для страницы EditExercisePage
    const [viewedExercise, _setViewedExercise] = useState(null); //занятие, которое щас просматривается

    function sendExercise(exercise){
    //     функция обработчик, которая определяет что сделать - добавить новое занятие или изменить старое
    //     считаю это можно обобщить, так как для интерфейса в принципе все равно - верстка одна и та же
    //     значит компонент один и тот же
    //     по факту вся разница в запросе
    //     поэтому делится все тут
        if (!(exercise instanceof Exercise)){
            throw new Error("это не занятие");
            // return new Promise.resolve(null);
        }
        const existedExercise = exercises.find(_exercise => _exercise.id === exercise.id);
        if(existedExercise){ //делаем put
            console.log("меняем");
            setExercises([...exercises]);
        } else { //делаем post
            console.log("добавляем");
            setExercises([...exercises, exercise]);
        }
        return Promise.resolve(true);
    }
    function setEditedExercise(exercise){
        if (!(exercise instanceof Exercise)){
            _setEditedExercise(null);
        } else _setEditedExercise(exercise);
    }

    function setViewedExercise(exercise){
        if (!(exercise instanceof Exercise)){
            _setViewedExercise(null);
        } else _setViewedExercise(exercise);
    }

    return (
        <UsersExercisesContext.Provider value={{exercises , sendExercise, editedExercise, setEditedExercise, viewedExercise, setViewedExercise}}>
            {children}
        </UsersExercisesContext.Provider>
    )
}

export const useUsersExercises = () => (useContext(UsersExercisesContext));
