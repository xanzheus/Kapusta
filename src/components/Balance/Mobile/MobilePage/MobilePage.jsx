import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { makeStyles } from '@material-ui/core';
import Stack from '@mui/material/Stack';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TextField from '@mui/material/TextField';
import BalanceLine from 'components/Balance/BalanceLine/BalanceLine';
import TranceActions from 'components/Balance/Mobile/TranceActions';
import MobileForm from 'components/Balance/Mobile/MobileForm';
import { expensesCatagoryArray, incomeCatagoryArray, CATEGORYTYPE } from 'Constants/category';
import COLORS from 'Constants/COLORS';

const useStyles = makeStyles({
  field: {
    '& .MuiOutlinedInput-input': {
      minHeight: 44,
      fontSize: 12,
      color: COLORS.primary,
      fontWeight: 700,
      padding: '0 10px 0 0',
    },

    '& .MuiOutlinedInput-notchedOutline': {
      border: '2px solid transparent',
    },
  },

  dateField: {
    width: 130,
    margin: 'auto',

    '& .MuiButtonBase-root': {
      paddingLeft: 0,
    },

    '& .MuiSvgIcon-root': {
      width: 20,
      hight: 20,
    },

    '& .MuiOutlinedInput-input': {
      paddingLeft: 15,
    },
  },

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

const MobilePage = ({ getCurrentDate, userData, transactionsData }) => {
  const [date, setDate] = useState(() => new Date());
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [categoryTypes, setCategoryTypes] = useState('');
  const [categories, setCtegories] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    getCurrentDate(date);
  }, [date, getCurrentDate]);

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

  return (
    <>
      {!isOpenForm ? (
        <>
          <Stack style={{ position: 'relative' }}>
            <BalanceLine userData={userData} />
          </Stack>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack className={classes.dateField}>
              <DatePicker
                inputFormat="dd/MM/yyyy"
                openTo="year"
                value={date}
                onChange={newValue => {
                  setDate(newValue);
                }}
                renderInput={params => (
                  <TextField color="info" className={classes.field} {...params} />
                )}
              />
            </Stack>
          </LocalizationProvider>

          <TranceActions transactionsData={transactionsData} />

          <Stack position="absolute" bottom={0} left={0} direction="row" width="100%">
            <button onClick={expenseButtonClick} className={classes.button} type="button">
              Расход
            </button>

            <button onClick={incomeButtonClick} className={classes.button} type="button">
              Доход
            </button>
          </Stack>
        </>
      ) : (
        <MobileForm
          date={date}
          toggleForm={toggleForm}
          categoryTypes={categoryTypes}
          categories={categories}
        />
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
