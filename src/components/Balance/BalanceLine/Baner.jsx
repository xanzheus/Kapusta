import { makeStyles } from '@material-ui/core';

import COLORS from 'Constants/COLORS';
import BREAKPOINTS from 'Constants/BREAKPOINTS';

const useStyles = makeStyles(theme => ({
  baner: {
    position: 'absolute',
    width: 280,
    left: 0,
    top: 170,
    borderRadius: 30,
    zIndex: 10,
    padding: '30px 30px 40px 30px',

    background: 'linear-gradient(117.84deg, #1D346A 2.84%, #031634 67.28%)',
    boxShadow: '0px 10px 60px rgba(170, 178, 197, 0.2)',

    [theme.breakpoints.up(BREAKPOINTS.tablet)]: {
      left: 184,
      top: 160,
      width: 295,
      height: 163,
    },

    [theme.breakpoints.up(BREAKPOINTS.desktop)]: {
      left: 540,
    },

    [theme.breakpoints.up('1440')]: {
      left: 610,
      top: 160,
    },

    [theme.breakpoints.up('1940')]: {
      left: 860,
      top: 160,
    },
  },

  baner__title: {
    fontSize: 14,
    lineHeight: 1.43,
    color: COLORS.mainLight,
    marginBottom: 20,
  },

  baner__subtitle: {
    fontSize: 14,
    lineHeight: 1.43,
    color: COLORS.mainLight,
  },
}));

const Baner = () => {
  const classes = useStyles();

  return (
    <div className={classes.baner}>
      <p className={classes.baner__title}>
        Привет! Для начала работы внеси текущий баланс своего счета!
      </p>
      <p className={classes.baner__subtitle}>Ты не можешь тратить деньги пока их у тебя нет :)</p>
    </div>
  );
};

export default Baner;
