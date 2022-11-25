import { factorial } from "../../shared/auxiliaryFormulas";
import { ERROR_MESSAGES } from "../../shared/errorMessages";
import { INFO_MESSAGES } from "../../shared/infoMessages";
import {
  btnsArr,
  btnsValue,
  mainOperatorsArr,
  memory,
  memoryBtnsArr,
  numbersAndSimpleOperatorsArr,
  operatorsWithoutSecondOperand,
  scren,
  stateKeys,
} from "../../shared/variables";
import { createErrorNotificationHandler } from "../errorNotification";

export const calculatorHandler = () => {
  let state = {
    firstOperand: "",
    secondOperand: "",
    operator: "",
    memory: "",
    memoryTurnOn: false,
    screenLength: 25,
    roundingValue: 4,
  };

  btnsArr.forEach((item) => {
    const btn = item;

    btn.onclick = (event) => {
      makeBtnType(event.target.innerText);
    };
  });

  function clearState() {
    state.firstOperand = "";
    state.secondOperand = "";
    state.operator = "";
    scren.innerText = 0;
  }

  function clearMemory() {
    state.memory = "";
    state.memoryTurnOn = false;
    innerTextHandler(stateKeys.memoryTurnOn);
  }

  function makeBtnType(btnValue) {
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
      default:
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
    const stringValue = String(value);

    if (state[changedPlace].length >= state.screenLength) return;

    if (value === btnsValue.dot && state[changedPlace].includes(btnsValue.dot))
      return;

    if (value === btnsValue.plusMinus) {
      state[changedPlace] = String(0 - state[changedPlace]);
    } else if (value === btnsValue.procent) {
      state[changedPlace] = String(state[changedPlace] / 100);
    } else if (value === btnsValue.msBtn) {
      state[changedPlace] = true;
      state.secondOperand
        ? (state.memory = state.secondOperand)
        : (state.memory = state.firstOperand);
      clearState();
    } else if (value === btnsValue.mrBtn) {
      state.firstOperand = state[changedPlace];
    } else if (value === btnsValue.mPlus) {
      state[changedPlace] = +state[changedPlace] + +state.firstOperand;
      state.firstOperand = "";
    } else if (value === btnsValue.mMinus) {
      state[changedPlace] = state[changedPlace] - state.firstOperand;
      state.firstOperand = "";
    } else {
      state[changedPlace] === btnsValue.zero && value !== "."
        ? (state[changedPlace] = stringValue)
        : (state[changedPlace] += stringValue);
    }

    changedPlace === stateKeys.operator && state.operator
      ? (state.operator = stringValue)
      : null;
    innerTextHandler(changedPlace);
  }

  function answerCalculateHandler() {
    const { firstOperand, secondOperand, operator } = state;

    switch (operator) {
      case btnsValue.plus:
        state.firstOperand = +firstOperand + +secondOperand;
        state.secondOperand = "";
        state.operator = "";
        break;
      case btnsValue.minus:
        state.firstOperand = +firstOperand - +secondOperand;
        state.secondOperand = "";
        state.operator = "";
        break;
      case btnsValue.multiple:
        state.firstOperand = +firstOperand * +secondOperand;
        state.secondOperand = "";
        state.operator = "";
        break;
      case btnsValue.divide:
        if (secondOperand === btnsValue.zero) {
          createErrorNotificationHandler(ERROR_MESSAGES.divideByZero);
        }

        secondOperand !== btnsValue.zero
          ? (state.firstOperand = +firstOperand / +secondOperand)
          : (state.firstOperand = "");

        state.secondOperand = "";
        state.operator = "";
        break;
      case btnsValue.xInY:
        state.firstOperand = (+firstOperand) ** +secondOperand;
        state.secondOperand = "";
        state.operator = "";
        break;
      case btnsValue.yRootOfX:
        state.firstOperand = (+firstOperand) ** (1 / +secondOperand);
        state.secondOperand = "";
        state.operator = "";
        break;
      case btnsValue.square:
        state.firstOperand = (+firstOperand) ** 2;
        state.secondOperand = "";
        state.operator = "";
        break;
      case btnsValue.cube:
        state.firstOperand = (+firstOperand) ** 3;
        state.secondOperand = "";
        state.operator = "";
        break;
      case btnsValue.rootOfX:
        state.firstOperand = (+firstOperand) ** (1 / 2);
        state.secondOperand = "";
        state.operator = "";
        break;
      case btnsValue.cubeRootOfX:
        state.firstOperand = (+firstOperand) ** (1 / 3);
        state.secondOperand = "";
        state.operator = "";
        break;
      case btnsValue.tenInX:
        state.firstOperand = 10 ** +firstOperand;
        state.secondOperand = "";
        state.operator = "";
        break;
      case btnsValue.oneDivideX:
        state.firstOperand = 1 / +firstOperand;
        state.secondOperand = "";
        state.operator = "";
        break;
      case btnsValue.xFactorial:
        state.firstOperand = factorial(+firstOperand);
        state.secondOperand = "";
        state.operator = "";
        break;
    }

    if (String(state.firstOperand).includes(btnsValue.dot)) {
      state.firstOperand = (+state.firstOperand).toFixed(state.roundingValue);
    }
  }

  function innerTextHandler(place) {
    if (place === stateKeys.memoryTurnOn) {
      if (state[place]) {
        memory.innerText = INFO_MESSAGES.memoryText;
        scren.innerText = state.memory || 0;
      } else {
        memory.innerText = "";
        scren.innerText = 0;
      }

      return;
    }

    scren.innerText = state[place] || 0;
  }
};