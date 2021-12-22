import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMediaPredicate } from 'react-media-hook';
import Stack from '@mui/material/Stack';
import { makeStyles } from '@material-ui/core';
import Button from 'components/Button';
import COLORS from 'Constants/COLORS';
import BREAKPOINTS from 'Constants/BREAKPOINTS';
import trend from 'images/trend.png';

const useStyles = makeStyles(theme => ({
  balance__title: {
    color: COLORS.secondory,
    fontWeight: 500,
    lineHeight: 1.16,
    letterSpacing: '0.02em',
    marginTop: 90,
    marginBottom: 5,

    [theme.breakpoints.up(BREAKPOINTS.tablet)]: {
      marginRight: 40,
      marginBottom: 0,
    },
  },

  balance__input: {
    width: 125,
    height: 44,
    backgroundColor: 'transparent',
    border: `2px solid ${COLORS.mainLight}`,
    borderRadius: '16px 0 0 16px ',
    fontWeight: 700,
    color: COLORS.mainDark,
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    [theme.breakpoints.up(BREAKPOINTS.tablet)]: {
      marginRight: 15,
      borderRadius: 16,
    },

    '&:focus-visible': {
      border: `2px solid ${COLORS.mainAccent}`,
      outline: 'none',
    },

    '&:focus': {
      border: `2px solid ${COLORS.mainAccent}`,
      outline: 'none',
    },

    '&:hover': {
      border: `2px solid ${COLORS.mainAccent}`,
      outline: 'none',
    },

    '&::placeholder': {
      lineHeight: 1.16,
      letterSpacing: '0.02em',
      fontWeight: 700,
      color: COLORS.mainDark,
      textAlign: 'center',
      width: '100%',
    },
  },

  disabled: {
    cursor: 'not-allowed',
    border: `2px solid ${COLORS.mainLight}`,

    '&:hover': {
      outline: 'none',
      border: `2px solid ${COLORS.mainLight}`,
    },
  },

  disable__button: {
    color: COLORS.secondory,
    marginRight: 0,

    borderRadius: '0 16px 16px 0 ',

    [theme.breakpoints.up(BREAKPOINTS.tablet)]: {
      borderRadius: 16,
    },
  },

  reports__link: {
    color: COLORS.secondory,
    lineHeight: 1.16,
    letterSpacing: '0.04em',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    position: 'absolute',
    top: 30,

    [theme.breakpoints.up(BREAKPOINTS.tablet)]: {
      marginLeft: 110,
      position: 'static',
    },

    [theme.breakpoints.up(BREAKPOINTS.desktop)]: {
      marginLeft: 205,
    },

    '&::after': {
      content: "' '",
      display: 'block',
      backgroundImage: `url(${trend})`,
      width: 24,
      height: 24,
      marginLeft: 15,
    },
  },
}));

const BalanceLine = ({ userData }) => {
  const { balance } = userData;

  const classes = useStyles();

  const [amount, setAmount] = useState(balance);
  const [start, setStart] = useState(true);

  const handleChangeBalance = event => setAmount(event.target.value);

  const onSubmit = event => {
    event.preventDefault();

    if (Number(amount) <= 0) {
      alert('Введите сумму');
      return;
    }

    const dateResponse = {
      balance: Number(amount),
      isStart: true,
    };
    console.log(dateResponse);
    console.log(amount);
    setStart(true);
  };

  const small = useMediaPredicate('(max-width: 767px)');
  const medium = useMediaPredicate('(min-width: 768px) and (max-width: 1279px)');
  const large = useMediaPredicate('(min-width: 1280px)');

  return (
    <>
      <Stack
        direction={{ sm: 'column', md: 'row', lg: 'row' }}
        alignItems="center"
        justifyContent="end"
        mb={{ sm: 4, md: 7, lg: 1 }}
      >
        <p className={classes.balance__title}>Баланс: </p>

        {start ? (
          <Stack direction="row">
            <p
              className={[classes.balance__input, classes.disabled].join(' ')}
            >{`${amount} UAH`}</p>
            <p
              className={[classes.balance__input, classes.disabled, classes.disable__button].join(
                ' ',
              )}
            >
              ПОДТВЕРДИТЬ
            </p>
          </Stack>
        ) : (
          <Stack direction="row">
            <input
              className={classes.balance__input}
              placeholder="00.00 UAH"
              onChange={handleChangeBalance}
              type="number"
              name="balance"
            />
            {small && (
              <Button
                name="ПОДТВЕРДИТЬ"
                type="submit"
                onClick={onSubmit}
                variant="secondary"
                borderType="mobile"
              />
            )}
            {medium && (
              <Button name="ПОДТВЕРДИТЬ" type="submit" onClick={onSubmit} variant="secondary" />
            )}
            {large && (
              <Button name="ПОДТВЕРДИТЬ" type="submit" onClick={onSubmit} variant="secondary" />
            )}
          </Stack>
        )}

        <Link className={classes.reports__link} to="/reports">
          Перейти к отчётам
        </Link>
      </Stack>
    </>
  );
};

BalanceLine.propTypes = {
  userData: PropTypes.object.isRequired,
};

export default BalanceLine;
