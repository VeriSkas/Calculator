import {
  changeSignOnMinusOrPlus,
  cube,
  cubeRootOfX,
  divide,
  factorial,
  minus,
  multiple,
  plus,
  procent,
  rootOfX,
  square,
  tenInX,
  xInY,
  yRootOfX,
} from '../../shared/formulas/auxiliaryFormulas';
import { ERROR_MESSAGES } from '../../shared/errorMessages';
import { INFO_MESSAGES } from '../../shared/infoMessages';
import {
  btnsContainer,
  btnsValue,
  mainOperatorsArr,
  memory,
  memoryBtnsArr,
  numbersAndSimpleOperatorsArr,
  operatorsWithoutSecondOperand,
  scren,
  stateKeys,
} from '../../shared/variables';
import { createErrorNotificationHandler } from '../errorNotification';

export const calculatorHandler = () => {
  let state = {
    firstOperand: '',
    secondOperand: '',
    operator: '',
    memory: '',
    memoryTurnOn: false,
    screenLength: 14,
    roundingValue: 10,
  };

  btnsContainer.onclick = (event) => {
    makeBtnFunction(event.target.innerText);
  };

  function makeBtnFunction(btnValue) {
    switch (btnValue) {
      case btnsValue.clearAllBtn:
        clearState();
        break;
      case btnsValue.mcBtn:
        clearMemory();
        break;
      case btnsValue.msBtn:
        onChangeState(btnValue, stateKeys.memoryTurnOn);
        break;
      case btnsValue.equal:
        answerCalculateHandler();
        innerTextHandler(stateKeys.firstOperand);
        break;
    }

    if (memoryBtnsArr.includes(btnValue)) {
      onChangeState(btnValue, stateKeys.memory);
    }

    if (numbersAndSimpleOperatorsArr.includes(btnValue) && !state.operator) {
      onChangeState(btnValue, stateKeys.firstOperand);
    }

    if (numbersAndSimpleOperatorsArr.includes(btnValue) && state.operator) {
      onChangeState(btnValue, stateKeys.secondOperand);
    }

    if (mainOperatorsArr.includes(btnValue) && state.secondOperand) {
      answerCalculateHandler();
      onChangeState(btnValue, stateKeys.operator);
    }

    if (mainOperatorsArr.includes(btnValue)) {
      onChangeState(btnValue, stateKeys.operator);
    }

    if (operatorsWithoutSecondOperand.includes(btnValue)) {
      if (state.operator) {
        answerCalculateHandler();
      }

      state.operator = btnValue;
      answerCalculateHandler();
      innerTextHandler(stateKeys.firstOperand);
    }
  }

  function onChangeState(value, changedPlace) {
    if (value === btnsValue.dot && state[changedPlace].includes(btnsValue.dot))
      return;

    switch (value) {
      case btnsValue.plusMinus:
        state[changedPlace] = changeSignOnMinusOrPlus(state[changedPlace]);
        break;
      case btnsValue.procent:
        state[changedPlace] = procent(state[changedPlace], state.roundingValue);
        break;
      case btnsValue.msBtn:
        state[changedPlace] = true;
        state.secondOperand
          ? (state.memory = state.secondOperand)
          : (state.memory = state.firstOperand);
        clearState();
        break;
      case btnsValue.mrBtn:
        state.firstOperand && state.operator
          ? (state.secondOperand = state[changedPlace])
          : (state.firstOperand = state[changedPlace]);
        break;
      case btnsValue.mPlus:
        state[changedPlace] = plus(
          +state[changedPlace],
          +state.firstOperand,
          state.roundingValue
        );
        state.firstOperand = '';
        break;
      case btnsValue.mMinus:
        state[changedPlace] = minus(
          state[changedPlace],
          state.firstOperand,
          state.roundingValue
        );
        state.firstOperand = '';
        break;
      default:
        String(state[changedPlace]) === btnsValue.zero && value !== '.'
          ? (state[changedPlace] = String(value))
          : (state[changedPlace] += String(value));
        break;
    }

    if (state[changedPlace].length > state.screenLength) return;

    changedPlace === stateKeys.operator && state.operator
      ? (state.operator = String(value))
      : null;
    innerTextHandler(changedPlace);
  }

  function answerCalculateHandler() {
    const { firstOperand, secondOperand, operator, roundingValue } = state;

    switch (operator) {
      case btnsValue.plus:
        state.firstOperand = plus(+firstOperand, +secondOperand, roundingValue);
        break;
      case btnsValue.minus:
        state.firstOperand = minus(
          +firstOperand,
          +secondOperand,
          roundingValue
        );
        break;
      case btnsValue.multiple:
        state.firstOperand = multiple(
          +firstOperand,
          +secondOperand,
          roundingValue
        );
        break;
      case btnsValue.divide:
        if (!secondOperand || secondOperand === btnsValue.zero) {
          createErrorNotificationHandler(ERROR_MESSAGES.divideByZero);
          state.firstOperand = '';
        } else {
          state.firstOperand = divide(
            +firstOperand,
            +secondOperand,
            roundingValue
          );
        }

        break;
      case btnsValue.xInY:
        state.firstOperand = xInY(+firstOperand, +secondOperand, roundingValue);
        break;
      case btnsValue.yRootOfX:
        if (secondOperand < 2) {
          createErrorNotificationHandler(ERROR_MESSAGES.yRootLessOf2);
          state.firstOperand = '';
        } else if (firstOperand < 0 && secondOperand % 2 === 0) {
          createErrorNotificationHandler(ERROR_MESSAGES.xRootLessOf0);
          state.firstOperand = '';
        } else {
          state.firstOperand = yRootOfX(
            +firstOperand,
            +secondOperand,
            roundingValue
          );
        }

        break;
      case btnsValue.square:
        state.firstOperand = square(+firstOperand, roundingValue);
        break;
      case btnsValue.cube:
        state.firstOperand = cube(+firstOperand, roundingValue);
        break;
      case btnsValue.rootOfX:
        state.firstOperand = rootOfX(+firstOperand, roundingValue);
        break;
      case btnsValue.cubeRootOfX:
        state.firstOperand = cubeRootOfX(+firstOperand, roundingValue);
        break;
      case btnsValue.tenInX:
        state.firstOperand = tenInX(+firstOperand, roundingValue);
        break;
      case btnsValue.oneDivideX:
        if (!firstOperand || firstOperand === btnsValue.zero) {
          createErrorNotificationHandler(ERROR_MESSAGES.divideByZero);
          state.firstOperand = '';
        } else {
          state.firstOperand = divide(1, +firstOperand, roundingValue);
        }

        break;
      case btnsValue.xFactorial:
        if (
          parseInt(String(firstOperand)) !== firstOperand ||
          firstOperand < 0
        ) {
          createErrorNotificationHandler(
            ERROR_MESSAGES.factorialFromInvalidNumber
          );
          state.firstOperand = '';
        } else {
          state.firstOperand = factorial(+firstOperand);
        }

        break;
    }

    state.secondOperand = '';
    state.operator = '';
  }

  function clearState() {
    state.firstOperand = '';
    state.secondOperand = '';
    state.operator = '';
    scren.innerText = 0;
  }

  function clearMemory() {
    state.memory = '';
    state.memoryTurnOn = false;
    innerTextHandler(stateKeys.memoryTurnOn);
  }

  function innerTextHandler(place) {
    if (place === stateKeys.memoryTurnOn) {
      if (state[place]) {
        memory.innerText = INFO_MESSAGES.memoryText;
        scren.innerText = state.memory || 0;
      } else {
        memory.innerText = '';
        scren.innerText = 0;
      }

      return;
    }

    scren.innerText = state[place] || 0;
  }
};
