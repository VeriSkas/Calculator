import {
  changeSignOnMinusOrPlus,
  cube,
  cubeRootOfX,
  divide,
  factorial,
  minus,
  multiple,
  plus,
  percent,
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
  redoBtn,
  screen,
  stateKeys,
  undoBtn,
} from '../../shared/variables';
import { createErrorNotificationHandler } from '../errorNotification';
import { readHistory, updateHistory } from '../undoRedoFunc/undoRedoFunc';

export const calculatorHandler = () => {
  let state = {
    currentState: {
      firstOperand: '',
      secondOperand: '',
      operator: '',
      memory: '',
      memoryTurnOn: false,
    },
    history: [],
    position: 0,
    screenLength: 14,
    roundingValue: 10,
    historySize: 100,
  };

  state = updateHistory(state);

  btnsContainer.onclick = (event) => {
    makeBtnFunction(event.target.innerText);
    state = updateHistory(state);
  };

  redoBtn.onclick = () => {
    if (state.position < state.history.length - 1) {
      state.position++;
      state.currentState = readHistory(state);
      innerTextInDependOnStateValue(state.currentState);
    }
  };

  undoBtn.onclick = () => {
    if (state.position) {
      state.position--;
      state.currentState = readHistory(state);
      innerTextInDependOnStateValue(state.currentState);
    }
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

    if (
      numbersAndSimpleOperatorsArr.includes(btnValue) &&
      !state.currentState.operator
    ) {
      onChangeState(btnValue, stateKeys.firstOperand);
    }

    if (
      numbersAndSimpleOperatorsArr.includes(btnValue) &&
      state.currentState.operator
    ) {
      onChangeState(btnValue, stateKeys.secondOperand);
    }

    if (
      mainOperatorsArr.includes(btnValue) &&
      state.currentState.secondOperand
    ) {
      answerCalculateHandler();
      onChangeState(btnValue, stateKeys.operator);
    }

    if (mainOperatorsArr.includes(btnValue)) {
      onChangeState(btnValue, stateKeys.operator);
    }

    if (operatorsWithoutSecondOperand.includes(btnValue)) {
      if (state.currentState.operator) {
        answerCalculateHandler();
      }

      state.currentState.operator = btnValue;
      answerCalculateHandler();
      innerTextHandler(stateKeys.firstOperand);
    }
  }

  function onChangeState(value, changedPlace) {
    if (
      value === btnsValue.dot &&
      state.currentState[changedPlace].includes(btnsValue.dot)
    )
      return;

    switch (value) {
      case btnsValue.plusMinus:
        state.currentState[changedPlace] = changeSignOnMinusOrPlus(
          state.currentState[changedPlace]
        );
        break;
      case btnsValue.percent:
        state.currentState[changedPlace] = percent(
          state.currentState[changedPlace],
          state.currentState.roundingValue
        );
        break;
      case btnsValue.msBtn:
        state.currentState[changedPlace] = true;
        state.currentState.secondOperand
          ? (state.currentState.memory = state.currentState.secondOperand)
          : (state.currentState.memory = state.currentState.firstOperand);
        clearState();
        break;
      case btnsValue.mrBtn:
        state.currentState.firstOperand && state.currentState.operator
          ? (state.currentState.secondOperand =
              state.currentState[changedPlace])
          : (state.currentState.firstOperand =
              state.currentState[changedPlace]);
        break;
      case btnsValue.mPlus:
        state.currentState[changedPlace] = plus(
          +state.currentState[changedPlace],
          +state.currentState.firstOperand,
          state.currentState.roundingValue
        );
        state.currentState.firstOperand = '';
        break;
      case btnsValue.mMinus:
        state.currentState[changedPlace] = minus(
          state.currentState[changedPlace],
          state.currentState.firstOperand,
          state.currentState.roundingValue
        );
        state.currentState.firstOperand = '';
        break;
      default:
        String(state.currentState[changedPlace]) === btnsValue.zero &&
        value !== '.'
          ? (state.currentState[changedPlace] = String(value))
          : (state.currentState[changedPlace] += String(value));
        break;
    }

    if (state.currentState[changedPlace].length > state.screenLength) return;

    changedPlace === stateKeys.operator && state.currentState.operator
      ? (state.currentState.operator = String(value))
      : null;
    innerTextHandler(changedPlace);
  }

  function answerCalculateHandler() {
    const { firstOperand, secondOperand, operator } = state.currentState;
    const { roundingValue } = state;

    switch (operator) {
      case btnsValue.plus:
        state.currentState.firstOperand = plus(
          +firstOperand,
          +secondOperand,
          roundingValue
        );
        break;
      case btnsValue.minus:
        state.currentState.firstOperand = minus(
          +firstOperand,
          +secondOperand,
          roundingValue
        );
        break;
      case btnsValue.multiple:
        state.currentState.firstOperand = multiple(
          +firstOperand,
          +secondOperand,
          roundingValue
        );
        break;
      case btnsValue.divide:
        if (!secondOperand || secondOperand === btnsValue.zero) {
          createErrorNotificationHandler(ERROR_MESSAGES.divideByZero);
          state.currentState.firstOperand = '';
        } else {
          state.currentState.firstOperand = divide(
            +firstOperand,
            +secondOperand,
            roundingValue
          );
        }

        break;
      case btnsValue.xInY:
        state.currentState.firstOperand = xInY(
          +firstOperand,
          +secondOperand,
          roundingValue
        );
        break;
      case btnsValue.yRootOfX:
        if (secondOperand < 2) {
          createErrorNotificationHandler(ERROR_MESSAGES.yRootLessOf2);
          state.currentState.firstOperand = '';
        } else if (firstOperand < 0 && secondOperand % 2 === 0) {
          createErrorNotificationHandler(ERROR_MESSAGES.xRootLessOf0);
          state.currentState.firstOperand = '';
        } else {
          state.currentState.firstOperand = yRootOfX(
            +firstOperand,
            +secondOperand,
            roundingValue
          );
        }

        break;
      case btnsValue.square:
        state.currentState.firstOperand = square(+firstOperand, roundingValue);
        break;
      case btnsValue.cube:
        state.currentState.firstOperand = cube(+firstOperand, roundingValue);
        break;
      case btnsValue.rootOfX:
        state.currentState.firstOperand = rootOfX(+firstOperand, roundingValue);
        break;
      case btnsValue.cubeRootOfX:
        state.currentState.firstOperand = cubeRootOfX(
          +firstOperand,
          roundingValue
        );
        break;
      case btnsValue.tenInX:
        state.currentState.firstOperand = tenInX(+firstOperand, roundingValue);
        break;
      case btnsValue.oneDivideX:
        if (!firstOperand || firstOperand === btnsValue.zero) {
          createErrorNotificationHandler(ERROR_MESSAGES.divideByZero);
          state.currentState.firstOperand = '';
        } else {
          state.currentState.firstOperand = divide(
            1,
            +firstOperand,
            roundingValue
          );
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
          state.currentState.firstOperand = '';
        } else {
          state.currentState.firstOperand = factorial(+firstOperand);
        }

        break;
    }

    state.currentState.secondOperand = '';
    state.currentState.operator = '';
  }

  function clearState() {
    state.currentState.firstOperand = '';
    state.currentState.secondOperand = '';
    state.currentState.operator = '';
    screen.innerText = 0;
  }

  function clearMemory() {
    state.currentState.memory = '';
    state.currentState.memoryTurnOn = false;
    innerTextHandler(stateKeys.memoryTurnOn);
  }

  function innerTextHandler(place) {
    if (place === stateKeys.memoryTurnOn) {
      if (state.currentState[place]) {
        memory.innerText = INFO_MESSAGES.memoryText;
        screen.innerText = state.currentState.memory || 0;
      } else {
        memory.innerText = '';
        screen.innerText = 0;
      }

      return;
    }

    screen.innerText = state.currentState[place] || 0;
  }

  function innerTextInDependOnStateValue(currentState) {
    innerTextHandler(stateKeys.memoryTurnOn);

    if (currentState.secondOperand) {
      innerTextHandler(stateKeys.secondOperand);
    } else if (currentState.operator) {
      innerTextHandler(stateKeys.operator);
    } else if (currentState.firstOperand) {
      innerTextHandler(stateKeys.firstOperand);
    } else {
      innerTextHandler(stateKeys.memoryTurnOn);
    }
  }
};
