//Card Name
let nameCard = document.querySelector('.card__data-name');
let nameInput = document.getElementById('cardholder');
let nameErrorDiv = document.querySelector('.form__cardholder--error')

//Card Number
let numberCard = document.querySelector('.card__numbers');
let numberInput = document.getElementById('cardnumber');
let numberErrordiv = document.querySelector('.form__cardnumber--error');

//Month number
let monthCard = document.querySelector('.cards__data-month');
let monthInput = document.getElementById('cardMonth');
let monthErrorDiv = document.querySelector('.form__input-mm--error');

//Year number
let yearCard = document.querySelector('.cards__data-year');
let yearInput = document.getElementById('cardYear');
let yearErrorDiv = document.querySelector('.form__input-yy--error');

//CVC number
let cvcCard = document.querySelector('.card__back-cvc');
let cvcInput = document.getElementById('cardCvc');
let cvcErrorDiv = document.querySelector('.form__input-cvc--error');

//Section thanks
let formSection = document.querySelector('.form');
let thankSection = document.querySelector('.thanks-section')

//Add the name in the card
nameInput.addEventListener('input', ()=>{
    if(nameInput.value === ''){
        nameCard.innerText = 'Jane Appleseed';
    } else {
        nameCard.innerText = nameInput.value;
    }
});

//Add the number in the card
numberInput.addEventListener('input', event =>{
    let inputValue = event.target.value;

    numberCard.innerText = numberInput.value;

    let regExp = /[A-z]/g;
    if(regExp.test(numberInput.value)){
        showError(numberInput, numberErrordiv, 'Wrong format, numbers only', true);
    } else {
        numberInput.value = inputValue.replace(/\s/g, '').replace(/([0-9]{4})/g, '$1 ').trim();
        showError(numberInput, numberErrordiv, '', false);
    }

    if(numberInput.value == ''){
        numberCard.innerText = '0000 0000 0000 0000';
    }
});

//Add the month in the card
monthInput.addEventListener('input', ()=>{
    monthCard.innerText = monthInput.value;
    validateLetters(monthInput, monthErrorDiv, '', true);

    if(monthInput.value == ''){
        monthCard.innerText = '00';
    }
});

//Add the year in the card
yearInput.addEventListener('input', ()=>{
    yearCard.innerText = yearInput.value;
    validateLetters(yearInput, yearErrorDiv, '', true);

    if(yearInput.value == ''){
        yearCard.innerText = '00';
    }
});

//Add the cvc in the card
cvcInput.addEventListener('input', ()=>{
    cvcCard.innerText = cvcInput.value;
    validateLetters(cvcInput, cvcErrorDiv, '', true);

    if(cvcInput.value == ''){
        cvcCard.innerText = '000';
    }
});

//Boton confirm
let confirmBtn = document.querySelector('.form__submit');

let nameValidation = false;
let numberValidation = false;
let monthValidation = false;
let yearValidation = false;
let cvcValidation = false;

confirmBtn.addEventListener('click', event=>{
    event.preventDefault();

    //validate name
    if(verifyIsFilled(nameInput, nameErrorDiv)){
        nameValidation = true;
    } else {
        nameValidation = false;
    }

    //Validate number
    if(verifyIsFilled(numberInput, numberErrordiv)){
        if(numberInput.value.length == 19){
            showError(numberInput, numberErrordiv, '', false);
            numberValidation = true;
        } else{
            showError(numberInput, numberErrordiv, 'Wrong number', true);
            numberValidation = false;
        }
    };

    //validate month 
    if(verifyIsFilled(monthInput, monthErrorDiv)){
        if(parseInt(monthInput.value) > 0 && parseInt(monthInput.value) <= 12){
            showError(monthInput, monthErrorDiv, '', false);
            monthValidation = true;
        } else {
            showError(monthInput, monthErrorDiv, 'Wrong Month', true);
            monthValidation = false;
        }
    };

    //Validate year
    if(verifyIsFilled(yearInput, yearErrorDiv)){
        if(parseInt(yearInput.value) > 22 && parseInt(yearInput.value) <= 27){
            showError(yearInput, yearErrorDiv, '', false);
            yearValidation = true;
        } else {
            showError(yearInput, yearErrorDiv, 'Wrong Year', true);
            yearValidation = false;
        }
    }

    //validate cvc
    if(verifyIsFilled(cvcInput, cvcErrorDiv)){
        if(cvcInput.value.length === 3){
            showError(cvcInput, cvcErrorDiv, '', false);
            cvcValidation = true;
        } else {
            showError(cvcInput, cvcErrorDiv, 'Wrong CVC', true);
            cvcValidation = false;
        }
    }

    if(nameValidation == true && numberValidation == true && monthValidation == true && yearValidation == true && cvcValidation== true){
        formSection.style.display = 'none';
        thankSection.style.display = 'block';
    }
});

//Functions 
function showError(divInput, divError, msgError, show = true){
    if(show){
        divError.innerText = msgError;
        divInput.style.borderColor = 'hsl(0, 100%, 66%)';
    } else {
        divError.innerText = msgError;
        divInput.style.borderColor = 'hsl(270, 3%, 87%)';
    }
}

function verifyIsFilled(divInput, divError){
    if(divInput.value.length > 0){
        showError(divInput, divError, "", false);
        return true;
    } else {
        showError(divInput, divError, "Can't be blank", true);
        return false;
    }
};

function validateLetters(input, divError){
    let regExp = /[A-z]/g;
    if(regExp.test(input.value)){
        showError(input, divError, 'Wrong format, numbers only', true);
    } else{
        showError(input, divError, '', false);
    }
}