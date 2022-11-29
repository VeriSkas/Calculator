import { localStorageHandler } from '../shared/localStorage';
import {
  switcherItem,
  switcherMoon,
  switcherSun,
  itemsWithTheme,
} from '../shared/variables';

export function styleThemeUnload() {
  const currentTheme = localStorageHandler('getItem', 'theme');

  changeTheme(currentTheme);

  switcherItem.onclick = () => {
    const newTheme = setNewTheme(currentTheme);

    localStorageHandler('setItem', 'theme', newTheme);
    changeTheme(newTheme);
  };
}

export const changeTheme = (theme) => {
  if (!theme || theme === 'light') {
    switcherMoon.className = 'moon';
    switcherSun.className = 'sun hide';
    itemsWithTheme.forEach((item) => {
      item.classList.remove('darkTheme');
    });
  } else {
    switcherMoon.className = 'moon hide';
    switcherSun.className = 'sun';
    itemsWithTheme.forEach((item) => {
      item.classList.add('darkTheme');
    });
  }
};

export const setNewTheme = () => {
  const theme = localStorageHandler('getItem', 'theme');

  return !theme || theme === 'light' ? 'dark' : 'light';
};
