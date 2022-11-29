exports.factorial = (num) => {
  if (num <= 1) {
    return num;
  }

  return num * this.factorial(num - 1);
};

const plus = (firstNumber, secondNumber) => {
  return +firstNumber + +secondNumber;
};

const minus = (firstNumber, secondNumber) => {
  return +firstNumber - +secondNumber;
};

exports.multiple = (firstNumber, secondNumber) => {
  return +firstNumber * +secondNumber;
};

exports.divide = (firstNumber, secondNumber) => {
  return secondNumber ? +firstNumber / +secondNumber : null;
};

exports.xInY = (firstNumber, secondNumber) => {
  return (+firstNumber) ** +secondNumber;
};

exports.yRootOfX = (firstNumber, secondNumber) => {
  return (+firstNumber) ** (1 / +secondNumber);
};

exports.square = (firstNumber) => this.xInY(+firstNumber, 2);

exports.cube = (firstNumber) => this.xInY(+firstNumber, 3);

exports.rootOfX = (firstNumber) => this.xInY(+firstNumber, 1 / 2);

exports.cubeRootOfX = (firstNumber) => this.xInY(+firstNumber, 1 / 3);

exports.tenInX = (firstNumber) => this.xInY(10, +firstNumber);

module.exports = { plus, minus };
