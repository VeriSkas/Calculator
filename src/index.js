import './styles/style.scss';
import { styleThemeUnload } from './components/styleSwitcher';
import { calculatorHandler } from './components/calculator/calculator';
import { screen } from './shared/variables';

window.onload = () => {
  screen.innerText = 0;

  styleThemeUnload();
  calculatorHandler();
};
