import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#eec18d',
    },
    background: {
      default: "#1b1b1b",
      paper: "#242424"
    },
    // secondary: {
    //   main: '#f1aa9b'
    // },
    // background: {
    //   default: '#25253d',
    //   paper: '#b3a3b0',
    // },
    // info: {
    //   main: '#9bc3f0',
    // },
    // error: {
    //   main: '#f0a99b',
    // },
    // warning: {
    //   main: '#f9b17a',
    // },
    // success: {
    //   main: '#b3f9bf',
    // },
  },
  typography: {
    fontSize: 13,
    fontFamily: [
      '"Inter"',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  }
});