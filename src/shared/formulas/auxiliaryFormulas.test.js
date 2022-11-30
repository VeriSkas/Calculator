const { expect, test } = require('@jest/globals');

const {
  plus,
  minus,
  multiple,
  divide,
  xInY,
  yRootOfX,
  square,
  cube,
  rootOfX,
  cubeRootOfX,
  tenInX,
  factorial,
  procent,
  changeSignOnMinusOrPlus,
} = require('./auxiliaryFormulas');

// plus

test('adds 1 + 2 equal 3', () => {
  expect(plus(1, 2)).toBe(3);
});

test('adds 0.1 + 0.2 equal 0.3', () => {
  expect(plus(0.1, 0.2, 1)).toBe(0.3);
});

test('adds 0 + 0 equal 0', () => {
  expect(plus(0, 0)).toBe(0);
});

// minus

test('minus 5 - 3 equal 2', () => {
  expect(minus(5, 3)).toBe(2);
});

test('minus 5 - 8 equal -3', () => {
  expect(minus(5, 8)).toBe(-3);
});

test('minus 0.5 - 0.8 equal -0.3', () => {
  expect(minus(0.5, 0.8, 1)).toBe(-0.3);
});

// multiple

test('multiple 10 * 7 equal 70', () => {
  expect(multiple(10, 7)).toBe(70);
});

test('multiple 0 * 15 equal 0', () => {
  expect(multiple(0, 15)).toBe(0);
});

test('multiple -3 * 4 equal -12', () => {
  expect(multiple(-3, 4)).toBe(-12);
});

test('multiple -3 * (-4) equal 12', () => {
  expect(multiple(-3, -4)).toBe(12);
});

test('multiple 0.5 * 0.8 equal 0.04', () => {
  expect(multiple(0.5, 0.8, 1)).toBe(0.4);
});

// divide

test('divide 5 / 3 equal 1.6667', () => {
  expect(divide(5, 3, 4)).toBe(1.6667);
});

test('divide 100 / 25 equal 4', () => {
  expect(divide(100, 25)).toBe(4);
});

test('divide 100 / 0 equal null', () => {
  expect(divide(100, 0)).toBe(null);
});

test('divide 0 / 15 equal 0', () => {
  expect(divide(0, 15)).toBe(0);
});

test('divide 10 / (-5) equal -2', () => {
  expect(divide(10, -5)).toBe(-2);
});

test('divide -10 / (-5) equal 2', () => {
  expect(divide(-10, -5)).toBe(2);
});

// xInY

test('xInY -10 ** 3 equal -1000', () => {
  expect(xInY(-10, 3)).toBe(-1000);
});

test('xInY 100 ** 0.5 equal 10', () => {
  expect(xInY(100, 0.5)).toBe(10);
});

test('xInY 9 ** (-2) equal 0.0123', () => {
  expect(xInY(9, -2, 4)).toBe(0.0123);
});

test('xInY 6 ** 0 equal 1', () => {
  expect(xInY(6, 0)).toBe(1);
});

// yRootOfX

test(' 6 ᵞ√x 0 equal 1', () => {
  expect(yRootOfX(6, 0)).toBe(null);
});

test(' 0 ᵞ√x 6 equal 0', () => {
  expect(yRootOfX(0, 6)).toBe(0);
});

test(' 0 ᵞ√x -5 equal 0', () => {
  expect(yRootOfX(0, -5)).toBe(null);
});

test(' 9 ᵞ√x 2.5 equal 2.4082', () => {
  expect(yRootOfX(9, 2.5, 4)).toBe(2.4082);
});

// square

test('square 0 equal 0', () => {
  expect(square(0)).toBe(0);
});

test('square -2 equal 4', () => {
  expect(square(-2)).toBe(4);
});

test('square 2.55 equal 6.5025', () => {
  expect(square(2.55, 4)).toBe(6.5025);
});

// cube

test('cube 0 equal 0', () => {
  expect(cube(0)).toBe(0);
});

test('cube -2 equal -8', () => {
  expect(cube(-2)).toBe(-8);
});

test('cube 2.55 equal 16.581375', () => {
  expect(cube(2.55, 6)).toBe(16.581375);
});

// rootOfX

test('root of 0 equal 0', () => {
  expect(rootOfX(0)).toBe(0);
});

test('root of -9 equal null', () => {
  expect(rootOfX(-9)).toBe(null);
});

test('root of 0.9 equal 0.9486832981', () => {
  expect(rootOfX(0.9, 10)).toBe(0.9486832981);
});

// cubeRootOfX

test('cube root of 0 equal 0', () => {
  expect(cubeRootOfX(0)).toBe(0);
});

test('cube root of -27 equal -3', () => {
  expect(cubeRootOfX(-27)).toBe(-3);
});

test('cube root of 0.9 equal 0.9654893846', () => {
  expect(cubeRootOfX(0.9, 10)).toBe(0.9654893846);
});

// tenInX

test('10 ** 0 equal 1', () => {
  expect(tenInX(0)).toBe(1);
});

test('10 ** (-5) equal 0.00001', () => {
  expect(tenInX(-5, 5)).toBe(0.00001);
});

// factorial

test('factorial 10 equal 3628800', () => {
  expect(factorial(10)).toBe(3628800);
});

test('factorial -10 equal 0', () => {
  expect(factorial(-10)).toBe(0);
});

test('factorial 2.5 equal 0', () => {
  expect(factorial(2.5)).toBe(0);
});

// procent

test(' 0 % equal 0', () => {
  expect(procent(0)).toBe(0);
});

test(' -6 % equal -0.06', () => {
  expect(procent(-6, 2)).toBe(-0.06);
});

test(' 0.05 % equal 0.0005', () => {
  expect(procent(0.05, 4)).toBe(0.0005);
});

// minus/plus

test(' +/- (5) equal -5', () => {
  expect(changeSignOnMinusOrPlus(5)).toBe(-5);
});

test(' +/- (0.002) equal -0.002', () => {
  expect(changeSignOnMinusOrPlus(-0.002)).toBe(0.002);
});
