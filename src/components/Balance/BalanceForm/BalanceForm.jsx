import { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import Stack from '@mui/material/Stack';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
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
import BREAKPOINTS from 'Constants/BREAKPOINTS';
import Calculator from 'components/Calculator';
import { TRANSLATE_CATEGORIES } from 'Constants/category';
import { useCreateTransactionMutation } from 'redux/service/transactionApi';
import { DateInput } from './DateInput';

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
      padding: '0 0 0 20px',
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
    '& .MuiOutlinedInput-root': {
      [theme.breakpoints.up(BREAKPOINTS.tablet)]: {
        width: 197,
      },

      [theme.breakpoints.up(BREAKPOINTS.desktop)]: {
        width: 290,
      },
    },
  },

  category: {
    '& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input':
      {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 20,
        minHeight: 44,
      },

    [theme.breakpoints.up(BREAKPOINTS.tablet)]: {
      width: 160,
    },

    [theme.breakpoints.up(BREAKPOINTS.desktop)]: {
      width: 190,
    },
  },

  amount: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '0px 16px 16px 0px',
      width: 120,
    },

    '& .MuiOutlinedInput-input': {
      padding: '0 10px 0 0',
    },
  },

  calculateButton: {
    cursor: 'pointer',
  },
}));

const BalanceForm = ({ placeholder, categoryArray, type, getCurrentDate, initialDate }) => {
  const [category, setCategory] = useState('');
  const [comment, setComment] = useState('');
  const [amount, setAmount] = useState('');
  const [categoryError, setCategoryError] = useState(false);
  const [amountError, setAmountError] = useState(false);
  const [isCalculator, setIsCalculator] = useState(false);

  const classes = useStyles();

  const [createTransaction] = useCreateTransactionMutation();

  // LOCALISE
  const { t } = useTranslation();

  const reset = () => {
    setCategory('');
    setComment('');
    setAmount('');
    setCategoryError(false);
    setAmountError(false);
    setIsCalculator(false);
    toast.success(t('balanceForm.clearForm'));
  };

  const dateObj = { value: '' };

  const getDate = date => (dateObj.value = date);

  const onSubmit = event => {
    event.preventDefault();

    if (category && amount) {
      if (amount <= 0) {
        toast.error(t('balanceForm.amountGreaterZero'));
        return;
      }

      const result = {
        date: dateObj.value,
        category: TRANSLATE_CATEGORIES[category],
        comment: comment,
        amount: amount,
        type,
      };

      createTransaction(result);
      reset();
      toast(t('balanceForm.transactionAdded'), {
        icon: '👏',
      });
    }

    if (category === '') {
      setCategoryError(true);
    }

    if (amount === '') {
      setAmountError(true);
    }
  };

  const getAmountFromCalculator = amount => {
    setAmount(amount.result);
    setIsCalculator(!isCalculator);
  };

  const handleChangeDescription = event => setComment(event.target.value);
  const handleChangeCategry = event => setCategory(event.target.value);
  const handleChangeAmount = event => setAmount(event.target.value);

  return (
    <>
      <form noValidate className={classes.form} autoComplete="off" onSubmit={onSubmit}>
        <DateInput getCurrentDate={getCurrentDate} initialDate={initialDate} getDate={getDate} />

        <TextField
          className={[classes.field, classes.description].join(' ')}
          color="info"
          helperText={t('balanceForm.enterDescription')}
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
          helperText={t('balanceForm.enterAmount')}
          placeholder="0,00"
          value={amount}
          onChange={handleChangeAmount}
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
            <Button name={t('balanceForm.enterButton')} type="submit" />
            <Button name={t('balanceForm.clearButton')} type="button" onClick={reset} />
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
