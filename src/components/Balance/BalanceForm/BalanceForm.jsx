import { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Stack from '@mui/material/Stack';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import CalculateIcon from '@mui/icons-material/Calculate';
import InputAdornment from '@mui/material/InputAdornment';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Button from 'components/Button/Button';
import COLORS from 'Constants/COLORS';
import { format } from 'date-fns';
import BREAKPOINTS from 'Constants/BREAKPOINTS';
import Calculator from 'components/Calculator';
import { TRANSLATE_CATEGORIES } from 'Constants/category';
import { useCreateTransactionMutation } from 'redux/service/transactionApi';

const useStyles = makeStyles(theme => ({
  form: {
    [theme.breakpoints.up(BREAKPOINTS.tablet)]: {
      display: 'flex',
      alignItems: 'flex-start',
      flexWrap: 'wrap',
      marginBottom: 50,
    },

    [theme.breakpoints.up(BREAKPOINTS.desktop)]: {
      display: 'flex',
      alignItems: 'flex-start',
      marginBottom: 60,
    },
  },

  field: {
    '& .MuiInputLabel-root': {
      fontSize: 12,
      lineHeight: 1.16,
      letterSpacing: '0.02em',
      color: '#c7ccdc',
    },

    '& .MuiOutlinedInput-input': {
      minHeight: 44,
      fontSize: 12,
      color: COLORS.primary,
      fontWeight: 700,
      padding: '0 10px 0 20px',
    },

    '& .MuiFormHelperText-root ': {
      fontSize: 10,
      lineHeight: 1.16,
      letterSpacing: '0.02em',
      color: '#c7ccdc',
      textAlign: 'center',
    },

    '& .MuiOutlinedInput-root': {
      borderRadius: 0,
    },

    '& .MuiOutlinedInput-notchedOutline': {
      border: '2px solid #F5F6FB',
    },

    '& .css-orzrz6-MuiInputBase-root-MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline':
      {
        borderColor: COLORS.mainAccent,
      },
  },

  description: {
    [theme.breakpoints.up(BREAKPOINTS.tablet)]: {
      width: 197,
    },

    [theme.breakpoints.up(BREAKPOINTS.desktop)]: {
      width: 290,
    },
  },

  category: {
    [theme.breakpoints.up(BREAKPOINTS.tablet)]: {
      width: 160,
    },

    [theme.breakpoints.up(BREAKPOINTS.desktop)]: {
      width: 190,
    },

    '& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input':
      {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 20,
      },
  },

  amount: {
    width: 120,

    '& .MuiOutlinedInput-root': {
      borderRadius: '0px 16px 16px 0px',
    },

    '& .MuiOutlinedInput-input': {
      padding: '0 10px 0 0',
    },
  },

  dateField: {
    width: 130,
    '& .MuiOutlinedInput-root': {
      borderRadius: '16px 0px 0px 0px',
    },

    '& .css-1yq5fb3-MuiButtonBase-root-MuiIconButton-root:hover': {
      backgroundColor: 'transparent',
    },

    '& .MuiButtonBase-root': {
      paddingLeft: 0,
    },

    '& .MuiSvgIcon-root': {
      width: 20,
      hight: 20,
    },

    '& .css-axso3v-MuiInputBase-root-MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline':
      {
        borderColor: COLORS.mainAccent,
      },

    '& .MuiOutlinedInput-input': {
      paddingLeft: 15,
    },
  },

  calculateButton: {
    cursor: 'pointer',
  },
}));

const BalanceForm = ({ placeholder, categoryArray, type, getCurrentDate, initialDate }) => {
  const [date, setDate] = useState(initialDate);
  const [category, setCategory] = useState('');
  const [comment, setComment] = useState('');
  const [amount, setAmount] = useState('');
  const [categoryError, setCategoryError] = useState(false);
  const [amountError, setAmountError] = useState(false);
  const [isCalculator, setIsCalculator] = useState(false);

  const [createTransaction] = useCreateTransactionMutation();

  const classes = useStyles();

  const reset = () => {
    setCategory('');
    setComment('');
    setAmount('');
    setCategoryError(false);
    setAmountError(false);
    setIsCalculator(false);
  };

  const handleChangeCategry = event => setCategory(event.target.value);

  const handleChangeDescription = event => setComment(event.target.value);

  const handleChangeSum = event => setAmount(event.target.value);

  const onSubmit = event => {
    event.preventDefault();

    if (category && amount) {
      if (amount <= 0) {
        alert('Сумма должна быть дольше нуля');
        return;
      }

      const result = {
        date: format(date, 'yyyy-MM-dd'),
        category: TRANSLATE_CATEGORIES[category],
        comment,
        amount,
        type,
      };

      createTransaction(result);
      reset();
    }

    if (category === '') {
      setCategoryError(true);
    }

    if (amount === '') {
      setAmountError(true);
    }
  };

  const onResetClick = () => reset();

  const getAmountFromCalculator = amount => {
    setAmount(amount.result);
    setIsCalculator(!isCalculator);
  };

  return (
    <>
      <form noValidate className={classes.form} autoComplete="off" onSubmit={onSubmit}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Stack className={classes.dateField}>
            <DatePicker
              inputFormat="dd/MM/yyyy"
              openTo="year"
              value={date}
              onChange={newValue => {
                setDate(newValue);
                getCurrentDate(newValue);
              }}
              renderInput={params => (
                <TextField color="info" className={classes.field} {...params} />
              )}
            />
          </Stack>
        </LocalizationProvider>

        <TextField
          className={[classes.field, classes.description].join(' ')}
          color="info"
          helperText="Введите описание"
          label={placeholder[0]}
          onChange={handleChangeDescription}
          value={comment}
          type="text"
          name="description"
        />
        <Box className={[classes.field, classes.category].join(' ')}>
          <FormControl fullWidth>
            <InputLabel>{placeholder[1]}</InputLabel>
            <Select
              color="info"
              error={categoryError}
              label={placeholder[1]}
              value={category}
              onChange={handleChangeCategry}
              required
            >
              {categoryArray.map(item => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <TextField
          color="info"
          className={[classes.field, classes.amount].join(' ')}
          helperText="Введите сумму"
          placeholder="0,00"
          value={amount}
          onChange={handleChangeSum}
          type="number"
          name="amount"
          required
          error={amountError}
          InputProps={{
            startAdornment: (
              <InputAdornment color="info" position="start">
                <CalculateIcon
                  className={classes.calculateButton}
                  onClick={() => setIsCalculator(!isCalculator)}
                />
              </InputAdornment>
            ),
          }}
        />

        <Stack m="auto" mt={{ md: 4, lg: 0 }}>
          <Stack spacing={2} direction="row" alignItems="center">
            <Button name="ВВОД" type="submit" />
            <Button name="ОЧИСТИТЬ" type="button" onClick={onResetClick} />
          </Stack>
        </Stack>
      </form>

      {isCalculator && <Calculator getAmountFromCalculator={getAmountFromCalculator} />}
    </>
  );
};

BalanceForm.propTypes = {
  placeholder: PropTypes.array.isRequired,
  categoryArray: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  getCurrentDate: PropTypes.func.isRequired,
  initialDate: PropTypes.object.isRequired,
};

export default BalanceForm;
