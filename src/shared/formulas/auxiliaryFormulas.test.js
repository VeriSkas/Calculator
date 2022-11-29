const { expect, test } = require('@jest/globals');

const { plus, minus } = require('./auxiliaryFormulas');

test('adds 1 + 2 equal 3', () => {
  expect(plus(1, 2)).toBe(3);
});

test('minus 5 - 3 equal 2', () => {
  expect(minus(5, 3)).toBe(2);
});
