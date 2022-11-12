import { ThemeOptions } from '@mui/material/styles';

const rickAndMorty: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#42B4CA', // Celeste
    },
    secondary: {
      main: '#BFDE42', // Verde
    },
    success: {
      main: '#33A9C2',
    },
    warning: {
      main: '#FFBC19',
    },
    error: {
      main: '#B32709',
    },
    background: {
      default: '#F4F5F7',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#193840',
      // secondary: '#636D70',
      disabled: '#A1A1A1',
    },
    action: {
      active: '#6b778c',
    },
  },
};

export default rickAndMorty;
