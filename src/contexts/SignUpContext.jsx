import React, {createContext, useContext, useEffect, useRef, useState} from 'react';
import {sendCodeOnEmail} from "@services/auth.js";

const SignUpContext = createContext({});
export const useSignUp = () => useContext(SignUpContext);

const EMAIL_TIME = 60000;
export const SignUpProvider = ({children}) => {
    const [signUp, setSignUp] = useState(null);
    const [userData, setUserData] = useState(null);
    const [email, setEmail] = useState(null);
    const [emailIsVerified, setEmailIsVerified] = useState(false);
    const [emailCanBeReactivated, setEmailCanBeReactivated] = useState(false);
    const [reactivateEmailTime, setReactivateEmailTime] = useState(0);

    useEffect(() => {
        if (!emailCanBeReactivated && reactivateEmailTime > 0) {
            const timerId = setTimeout(() => {
                setReactivateEmailTime(reactivateEmailTime - 1000);
            }, 1000);
            return () => clearTimeout(timerId);
        }
        if (reactivateEmailTime === 0) {
            setEmailCanBeReactivated(true);
        }
    }, [reactivateEmailTime]);

    useEffect(() => {
        if (email) {
            setReactivateEmailTime(EMAIL_TIME);
            setEmailCanBeReactivated(false);
            // sendCodeOnEmail(email)
            //     .then(() => {
            //         setReactivateEmailTime(EMAIL_TIME);
            //         setEmailCanBeReactivated(false);
            //     })
            //     .catch(err => {
            //         console.log(err);
            //     })
            // ;
            //     отправить код
        } else {
            setEmailCanBeReactivated(false);
        }
    }, [email]);

    function verifyCode(code){
    }

    const activateEmail = async (_userData) => {
        if (userData) {
            if (_userData.email !== userData.email) {
                setEmail(_userData.email);
            }
        } else {
            setEmail(_userData.email);
        }
        setUserData(_userData);
        return Promise.resolve()
    }
    return (
        <SignUpContext.Provider value={{
            activateEmail,
            userData, setUserData, emailCanBeReactivated, setEmailCanBeReactivated,
            reactivateEmailTime
        }}>
            {children}
        </SignUpContext.Provider>
    );
};




