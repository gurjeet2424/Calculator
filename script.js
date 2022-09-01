const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

function sendNumberValue(number){
    if(awaitingNextValue){
        calculatorDisplay.textContent = number;
        awaitingNextValue = false;
    }
    else{
        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue == 0 ? number : displayValue + number;
    }
}

function addDecimal(){
    if(awaitingNextValue){
        return;
    }
    if(!calculatorDisplay.textContent.includes('.')){
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}

const calculate = {
    "/" : (firstNumber, secondNumber) => firstNumber/secondNumber,

    "*" : (firstNumber, secondNumber) => firstNumber*secondNumber,

    "+" : (firstNumber, secondNumber) => firstNumber+secondNumber,

    "-" : (firstNumber, secondNumber) => firstNumber-secondNumber,

    "=" : (firstNumber, secondNumber) => secondNumber,
};

function useOperator(operator){
    const currentValue = Number(calculatorDisplay.textContent);
    if(operatorValue && awaitingNextValue){
        operatorValue = operator;
        return;
    }
    if(!firstValue){
        firstValue = currentValue;
    }
    else{
        console.log(firstValue, operatorValue, currentValue);
        const calculation = calculate[operatorValue](firstValue, currentValue);
        console.log(calculation);
        calculatorDisplay.textContent = calculation;
        firstValue = calculation;
    }
    awaitingNextValue = true;
    operatorValue = operator;
}

inputBtns.forEach((input) => {
    if(input.classList.length === 0){
        input.addEventListener('click', () => sendNumberValue(input.value));
    }
    else if(input.classList.contains('operator')){
        input.addEventListener('click', () => useOperator(input.value));
    }
    else if(input.classList.contains('decimal')){
        input.addEventListener('click',() => addDecimal());
    }
});

function resetAll(){
    firstValue = 0;
    operatorValue = '';
    awaitingNextValue = false;
    calculatorDisplay.textContent = '0';
}

clearBtn.addEventListener('click', resetAll);