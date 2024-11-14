// взаимодействует с БД. Хранит все занятия пользователя
// при взаимодействии с приложением эти занятия постоянно меняются, поэтому контекст необходим
import {createContext, useContext, useEffect, useState} from "react";
import {Exercise} from "@services/exercises.js";
import {useLocation} from "react-router-dom";

// ДВЕ КНОПКИ - ДОБАВИТЬ ПАУЗУ И ДОБАВИТЬ ТРЕНИРОВКУ
const UsersExercisesContext = createContext({});

// так как это взаимодействие с бд нужны функции как add, delete, edit, чтобы не было ошибок с бд, чтобы
// контекст понимал какой запрос отправлять в бд
export const UsersExercisesProvider = ({children}) => {

    const [exercises, setExercises] = useState([]); // массив экземпляров Exercises (в будущем поступает из бд)
    const [currentExercise, _setCurrentExercise] = useState(null); //занятие, которое щас добавляется или редактируется. Это нужно для страницы EditExercisePage

    // async function addExercise(exercise) { //делает кнопка сохранить на странице "Добавить занятие"
    //
    //     // пока promise pending страница должна заблокаться чтобы не было лишних вызовов
    //     // на разрешении промиса алертим че то, ну и можно выйти со страницы на предыдущую
    //     if (!(exercise instanceof Exercise)) return new Promise.resolve(null);
    //     //     делаем запрос, обрабатываем там все как надо
    //     setExercises([...exercises, exercise]);
    //
    //     return Promise.resolve(true);
    // }
    //
    // // на странице изменения занятия уже обновленная версия exercises, нам остается только заменить это в старой
    // // то есть обновить массив и отправить запрос
    // // механика с обработкой промиса такая же как и в addExercise
    // async function editExercises(editedExercise){
    //     if (!(editedExercise instanceof Exercise)) return new Promise.resolve(null);
    // //     put-запрос
    //     exercises.find(exercise => exercise.id === editedExercise.id);
    //
    // }

    console.log(exercises);
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
    function setCurrentExercise(exercise){
        if (!(exercise instanceof Exercise)){
            _setCurrentExercise(null);
        } else _setCurrentExercise(exercise);
    }

    return (
        <UsersExercisesContext.Provider value={{exercises , sendExercise, currentExercise, setCurrentExercise}}>
            {children}
        </UsersExercisesContext.Provider>
    )
}

export const useUsersExercises = () => (useContext(UsersExercisesContext));
