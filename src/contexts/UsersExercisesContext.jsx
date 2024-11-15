// взаимодействует с БД. Хранит все занятия пользователя
// при взаимодействии с приложением эти занятия постоянно меняются, поэтому контекст необходим
import {createContext, useContext, useEffect, useState} from "react";
import {Exercise, Pause, Train} from "@services/exercises.js";
import {useLocation} from "react-router-dom";

// ДВЕ КНОПКИ - ДОБАВИТЬ ПАУЗУ И ДОБАВИТЬ ТРЕНИРОВКУ
const UsersExercisesContext = createContext({});

// так как это взаимодействие с бд нужны функции как add, delete, edit, чтобы не было ошибок с бд, чтобы
// контекст понимал какой запрос отправлять в бд
export const UsersExercisesProvider = ({children}) => {

    const [exercises, setExercises] = useState([
        new Exercise({
            id: "2024-11-15T11:35:24.699Z",
            name: "1",
            shortName: "1",
            description: "",
            parts: [
                new Train({
                    "_id": 1731670526210,
                    "hitsRange": 100,
                    "trainType": "Базовая",
                    "hand": "Правая",
                    "target": "L1",
                    "ringBefore": 30,
                    "ringAfter": 20,
                    "swing": 16,
                    "speed": 0.6,
                    "delay": 1.5
                }),
                new Train({
                    "_id": 1731670526715,
                    "hitsRange": 200,
                    "trainType": "Базовая",
                    "hand": "Правая",
                    "target": "L1",
                    "ringBefore": 30,
                    "ringAfter": 20,
                    "swing": 16,
                    "speed": 0.6,
                    "delay": 1.5
                }),
                new Train({
                    "_id": 1731670533442,
                    "hitsRange": 300,
                    "trainType": "Базовая",
                    "hand": "Правая",
                    "target": "L1",
                    "ringBefore": 30,
                    "ringAfter": 20,
                    "swing": 16,
                    "speed": 0.6,
                    "delay": 1.5
                }),
                new Train({
                    "_id": 1731670534136,
                    "hitsRange": 400,
                    "trainType": "Базовая",
                    "hand": "Правая",
                    "target": "L1",
                    "ringBefore": 30,
                    "ringAfter": 20,
                    "swing": 16,
                    "speed": 0.6,
                    "delay": 1.5
                }),
                new Train({
                    "_id": 1731670535321,
                    "hitsRange": 500,
                    "trainType": "Базовая",
                    "hand": "Правая",
                    "target": "L1",
                    "ringBefore": 30,
                    "ringAfter": 20,
                    "swing": 16,
                    "speed": 0.6,
                    "delay": 1.5
                }),
                new Train({
                    "_id": 1731670540102,
                    "hitsRange": 600,
                    "trainType": "Базовая",
                    "hand": "Правая",
                    "target": "L1",
                    "ringBefore": 30,
                    "ringAfter": 20,
                    "swing": 16,
                    "speed": 0.6,
                    "delay": 1.5
                }),
                new Train({
                    "_id": 1731670541202,
                    "hitsRange": 700,
                    "trainType": "Базовая",
                    "hand": "Правая",
                    "target": "L1",
                    "ringBefore": 30,
                    "ringAfter": 20,
                    "swing": 16,
                    "speed": 0.6,
                    "delay": 1.5
                }),
                new Train({
                    "_id": 1731670541851,
                    "hitsRange": 800,
                    "trainType": "Базовая",
                    "hand": "Правая",
                    "target": "L1",
                    "ringBefore": 30,
                    "ringAfter": 20,
                    "swing": 16,
                    "speed": 0.6,
                    "delay": 1.5
                }),
                new Train({
                    "_id": 1731670542497,
                    "hitsRange": 900,
                    "trainType": "Базовая",
                    "hand": "Правая",
                    "target": "L1",
                    "ringBefore": 30,
                    "ringAfter": 20,
                    "swing": 16,
                    "speed": 0.6,
                    "delay": 1.5
                })
            ]
        }),
        new Exercise({
            "id": 1731671414913,
            "name": "2",
            "shortName": "2",
            "description": "2",
            "parts": [
                new Train({
                    "_id": 1731671687745,
                    "hitsRange": 22,
                    "trainType": "Силовая",
                    "hand": "Правая",
                    "target": "L1",
                    "ringBefore": 30,
                    "ringAfter": 20,
                    "swing": 16,
                    "speed": 1,
                    "delay": 1.5
                }),
                new Pause(
                    {
                        "_id": 1731671639273,
                        "pause": "Пауза",
                        "pauseTime": 100
                    }
                ),
                new Train(
                    {
                        "_id": 1731671645073,
                        "hitsRange": 100,
                        "trainType": "Базовая",
                        "hand": "Правая",
                        "target": "L1",
                        "ringBefore": 30,
                        "ringAfter": 20,
                        "swing": 16,
                        "speed": 0.4644444444,
                        "delay": 1.5324567555442337
                    }
                )
            ]
        }),

    ]); // массив экземпляров Exercises (в будущем поступает из бд)
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
