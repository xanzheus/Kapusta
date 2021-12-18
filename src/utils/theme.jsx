import { createTheme } from '@mui/material/styles';

import COLORS from 'Constants/COLORS';

const theme = createTheme({
  palette: {
    primary: {
      main: COLORS.primary,
    },

    secondary: {
      main: COLORS.mainLight,
    },

    info: {
      main: COLORS.mainAccent,
    },
  },

  breakpoints: {
    values: {
      sm: 320,
      md: 768,
      lg: 1280,
    },
  },
});

export default theme;
