import './styles/style.scss';
import {
  btnsArr,
  scren,
  numbersArr,
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
  };

  scren.innerText = 0;
}

function answerCalculateHandler () {
  const { firstOperand, secondOperand, operator } = state;
console.log(state);
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
      state.firstOperand = +firstOperand / +secondOperand;
      break;
    case 'x²':
      state.firstOperand = (+firstOperand) ** 2;
      break;
    case 'x³':
      state.firstOperand = (+firstOperand) ** 3;
      break;
    case '²√x':
      state.firstOperand = (+firstOperand) ** (1/2);
      break;
    case '³√x':
      state.firstOperand = (+firstOperand) ** (1/3);
      break;
  }
}

function makeBtnType (btnValue) {
  if ( btnValue === clearAllBtn ) { clearState() };
  if ( numbersArr.includes(btnValue) && !state.operator ) { onChangeState(btnValue, 'firstOperand') };
  if ( numbersArr.includes(btnValue) && state.operator) { onChangeState(btnValue, 'secondOperand') };
  if ( mainOperatorsArr.includes(btnValue) && state.secondOperand) {
    answerCalculateHandler();
    state.secondOperand = '';
    onChangeState(btnValue, 'operator');
  };
  if ( mainOperatorsArr.includes(btnValue)) { onChangeState(btnValue, 'operator'); };
  if ( btnValue === equal ) {
    answerCalculateHandler();
    state.operator = '';
    innerTextHandler('firstOperand');
  }
  if ( additionalOperatorsArr.includes(btnValue) ) {
    state.operator = btnValue;
    answerCalculateHandler();
    state.operator = '';
    innerTextHandler('firstOperand');
  }
}

function innerTextHandler ( place ) {
  scren.innerText = state[place];
}

function onChangeState ( value, changedPlace ) {
  if ( state[changedPlace].length >= state.screenLength ) return;

  state[changedPlace] += value;
  changedPlace === 'operator' && state.operator ? state.operator = value : null;
  innerTextHandler( changedPlace );
}
