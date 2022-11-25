export const switcherItem = document.querySelector(".switcher");
export const switcherSun = document.querySelector(".sun");
export const switcherMoon = document.querySelector(".moon");
export const itemsWithTheme = document.querySelectorAll(".theme");
export const btnsArr = document.querySelectorAll(".item");
export const scren = document.querySelector(
  ".wrapper__content_calc_screen_text"
);
export const memory = document.querySelector(
  ".wrapper__content_calc_screen_memory"
);
export const numbersAndSimpleOperatorsArr = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  ".",
  "+/-",
  "%",
];
export const mainOperatorsArr = ["+", "-", "÷", "×", "xᵞ", "ᵞ√x"];
export const operatorsWithoutSecondOperand = [
  "x²",
  "x³",
  "³√x",
  "²√x",
  "10ᵡ",
  "1/x",
  "x!",
];
export const memoryBtnsArr = ["m+", "m-", "mr"];
export const btnsValue = {
  equal: "=",
  clearAllBtn: "AC",
  msBtn: "ms",
  mcBtn: "mc",
  mPlus: "m+",
  mMinus: "m-",
  mrBtn: "mr",
  dot: ".",
  plusMinus: "+/-",
  procent: "%",
  plus: "+",
  minus: "-",
  divide: "÷",
  multiple: "×",
  square: "x²",
  cube: "x³",
  xInY: "xᵞ",
  tenInX: "10ᵡ",
  oneDivideX: "1/x",
  xFactorial: "x!",
  rootOfX: "²√x",
  cubeRootOfX: "³√x",
  yRootOfX: "ᵞ√x",
  zero: "0",
};

export const stateKeys = {
  firstOperand: "firstOperand",
  secondOperand: "secondOperand",
  operator: "operator",
  memory: "memory",
  memoryTurnOn: "memoryTurnOn",
  screenLength: "screenLength",
  roundingValue: "roundingValue",
};
