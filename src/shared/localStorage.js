export function localStorageHandler(func, key, body) {
  switch (func) {
    case 'setItem':
      localStorage.setItem(key, JSON.stringify(body));
      break;
    case 'getItem':
      return JSON.parse(localStorage.getItem(key));
    case 'deleteItem':
      localStorage.removeItem(key);
      break;
    case 'clearLS':
      localStorage.clear();
      break;
    default:
      break;
  }
}
