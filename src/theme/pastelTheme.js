import { createTheme } from '@mui/material/styles';
import '@fontsource/poppins';

const pastelTheme = createTheme({
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: '#FF69B4',
      marginBottom: '0.5rem',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
      color: '#FF69B4',
      marginBottom: '0.5rem',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      color: '#FF69B4',
      marginBottom: '0.5rem',
    },
    h5: {
      fontSize: '1.2rem',
      fontWeight: 400,
      color: '#FF69B4',
      marginBottom: '0.5rem',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
  },
  
  palette: {
    primary: {
      main: '#FFB6C1', 
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#F8C8DC',
    },
    text: {
      primary: '#333',
      secondary: '#5A5A5A',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#FFB6C1',
            },
            '&:hover fieldset': {
              borderColor: '#F8C8DC',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#FF69B4',
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#FFB6C1',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#F8C8DC',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#FF69B4',
          },
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          color: '#5A5A5A',
          '&.Mui-selected': {
            backgroundColor: '#FFB6C1',
            color: '#fff',
          },
          '&:hover': {
            backgroundColor: '#FFDDEE',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: '#FFB6C1',
          '&:hover': {
            backgroundColor: '#F8C8DC',
          },
        },
      },
    },
  },
});

export default pastelTheme;
