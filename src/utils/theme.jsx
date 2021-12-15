import { createTheme } from '@mui/material/styles';
import COLORS from 'Constants/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: COLORS.primary,
      light: COLORS.secondory,
    },

    secondary: {
      main: COLORS.mainAccent,
      light: COLORS.secondaryAccent,
    },
  },
});

export default theme;
