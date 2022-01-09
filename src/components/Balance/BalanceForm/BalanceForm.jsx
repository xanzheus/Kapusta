import { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import Stack from '@mui/material/Stack';
import { format } from 'date-fns';
import { useMediaPredicate } from 'react-media-hook';
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
    width: '100%',

    [theme.breakpoints.up(BREAKPOINTS.tablet)]: {
      width: 'inherit',
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
      padding: 0,

      [theme.breakpoints.up(BREAKPOINTS.tablet)]: {
        padding: '0 0 0 20px',
      },
    },

    '& .MuiFormHelperText-root ': {
      display: 'none',

      [theme.breakpoints.up(BREAKPOINTS.tablet)]: {
        display: 'block',
        fontSize: 10,
        lineHeight: 1.16,
        letterSpacing: '0.02em',
        color: '#c7ccdc',
        textAlign: 'center',
      },
    },

    '& .MuiOutlinedInput-root': {
      borderRadius: 0,
    },

    '& .MuiOutlinedInput-notchedOutline': {
      border: `2px solid ${COLORS.mainLight}`,

      [theme.breakpoints.up(BREAKPOINTS.tablet)]: {
        border: '2px solid #F5F6FB',
      },
    },

    '& .css-orzrz6-MuiInputBase-root-MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline':
      {
        borderColor: COLORS.mainAccent,
      },
  },

  description: {
    width: 'inherit',

    '& .MuiOutlinedInput-input': {
      textAlign: 'center',

      [theme.breakpoints.up(BREAKPOINTS.tablet)]: {
        textAlign: 'start',
      },
    },

    '& .MuiOutlinedInput-root': {
      borderRadius: '16px 16px 0 0',

      [theme.breakpoints.up(BREAKPOINTS.tablet)]: {
        width: 197,
        borderRadius: 0,
      },

      [theme.breakpoints.up(BREAKPOINTS.desktop)]: {
        width: 290,
      },
    },
  },

  category: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '0 0 16px 0',
      marginBottom: 30,

      [theme.breakpoints.up(BREAKPOINTS.tablet)]: {
        marginBottom: 0,
        borderRadius: 0,
      },
    },

    '& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input':
      {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 20,
        minHeight: 44,
        justifyContent: 'center',

        [theme.breakpoints.up(BREAKPOINTS.tablet)]: {
          justifyContent: 'start',
        },
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
      borderRadius: 16,
      width: 185,

      marginLeft: 50,
      marginBottom: 155,

      [theme.breakpoints.up(BREAKPOINTS.tablet)]: {
        borderRadius: '0px 16px 16px 0px',
        width: 120,
        marginLeft: 0,
        marginBottom: 0,
      },
    },

    '& .MuiOutlinedInput-input': {
      padding: '0 0 0 20px',
      borderLeft: `2px solid ${COLORS.mainLight}`,

      [theme.breakpoints.up(BREAKPOINTS.tablet)]: {
        padding: '0 10px 0 0',
        borderLeft: '2px solid transparent',
      },
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
  const [commentError, setCommentError] = useState(false);
  const [amountError, setAmountError] = useState(false);
  const [isCalculator, setIsCalculator] = useState(false);

  const classes = useStyles();

  const [createTransaction] = useCreateTransactionMutation();

  const small = useMediaPredicate('(max-width: 767px)');
  const medium = useMediaPredicate('(min-width: 768px) and (max-width: 1279px)');
  const large = useMediaPredicate('(min-width: 1280px)');

  // LOCALISE
  const { t } = useTranslation();
  // const TRANSLATE_CATEGORIES = t('catagories', { returnObjects: true });
  // console.log('catagory balance', TRANSLATE_CATEGORIES);

  const reset = () => {
    setCategory('');
    setComment('');
    setAmount('');
    setCommentError(false);
    setCategoryError(false);
    setAmountError(false);
    setIsCalculator(false);
    toast.success(t('balanceForm.clearForm'));
  };

  const onSubmit = event => {
    event.preventDefault();

    if (comment && category && amount) {
      if (amount <= 0) {
        toast.error(t('balanceForm.amountGreaterZero'));
        return;
      }

      const result = {
        date: format(initialDate, 'yyyy-MM-dd'),
        category: TRANSLATE_CATEGORIES[category],
        comment: comment,
        amount: amount,
        type,
      };

      console.log(result);
      createTransaction(result);
      reset();
      toast(t('balanceForm.transactionAdded'), {
        icon: '👏',
      });
    }

    if (comment === '') {
      setCommentError(true);
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
        {small && (
          <>
            <TextField
              className={[classes.field, classes.description].join(' ')}
              color="info"
              helperText={t('balanceForm.enterDescription')}
              label="Описание товара"
              error={commentError}
              onChange={handleChangeDescription}
              value={comment}
              type="text"
              name="description"
            />

            <Box className={[classes.field, classes.category].join(' ')}>
              <FormControl fullWidth>
                <InputLabel>Категория товара</InputLabel>
                <Select
                  color="info"
                  error={categoryError}
                  label="Категория товара"
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
              placeholder="00.00 UAH"
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
                <Button
                  name={t('balanceForm.enterButton')}
                  type="submit"
                  variant="greyBackground"
                />
                <Button
                  name={t('balanceForm.clearButton')}
                  type="button"
                  variant="greyBackground"
                  onClick={reset}
                />
              </Stack>
            </Stack>
          </>
        )}

        {medium && (
          <>
            <DateInput getCurrentDate={getCurrentDate} initialDate={initialDate} />

            <TextField
              className={[classes.field, classes.description].join(' ')}
              color="info"
              helperText={t('balanceForm.enterDescription')}
              label={placeholder[0]}
              error={commentError}
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
          </>
        )}

        {large && (
          <>
            <DateInput getCurrentDate={getCurrentDate} initialDate={initialDate} />

            <TextField
              className={[classes.field, classes.description].join(' ')}
              color="info"
              helperText={t('balanceForm.enterDescription')}
              label={placeholder[0]}
              error={commentError}
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
          </>
        )}
      </form>

      {isCalculator && <Calculator getAmountFromCalculator={getAmountFromCalculator} />}
    </>
  );
};

BalanceForm.propTypes = {
  placeholder: PropTypes.array,
  categoryArray: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  getCurrentDate: PropTypes.func,
  initialDate: PropTypes.object,
};

export default BalanceForm;
