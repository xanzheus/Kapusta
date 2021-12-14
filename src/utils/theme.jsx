import { createTheme } from '@mui/material/styles';
import colors from 'Constants/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
      light: colors.secondory,
    },

    secondary: {
      main: colors.mainAccent,
      light: colors.secondaryAccent,
    },

    accent: {
      main: colors.mainAccent,
      light: colors.secondaryAccent,
    },

    transparent: {
      main: colors.transparent,
    },
  },
});

export default theme;
