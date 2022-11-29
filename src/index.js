import 'boxicons';

import './styles/style.scss';
import { styleThemeUnload } from './components/styleSwitcher';
import { calculatorHandler } from './components/calculator/calculator';
import { scren } from './shared/variables';

window.onload = () => {
  scren.innerText = 0;

  styleThemeUnload();
  calculatorHandler();
};
