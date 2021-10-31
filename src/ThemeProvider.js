import { createTheme, ThemeProvider as TP } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: green[500],
      contrastText: '#fff',
    },
    secondary: {
      main: green[300],
    },

  },
  components:{
    MuiOutlinedInput:{
        styleOverrides: {
            // Name of the slot
            root: {
              // Some CSS
              borderRadius: '15px',
            },
            notchedOutline:{
              borderColor:green[400]
            }
          },
    }
  }
});

export function ThemeProvider({ children }) {
    return (
        <TP theme={theme}>
            {children}
        </TP>
    )
}
    