import "./style.scss";
import Layout from "@layout/Layout.jsx";
import ExercisesList from "../../widgets/ExercisesList/ExercisesList.jsx";
import {useUsersExercises} from "@contexts/UsersExercisesContext.jsx";

export default function MyExercisesPage() {
    const {exercises} = useUsersExercises();
    return (
        <Layout>
            <p className={'text-h5-dark-blue'}>
                Здесь отображаются занятия, которые вы можете найти на своем устройстве HIBS. Чтобы добавить новые занятия, перейдите во вкладку “Библиотека” и выберите подходящее. Чтобы удалить занятие из устройства,  нажмите кнопку “удалить с устройства”
            </p>


            <ExercisesList exercises={exercises}></ExercisesList>
        </Layout>
    )
}