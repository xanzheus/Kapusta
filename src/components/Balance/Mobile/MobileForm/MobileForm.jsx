import PropTypes from 'prop-types';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import GoBackButton from 'components/Balance/Mobile/GoBackButton';
import Stack from '@mui/material/Stack';
import format from 'date-fns/format';
import toast from 'react-hot-toast';
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
import Calculator from 'components/Calculator';
import { TRANSLATE_CATEGORIES } from 'Constants/category';

import { useCreateTransactionMutation } from 'redux/service/transactionApi';

// LOCALISE
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
  form: {
    width: '100%',
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
      padding: 0,
      textAlign: 'center',
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
      border: `2px solid ${COLORS.mainLight}`,
    },

    '& .css-orzrz6-MuiInputBase-root-MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline':
      {
        borderColor: COLORS.mainAccent,
      },
  },

  description: {
    width: 'inherit',

    '& .MuiOutlinedInput-root': {
      borderRadius: '16px 16px 0 0',
    },
  },

  category: {
    width: 'inherit',
    marginBottom: 30,

    '& .MuiOutlinedInput-root': {
      borderRadius: '0 0 16px 16px',
    },

    '& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input':
      {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
  },

  amount: {
    width: 185,
    marginLeft: 45,

    '& .MuiOutlinedInput-root': {
      borderRadius: 16,
    },

    '& .MuiOutlinedInput-input': {
      borderLeft: `2px solid ${COLORS.mainLight}`,
    },

    marginBottom: 155,
  },
});

const MobileForm = ({ date, categoryTypes, toggleForm, categories }) => {
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
  // const TRANSLATE_CATEGORIES = t('catagories', { returnObjects: true });

  const reset = () => {
    setCategory('');
    setComment('');
    setAmount('');
    setCategoryError(false);
    setAmountError(false);
    setIsCalculator(false);
    toast.success(t('balanceForm.clearForm'));
  };

  const handleChangeCategry = event => setCategory(event.target.value);

  const handleChangeDescription = event => setComment(event.target.value);

  const handleChangeSum = event => setAmount(event.target.value);

  const onSubmit = event => {
    event.preventDefault();

    if (category && amount) {
      if (amount <= 0) {
        toast.error(t('balanceForm.amountGreaterZero'));

        return;
      }

      const result = {
        date: format(date, 'yyyy-MM-dd'),
        category: TRANSLATE_CATEGORIES[category],
        comment,
        amount,
        type: categoryTypes,
      };
      createTransaction(result);

      reset();

      toggleForm();

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

  const onResetClick = () => reset();

  const toggleCalculator = () => setIsCalculator(!isCalculator);

  const getAmountFromCalculator = amount => {
    setAmount(amount.result);
    toggleCalculator();
  };

  return (
    <>
      <Box pt={2}>
        <GoBackButton toggleForm={toggleForm} />
      </Box>

      <form noValidate className={classes.form} autoComplete="off" onSubmit={onSubmit}>
        <TextField
          className={[classes.field, classes.description].join(' ')}
          color="info"
          label={t('headersTabs.productDescription')}
          onChange={handleChangeDescription}
          value={comment}
          type="text"
          name="description"
        />
        <Box className={[classes.field, classes.category].join(' ')}>
          <FormControl fullWidth>
            <InputLabel>{t('headersTabs.incomeCategory')}</InputLabel>
            <Select
              color="info"
              error={categoryError}
              value={category}
              onChange={handleChangeCategry}
              required
            >
              {categories.map(item => (
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
          value={amount}
          placeholder="00.00 UAH"
          onChange={handleChangeSum}
          type="number"
          name="amount"
          required
          error={amountError}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CalculateIcon className={classes.calculateButton} onClick={toggleCalculator} />
              </InputAdornment>
            ),
          }}
        />

        <Stack m="auto" mt={{ md: 4, lg: 0 }}>
          <Stack spacing={2} direction="row" alignItems="center">
            <Button name={t('balanceForm.enterButton')} type="submit" variant="greyBackground" />
            <Button
              name={t('balanceForm.clearButton')}
              type="button"
              variant="greyBackground"
              onClick={onResetClick}
            />
          </Stack>
        </Stack>
      </form>

      {isCalculator && <Calculator getAmountFromCalculator={getAmountFromCalculator} />}
    </>
  );
};

MobileForm.propTypes = {
  date: PropTypes.object.isRequired,
  categoryTypes: PropTypes.string.isRequired,
  toggleForm: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
};

export default MobileForm;
