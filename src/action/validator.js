let errors = {};

export function validate(order){
    validateTextWithoutNumeric(order.name, 'name');
    validateTextWithoutNumeric(order.surname, 'surname');
    validateEmail(order.email, 'email');
    validatePhone(order.phone, 'phone');
    validateText(order.orderText, 'orderText');
    validateSelect(order.orderType, 'orderType');
    validateSelect(order.vendor, 'vendor');
}

export function getErrors(){
    return errors;
}

export function deleteError(key){
    delete errors[key];
}

function validateText(text, key){
    if (!text){
        setError(key, 'Это значение не может быть пустым');
    }
}

function validateTextWithoutNumeric(text, key){
    if (!text){
        setError(key, 'Это значение не может быть пустым');
    } else {
        let re = /[0-9]/;
        if (re.test(text)){
            setError(key, 'Строка не должна содержать цифры');
        }
    }

}

function validateEmail(email, key){
    if (!email){
        setError(key, 'Это значение не может быть пустым');
    } else {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(email)){
            setError(key, 'Это не похоже на Email');
        }
    }
}

function validatePhone(phone, key){
    if (!phone){
        setError(key, 'Это значение не может быть пустым');
    } else {
        let re = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
        if (!re.test(phone)){
            setError(key, 'Это не похоже на номер телефона');
        }
    }
}

export function validateSelect(value, key){
    if (!value || value == "0"){
        setError(key, 'Выберите значение из списка');
    }
}

export function validatePassword(password, key, pass){
    if (!password || password == "0"){
        setError(key, 'Введите пароль');
    } else if(password != pass){
        setError(key, 'Неверный пароль');
    }
}

function setError(key, errorText){
    errors[key] = errorText;
}
