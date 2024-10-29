let displayValue = '0';
let firstOperand = null;
let secondOperand = null;
let currentOperator = null;
let shouldResetDisplay = false;

const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');

function updateDisplay() {
    display.value = displayValue;
}

function inputOperand(operand) {
    if (shouldResetDisplay) {
        displayValue = operand;
        shouldResetDisplay = false;
    } else {
        displayValue = displayValue === '0' ? operand : displayValue + operand;
    }
    updateDisplay();
}

function inputOperator(operator) {
    if (currentOperator && shouldResetDisplay) {
        currentOperator = operator;
        return;
    }
    if (firstOperand === null) {
        firstOperand = parseFloat(displayValue);
    } else if (currentOperator) {
        secondOperand = parseFloat(displayValue);
        firstOperand = performOperation(currentOperator, firstOperand, secondOperand);
    }
    currentOperator = operator;
    shouldResetDisplay = true;
    updateDisplay();
}

function performOperation(operator, a, b) {
    switch (operator) {
        case '+': return add(a, b);
        case '-': return subtract(a, b);
        case '*': return multiply(a, b);
        case '/': return divide(a, b);
        default: return b;
    }
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        alert("Cannot divide by zero");
        return a; // Return the first operand if division by zero is attempted
    }
    return a / b;
}

function inputEquals() {
    if (currentOperator && firstOperand !== null) {
        secondOperand = parseFloat(displayValue);
        displayValue = performOperation(currentOperator, firstOperand, secondOperand).toString();
        currentOperator = null;
        firstOperand = null;
        shouldResetDisplay = true;
    }
    updateDisplay();
}

function clearDisplay() {
    displayValue = '0';
    firstOperand = null;
    secondOperand = null;
    currentOperator = null;
    updateDisplay();
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.classList.contains('operand')) {
            inputOperand(button.innerText);
        } else if (button.classList.contains('operator')) {
            inputOperator(button.innerText);
        } else if (button.classList.contains('equals')) {
            inputEquals();
        } else if (button.classList.contains('clear')) {
            clearDisplay();
        }
    });
});

updateDisplay();
