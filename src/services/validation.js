const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export class Validation {
    constructor({message = 'OK', error = false}={}) {
        this.message = message;
        this.error = error;
    }
}

export const validateEmail = (email) => {
    if (email.trim().length === 0 || !email.trim().match(mailFormat)) {
        return new Validation({error:true, message: "Неправильный формат email",});
    }
    return new Validation({error: false});
}

export const validatePassword = (password) => {
    if(password.length < 8){
        return new Validation({error: true, message: "Пароль должен быть не менее 8 символов"});
    } else return new Validation({error: false});
}