const calculator = document.querySelector('.calculator');
const keys       = document.querySelector('.calculator_keys');
const display    = document.querySelector('#display');
const cdisplay   = document.querySelector('#cdisplay');


keys.addEventListener('click', ev => {

    if(ev.target.matches('button')) {

        const key             = ev.target;
        const action          = key.dataset.action;
        const displayedNum    = display.textContent;
        const keyContent      = key.textContent;
        const previousKeyType = calculator.dataset.previousKeyType;

        numberKey(action, displayedNum, previousKeyType, keyContent);

        actionOperator(action, key, displayedNum);

        decimalKey(action, displayedNum);

        clearDisplay(action);

        calculateNumbers(action, displayedNum);

        Array.from(key.parentNode.children)
        .forEach(k => k.classList.remove('is-depressed'));
    }
});

const calculateNumbers = (action, displayedNum) => {

    if(action == 'calculate') {
        const firstValue  = calculator.dataset.firstValue;
        const operator    = calculator.dataset.operator;
        const secondValue = calculator.dataset.secondvalue;

        calculate(firstValue, operator, secondValue);
    }
};

const calculate = (firstValue, operator, secondValue) => {
    
    let result        = '';
    let operatorSym   = '';
    let firstFloat    = parseFloat(firstValue);
    let secondFloat   = parseFloat(secondValue);
    let secondNum     = parseFloat(secondValue.split(' ').pop());

    if (operator === 'add') {
        operatorSym = '+';
        result      = firstFloat + secondFloat;
    } else if (operator === 'minus') {
        operatorSym = '-';
        result      = firstFloat - secondFloat;
    } else if (operator === 'multiply') {
        operatorSym = '*';
        result      = firstFloat * secondFloat;
    } else if (operator === 'divide') {
        operatorSym = '/';
        result      = firstFloat / secondFloat;
    } else if (operator === 'percent') {
        operatorSym = '%';
        result      = firstFloat % secondFloat;
    } else if (operator === 'negate') {
        operatorSym = '-';
        firstFloat  = '';
        result      = - secondFloat;
    }

    display.textContent = firstFloat + " " + operatorSym + " " + secondFloat;
    cdisplay.textContent = result.toFixed(2);
}

const clearDisplay = (action) => {
    if(action == 'clear') {
        display.textContent                = 0;
        cdisplay.textContent               = 0;
        calculator.dataset.previousKeyType = 'clear';
        calculator.dataset.firstValue      = '';
        calculator.dataset.operator        = '';
        calculator.dataset.secondvalue     = '';
    }
};

const decimalKey = (action, displayedNum) => {

    if(action == 'decimal') {
        if(displayedNum.includes(".")) {
            return;
        } else {
            display.textContent = displayedNum + '.';
        }
    }
};

const numberKey = (action, displayedNum, previousKeyType, keyContent) => {

    if(!action) {
        if(displayedNum === '0') {
            display.textContent = keyContent;
        } else {
            display.textContent = displayedNum + keyContent;
        }
        let displayText = display.textContent
        calculator.dataset.secondvalue = displayText.split(/\D/).pop();
    }
};

const actionOperator = (action, key, displayedNum) => {

    if(
        action === 'add' ||
        action === 'minus' ||
        action === 'multiply' ||
        action === 'divide' ||
        action === 'percent' ||
        action === 'negate' 
    ) {
        key.classList.add('is-depressed');
        calculator.dataset.firstValue      = displayedNum;
        calculator.dataset.previousKeyType = 'operator';
        calculator.dataset.operator        = action;
        display.textContent = displayedNum + key.textContent;
    }
};
