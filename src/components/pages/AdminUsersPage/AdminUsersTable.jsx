import "./style.scss";
import {v4 as uuidv4} from 'uuid';
import Spinner from "@common/Spinner/Spinner.jsx";
import {getUser, sendActivationMail} from "@services/api.js";
import TrashIcon from "@icons/TrashIcon.jsx";
import EditIcon from "@icons/EditIcon.jsx";
import UserForm from "@widgets/UserForm/UserForm.jsx";
import MailIcon from "@icons/MailIcon.jsx";

export default function AdminUsersTable({users, isLoading, setCurrentUser, deleteUser}) {

    if (isLoading) {
        return <Spinner></Spinner>
    }
    if (users.length === 0) {
        return <div>Пользователей нет</div>;
    }

    // function handleOnClick(user){
    //     getUser(user.id.id)
    //         .then(user => {
    //             console.log(user);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    //     // setModalOpened(true);
    // }
    return (
        <table className={'table'}>
            <thead>
            <tr>
                {/*<th>Created Time</th>*/}
                <th>Authority</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone</th>
                <th>Email</th>

            </tr>
            </thead>
            <tbody>
            {
                users.map((user, index) => (
                    <tr key={uuidv4()}>
                        {/*<td>{user.createdTime}</td>*/}
                        <td>{user.authority}</td>
                        <td>{user.firstName || 'Нет'}</td>
                        <td>{user.lastName || 'Нет'}</td>
                        <td>{user.phone || 'Нет'}</td>
                        <td>{user.email}</td>
                        <td>
                            <button onClick={() => {
                                sendActivationMail(user.email)
                                    .then(res => {
                                        console.log("ok");
                                    })
                                    .catch(err => {
                                        console.log(err);
                                    })
                            }}>
                                <MailIcon></MailIcon>
                            </button>
                        </td>
                        <td>
                            <button onClick={() => {
                                setCurrentUser(user)
                            }}>
                                <EditIcon></EditIcon>
                            </button>
                        </td>
                        <td>
                            <button onClick={() => {
                                deleteUser(user)
                            }}>
                                <TrashIcon></TrashIcon>
                            </button>
                        </td>
                    </tr>
                ))
            }
            </tbody>
        </table>
    )
}