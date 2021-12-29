import PropTypes from 'prop-types';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Stack from '@mui/material/Stack';
import BalanceLine from 'components/Balance/BalanceLine/BalanceLine';
import TranceActions from 'components/Balance/Mobile/TranceActions';
import Box from '@mui/material/Box';
import GoBackButton from 'components/Balance/Mobile/GoBackButton';
import BalanceForm from 'components/Balance/BalanceForm';
import { expensesCatagoryArray, incomeCatagoryArray, CATEGORYTYPE } from 'Constants/category';
import COLORS from 'Constants/COLORS';
// LOCALISE
import { useTranslation } from 'react-i18next';
import { DateInput } from 'components/Balance/BalanceForm/DateInput';

const useStyles = makeStyles({
  button: {
    height: 55,
    width: '50%',
    border: 'none',
    backgroundColor: COLORS.auxiliaryLight,
    fontSize: 12,
    fontWeight: 700,
    lineHeight: 1.16,
    letterSpacing: '0.02em',

    '&:not(:last-child)': {
      borderRight: `2px solid ${COLORS.mainLight}`,
    },

    '&:hover': {
      color: COLORS.mainLight,
      backgroundColor: COLORS.mainAccent,
    },
  },
});

const MobilePage = ({ getCurrentDate, userData, transactionsData, initialDate }) => {
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [categoryTypes, setCategoryTypes] = useState('');
  const [categories, setCtegories] = useState([]);

  const classes = useStyles();

  const toggleForm = () => setIsOpenForm(!isOpenForm);

  const incomeButtonClick = () => {
    toggleForm();
    setCategoryTypes(CATEGORYTYPE.INCOME);
    setCtegories(incomeCatagoryArray);
  };

  const expenseButtonClick = () => {
    toggleForm();
    setCategoryTypes(CATEGORYTYPE.EXPENSE);
    setCtegories(expensesCatagoryArray);
  };

  const dateObj = { value: '' };

  const getDate = date => (dateObj.value = date);

  // LOCALISE
  const { t } = useTranslation();

  return (
    <>
      {!isOpenForm ? (
        <>
          <Stack style={{ position: 'relative' }}>
            <BalanceLine userData={userData} />
          </Stack>

          <DateInput getCurrentDate={getCurrentDate} initialDate={initialDate} getDate={getDate} />

          <TranceActions transactionsData={transactionsData} />

          <Stack position="absolute" bottom={0} left={0} direction="row" width="100%">
            <button onClick={expenseButtonClick} className={classes.button} type="button">
              {t('headersTabs.consumption')}
            </button>

            <button onClick={incomeButtonClick} className={classes.button} type="button">
              {t('headersTabs.income')}
            </button>
          </Stack>
        </>
      ) : (
        <>
          <Box pt={2}>
            <GoBackButton toggleForm={toggleForm} />
          </Box>

          <BalanceForm categoryArray={categories} type={categoryTypes} initialDate={initialDate} />
        </>
      )}
    </>
  );
};

MobilePage.propTypes = {
  getCurrentDate: PropTypes.func.isRequired,
  userData: PropTypes.array.isRequired,
  transactionsData: PropTypes.array.isRequired,
};

export default MobilePage;
