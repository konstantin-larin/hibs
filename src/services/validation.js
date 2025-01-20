const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export class Validation {
    constructor({message = 'OK', error = false}={}) {
        this.message = message;
        this.error = error;
    }
}

function defaultValidate(value){
    if(value.trim().length === 0) return new Validation({error: true, message: "Пустое поле"});
    return false;
}

export const validateEmail = (email) => {
    const defaultValidation = defaultValidate(email);
    if(defaultValidation.error){
        return defaultValidation;
    }
    if (email.trim().length === 0 || !email.trim().match(mailFormat)) {
        return new Validation({error:true, message: "Неправильный формат email",});
    }
    return new Validation({error: false});
}

export const validatePassword = (password) => {
    const defaultValidation = defaultValidate(password);
    if(defaultValidation.error){
        return defaultValidation;
    }
    if(password.length < 5){
        return new Validation({error: true, message: "Пароль должен быть не менее 5 символов"});
    }
    return new Validation({error: false});
}
export const validateRepeatedPassword = (password, repeated) => {
    const defaultValidation = defaultValidate(repeated);
    if(defaultValidation.error){
        return defaultValidation;
    }
    if(password.length < 8){
        return new Validation({error: true, message: "Пароль должен быть не менее 8 символов"});
    }
    if(password !== repeated){
        return new Validation({error: true, message: "Пароли не совпадают"});
    }
    return new Validation({error: false});
}
export const validateCorrectPassword = (correct, password) => {
    const defaultValidation = defaultValidate(password);
    if(defaultValidation.error){
        return defaultValidation;
    }
    if(password !== correct){
        return new Validation({error: true, message: "Неверный пароль"});
    }
    return new Validation({error: false});
}

export const validateName = (name) => {
    const defaultValidation = defaultValidate(name);
    if(defaultValidation.error){
        return defaultValidation;
    }
    return new Validation({error: false});
}