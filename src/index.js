import './styles/style.scss';
import {
  btnsArr,
  scren,
  numbersAndSimpleOperatorsArr,
  mainOperatorsArr,
  additionalOperatorsArr,
  clearAllBtn,
  equal,
} from './shared/variables';

let state = {
  firstOperand: '',
  secondOperand: '',
  operator: '',
  screenLength: 25,
  roundingValue: 4,
}

scren.innerText = 0;

function eventHandler() {
  btnsArr.forEach( item => {
    const btn = item;

    btn.onclick = event => {
      makeBtnType(event.target.innerText);
    };
  });
}

eventHandler();

function clearState () {
  state = {
    firstOperand: '',
    secondOperand: '',
    operator: '',
    screenLength: 25,
    roundingValue: 4,
  };

  scren.innerText = 0;
}

function makeBtnType ( btnValue ) {
  if ( btnValue === clearAllBtn ) { clearState() };
  if ( numbersAndSimpleOperatorsArr.includes( btnValue ) && !state.operator ) { onChangeState( btnValue, 'firstOperand' ) };
  if ( numbersAndSimpleOperatorsArr.includes( btnValue ) && state.operator ) { onChangeState( btnValue, 'secondOperand' ) };
  if ( mainOperatorsArr.includes( btnValue ) && state.secondOperand) {
    answerCalculateHandler();
    state.secondOperand = '';
    onChangeState( btnValue, 'operator' );
  };
  if ( mainOperatorsArr.includes( btnValue )) { onChangeState ( btnValue, 'operator' ) };
  if ( btnValue === equal ) {
    answerCalculateHandler();
    state.operator = '';
    innerTextHandler('firstOperand');
  };
  if ( additionalOperatorsArr.includes( btnValue )) {
    state.operator = btnValue;
    answerCalculateHandler();
    state.operator = '';
    innerTextHandler('firstOperand');
  };
}

function onChangeState ( value, changedPlace ) {
  const stringValue = String(value);

  if ( state[ changedPlace ].length >= state.screenLength ) return;
  if ( value === '.' && state[ changedPlace ].includes('.') ) return;

  if ( value === '+/-' ) {
    state[ changedPlace ] = String( 0 - state[ changedPlace ] );
  } else if ( value === '%' ) {
    state[ changedPlace ] = String( state[ changedPlace ] / 100 );
  } else {
    state[ changedPlace ] === '0' && value !== '.'
      ? state[ changedPlace ] = stringValue
      : state[ changedPlace ] += stringValue;
  }

  changedPlace === 'operator' && state.operator ? state.operator = stringValue : null;
  innerTextHandler( changedPlace );
}

function innerTextHandler ( place ) {
  scren.innerText = state[ place ];
}

function answerCalculateHandler () {
  const { firstOperand, secondOperand, operator } = state;

  switch ( operator ) {
    case '+':
      state.firstOperand = +firstOperand + +secondOperand;
      break;
    case '-':
      state.firstOperand = +firstOperand - +secondOperand;
      break;
    case '×':
      state.firstOperand = +firstOperand * +secondOperand;
      break;
    case '÷':
      if (secondOperand === '0') { createErrorNotificationHandler('ERROR: You can`t divide by zero') };

      secondOperand !== '0'
        ? state.firstOperand = +firstOperand / +secondOperand
        : state.firstOperand = '';
      break;
    case 'xᵞ':
      state.firstOperand = ( +firstOperand ) ** ( +secondOperand );
      break;
    case 'ᵞ√x':
      state.firstOperand = ( +firstOperand ) ** ( 1 / +secondOperand );
      break;
    case 'x²':
      state.firstOperand = ( +firstOperand ) ** 2;
      break;
    case 'x³':
      state.firstOperand = ( +firstOperand ) ** 3;
      break;
    case '²√x':
      state.firstOperand = ( +firstOperand ) ** (1/2);
      break;
    case '³√x':
      state.firstOperand = ( +firstOperand ) ** (1/3);
      break;
    case '10ᵡ':
      state.firstOperand =  10 ** ( +firstOperand );
      break;
    case '1/x':
      state.firstOperand =  1 / ( +firstOperand );
      break;
    case 'x!':
      state.firstOperand =  factorial( +firstOperand );
      break;
  }

  if ( String( state.firstOperand ).includes('.')) {
    state.firstOperand = ( +state.firstOperand ).toFixed(state.roundingValue);
  }
}

function factorial( num ) {
  if ( num <= 1 ) {
    return num;
  }

  return num * factorial( num - 1 );
}

function createErrorNotificationHandler (errorMessage) {
  const wrapper = document.querySelector('.wrapper');
  const errorNotification = document.createElement('div');

  errorNotification.className ='error_notification';
  errorNotification.innerText = errorMessage;
  wrapper.append(errorNotification);

  const timeout = setTimeout(() => {
    errorNotification.className ='error_notification hide';
    clearTimeout(timeout);
  }, 5000)
}
