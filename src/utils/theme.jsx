import { createTheme } from '@mui/material/styles';
import COLORS from 'Constants/COLORSS';

const theme = createTheme({
  palette: {
    primary: {
      main: COLORS.primary,
    },

    secondary: {
      main: COLORS.mainAccent,
    },
  },
});

export default theme;
