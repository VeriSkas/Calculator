export const updateHistory = (state) => {
  const stateCopy = { ...state };
  let currentState = { ...state.currentState };
  let previousState = state.history.at(-1);
  let history = stateCopy.history;
  let position;

  if (!similarObjectsCheck(currentState, previousState)) {
    history.push(currentState);
  }

  if (history.length > state.historySize) {
    stateCopy.history = sliceHistory(history, state.historySize);
  }

  position = stateCopy.history.length ? stateCopy.history.length - 1 : 0;
  stateCopy.position = position;

  return stateCopy;
};

export const readHistory = (state) => state.history[state.position];

export const similarObjectsCheck = (obj1, obj2) =>
  JSON.stringify(obj1) === JSON.stringify(obj2);

export const sliceHistory = (history, historySize) =>
  history.slice(historySize / 2);
