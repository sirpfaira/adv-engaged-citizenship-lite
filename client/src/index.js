import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import theme from './themes/theme';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <SnackbarProvider maxSnack={3}>
      <App />
    </SnackbarProvider>
  </ThemeProvider>,
  document.getElementById('root')
);
