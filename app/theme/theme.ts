'use client'

import { createTheme } from '@mui/material/styles'

const customTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#39CCCC',
    },
    secondary: {
      main: '#FFDC00',
    },
    error: {
      main: '#FF4136',
    },
    background: {
      default: '#272B33',
      paper: '#202329',
    },
    text: {
      primary: '#F5F5F5',
      secondary: '#BDBDBD',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
})

customTheme.components = {
  ...customTheme.components,
  MuiLink: {
    ...customTheme.components?.MuiLink,
    styleOverrides: {
      root: {
        textDecoration: 'none',
        color: customTheme.palette.text.primary,
      },
    },
  },
}

export default customTheme
