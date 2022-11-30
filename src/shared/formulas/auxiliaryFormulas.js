const {
  createErrorNotificationHandler,
} = require('../../components/errorNotification');
const { ERROR_MESSAGES } = require('../errorMessages');

const BIGGEST_NUMBER = 2 ** 53 - 1;
const MIN_NUMBER = -(2 ** 53 - 1);

const factorial = (num) => {
  if (parseInt(String(num)) !== num || num <= 0 || num > BIGGEST_NUMBER) {
    return 0;
  }

  if (num <= 1) {
    return num;
  }

  return num * factorial(num - 1);
};

const plus = (firstNumber, secondNumber, roundingValue) => {
  const equal = +firstNumber + +secondNumber;

  if (equal < MIN_NUMBER || equal > BIGGEST_NUMBER) {
    createErrorNotificationHandler(ERROR_MESSAGES.tooBigNumber);
    return 0;
  }

  return integerNumberCheck(equal) ? equal : roundNumber(equal, roundingValue);
};

const minus = (firstNumber, secondNumber, roundingValue) => {
  const equal = +firstNumber - +secondNumber;

  if (equal < MIN_NUMBER || equal > BIGGEST_NUMBER) {
    createErrorNotificationHandler(ERROR_MESSAGES.tooBigNumber);
    return 0;
  }

  return integerNumberCheck(equal) ? equal : roundNumber(equal, roundingValue);
};

const multiple = (firstNumber, secondNumber, roundingValue) => {
  const equal = +firstNumber * +secondNumber;

  if (equal < MIN_NUMBER || equal > BIGGEST_NUMBER) {
    createErrorNotificationHandler(ERROR_MESSAGES.tooBigNumber);
    return 0;
  }

  return integerNumberCheck(equal) ? equal : roundNumber(equal, roundingValue);
};

const divide = (firstNumber, secondNumber, roundingValue) => {
  if (!secondNumber) return null;

  const equal = +firstNumber / +secondNumber;

  if (equal < MIN_NUMBER || equal > BIGGEST_NUMBER) {
    createErrorNotificationHandler(ERROR_MESSAGES.tooBigNumber);
    return 0;
  }

  return integerNumberCheck(equal) ? equal : roundNumber(equal, roundingValue);
};

const xInY = (firstNumber, secondNumber, roundingValue) => {
  const equal = (+firstNumber) ** +secondNumber;

  if (equal < MIN_NUMBER || equal > BIGGEST_NUMBER) {
    createErrorNotificationHandler(ERROR_MESSAGES.tooBigNumber);
    return 0;
  }

  return integerNumberCheck(equal) ? equal : roundNumber(equal, roundingValue);
};

const yRootOfX = (firstNumber, secondNumber, roundingValue) => {
  if (secondNumber < 2) {
    return null;
  }

  if (firstNumber < 0 && secondNumber % 2 === 0) {
    return null;
  }

  const equal =
    firstNumber >= 0
      ? (+firstNumber) ** (1 / +secondNumber)
      : -((0 - firstNumber) ** (1 / +secondNumber));

  if (equal < MIN_NUMBER || equal > BIGGEST_NUMBER) {
    createErrorNotificationHandler(ERROR_MESSAGES.tooBigNumber);
    return 0;
  }

  return integerNumberCheck(equal) ? equal : roundNumber(equal, roundingValue);
};

const square = (firstNumber, roundingValue) =>
  xInY(+firstNumber, 2, roundingValue);

const cube = (firstNumber, roundingValue) =>
  xInY(+firstNumber, 3, roundingValue);

const rootOfX = (firstNumber, roundingValue) =>
  yRootOfX(+firstNumber, 2, roundingValue);

const cubeRootOfX = (firstNumber, roundingValue) =>
  yRootOfX(+firstNumber, 3, roundingValue);

const tenInX = (firstNumber, roundingValue) =>
  xInY(10, +firstNumber, roundingValue);

const procent = (num, roundingValue) => divide(num, 100, roundingValue);

const changeSignOnMinusOrPlus = (num) => 0 - num;

const roundNumber = (number, roundingValue) => +number.toFixed(roundingValue);

const integerNumberCheck = (number) => {
  return number ? parseInt(String(number)) === number : null;
};

module.exports = {
  plus,
  minus,
  factorial,
  tenInX,
  cubeRootOfX,
  rootOfX,
  cube,
  square,
  yRootOfX,
  xInY,
  divide,
  multiple,
  procent,
  changeSignOnMinusOrPlus,
};
