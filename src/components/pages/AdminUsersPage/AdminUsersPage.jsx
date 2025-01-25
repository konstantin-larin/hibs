import "./style.scss";
import Layout from "@layout/Layout.jsx";
import {getUsers} from "@services/api.js";
import {useEffect, useRef, useState} from "react";
import AdminUsersTable from "@pages/AdminUsersPage/AdminUsersTable.jsx";
import PlusIcon from "@icons/PlusIcon.jsx";
import RefreshIcon from "@icons/RefreshIcon.jsx";
import UserForm from "@widgets/UserForm/UserForm.jsx";
import {usePreferences} from "@contexts/PreferencesContext.jsx";

export default function AdminUsersPage() {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const {setModalInner, setModalOpened, modalOpened} = usePreferences();
    const [users, setUsers] = useState([]);
    function submitUser(user){
        const userIndex = users.findIndex(us => us.id.id === user.id.id)
        if(userIndex > -1){
            users[userIndex] = user;
            setUsers([...users]);
        } else{
            setUsers([...users, user]);
        }
        setModalOpened(false);
    }
    function openUserForm(){
        if(currentUser){
            setModalOpened(true);
            setModalInner(<UserForm submitUser={submitUser} user={currentUser}></UserForm>);
        }
    }
    useEffect(openUserForm, [currentUser]);
    useEffect(() => {
        if(!modalOpened){
            setCurrentUser(null);
        }
    }, [modalOpened])

    useEffect(() => {
        if(isLoading){
            getUsers()
                .then(_users => {
                    setIsLoading(false);
                    setUsers(_users.data);
                })
                .catch(err => console.log(err));
        }
    }, [isLoading]);

    function refresh(){
        setIsLoading(true);
    }
    function add(){
        setCurrentUser({email: '', firstName: '', lastName: ''})
    }
    return (
        <Layout>
            <div className={'panel'}>
                <button className={'panel-btn'} onClick={refresh}>
                    <RefreshIcon></RefreshIcon>
                </button>
                <button className={'panel-btn'} onClick={add}>
                    <PlusIcon></PlusIcon>
                </button>
            </div>
            <AdminUsersTable users={users} isLoading={isLoading} setCurrentUser={setCurrentUser}/>
        </Layout>
    )
}