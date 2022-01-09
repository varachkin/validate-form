const RED_BORDER = '1px solid red';
const GREEN_BORDER = '1px solid green';
const WITHOUT_OPACITY = '1';
const WITH_OPACITY = '0';
const RED_LABEL = '#a70000';
const BLACK_LABEL = 'black';
const NO_VALUE = 'No value';
const NAME_REGEXP = /^[a-z ,.'-]+$/i;
const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASS_REGEXP = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
let nameEl = document.getElementById('inputName');
let passwordEl = document.getElementById('inputPassword');
let emailEl = document.getElementById('inputEmail');
let viewEl = document.getElementById('view');
let submitEl = document.getElementById('submit');
let nameError = document.querySelector('.erName');
let passwordError = document.querySelector('.erPassword');
let emailError = document.querySelector('.erEmail');
let nameLabel = document.querySelector('.labelName');
let passLabel = document.querySelector('.labelPassword');
let emailLabel = document.querySelector('.labelEmail');


function showPassword(){
    if (passwordEl.type === 'password'){
        viewEl.innerText = 'visibility_off';
        passwordEl.type = 'text';
    }else{
        viewEl.innerText = 'visibility';
        passwordEl.type = 'password';
    }
}
function isValidForNull() {
    let missedFields = [];

    if (!nameEl.value){
        nameEl.style.outline = RED_BORDER;
        nameError.innerHTML = NO_VALUE;
        nameError.style.opacity = WITHOUT_OPACITY;
        missedFields.push('Name');
    }
    if (!passwordEl.value){
        passwordEl.style.outline = RED_BORDER;
        passwordError.innerHTML = NO_VALUE;
        passwordError.style.opacity = WITHOUT_OPACITY;
        missedFields.push('Password');
    }
    if (!emailEl.value){
        emailEl.style.outline = RED_BORDER;
        emailError.innerHTML = NO_VALUE;
        emailError.style.opacity = WITHOUT_OPACITY;
        missedFields.push('E-Mail');
    }

    if (missedFields.length > 0) {
        alert(`Missed fields: ${missedFields.join(', ')}`);
        return false;
    }

    return true;
}

function isValidForCorrect() {
    let incorrectFields = [];

    if (!NAME_REGEXP.test(nameEl.value)) {
        incorrectFields.push('Name');
    }

    if (!PASS_REGEXP.test(passwordEl.value)) {
        incorrectFields.push('Password');
    }

    if (!EMAIL_REGEXP.test(emailEl.value)) {
        incorrectFields.push('Email');
    }

    if (incorrectFields.length > 0) {
        alert(`Incorrect fields: ${incorrectFields.join(', ')}`);
        return false;
    }
    return true;
}

function isValidForCorrectName() {
    if (!NAME_REGEXP.test(nameEl.value)){
        nameError.innerHTML = 'incorrect value Name';
        nameEl.style.outline = RED_BORDER;
        nameError.style.opacity = WITHOUT_OPACITY;
        nameLabel.style.color = RED_LABEL;
    }else{
        nameEl.style.outline = GREEN_BORDER;
        nameError.style.opacity = WITH_OPACITY;
        nameLabel.style.color = BLACK_LABEL;
    }
}

function isValidForCorrectPas(){
    if (!PASS_REGEXP.test(passwordEl.value)){
        passwordError.innerHTML = 'incorrect value Password';
        passwordEl.style.outline = RED_BORDER;
        passwordError.style.opacity = WITHOUT_OPACITY;
        passLabel.style.color = RED_LABEL;
    }else{
        passwordEl.style.outline = GREEN_BORDER;
        passwordError.style.opacity = WITH_OPACITY;
        passLabel.style.color = BLACK_LABEL;
    }
}

function isValidForCorrectEmail() {
    if (!EMAIL_REGEXP.test(emailEl.value)){
        emailError.innerHTML = 'incorrect value E-mail';
        emailEl.style.outline = RED_BORDER;
        emailError.style.opacity = WITHOUT_OPACITY;
        emailLabel.style.color = RED_LABEL;
    }else{
        emailEl.style.outline = GREEN_BORDER;
        emailError.style.opacity = WITH_OPACITY;
        emailLabel.style.color = BLACK_LABEL;
    }
}

async function submitForm(element) {


    if (!isValidForNull() || !isValidForCorrect()) {
        element.preventDefault();
        return false;
    }

    // Logic for sending request
    const URL = '#';
    let data = {};
    data.name = nameEl.value;
    data.password = passwordEl.value;
    data.email = emailEl.value;
    console.log(data);

    await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    });

}

function opacityErrorName(){
    nameError.style.opacity = WITH_OPACITY;
}
function opacityErrorPas(){
    passwordError.style.opacity = WITH_OPACITY;
}
function opacityErrorEmail(){
    emailError.style.opacity = WITH_OPACITY;
}

viewEl.addEventListener('click', showPassword);
submitEl.addEventListener('click', submitForm);
nameEl.addEventListener('keyup' ,isValidForCorrectName);
passwordEl.addEventListener('keyup' ,isValidForCorrectPas);
emailEl.addEventListener('keyup' ,isValidForCorrectEmail);
nameEl.addEventListener('focus' ,opacityErrorName);
passwordEl.addEventListener('focus' ,opacityErrorPas);
emailEl.addEventListener('focus' ,opacityErrorEmail);