import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { makeStyles } from '@material-ui/core';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Stack from '@mui/material/Stack';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Button from 'components/Button/Button';
import COLORS from 'Constants/COLORS';
import BREAKPOINTS from 'Constants/BREAKPOINTS';

// import CalculateIcon from '@mui/icons-material/Calculate';
// import InputAdornment from '@mui/material/InputAdornment';

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
      padding: '0 0 0 15px',
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
      width: 200,
    },

    [theme.breakpoints.up(BREAKPOINTS.desktop)]: {
      width: 290,
    },
  },

  category: {
    [theme.breakpoints.up(BREAKPOINTS.tablet)]: {
      width: 165,
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
  },

  dateField: {
    width: 130,
    '& .MuiOutlinedInput-root': {
      borderRadius: '16px 0px 0px 0px',
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
  },
}));

const BalanceForm = ({ placeholder, categoryArray, type, getCurrentDate }) => {
  const [date, setDate] = useState(() => new Date());
  const [category, setCategory] = useState('');
  const [comment, setComment] = useState('');
  const [amount, setAmount] = useState('');
  const [categoryError, setCategoryError] = useState(false);
  const [amountError, setAmountError] = useState(false);

  useEffect(() => {
    getCurrentDate(date);
  }, [date, getCurrentDate]);

  // console.log(format(date, 'yyyy-MM-dd'));
  // console.log(format(startOfMonth(date), 'yyyy-MM-dd'));

  const classes = useStyles();

  const reset = () => {
    setCategory('');
    setComment('');
    setAmount('');
    setCategoryError(false);
    setAmountError(false);
  };

  const handleChangeCategry = event => setCategory(event.target.value);

  const handleChangeDescription = event => setComment(event.target.value);

  const handleChangeSum = event => setAmount(event.target.value);

  const onSubmit = event => {
    event.preventDefault();

    if (category && amount) {
      const dateResponse = {
        date: format(date, 'dd-MM-yyyy'),
        category,
        comment,
        amount: Number(amount),
        type,
      };
      console.log(dateResponse);
      console.log('Submit Form');
      reset();
    }

    if (category === '') {
      setCategoryError(true);
    }

    if (amount === '') {
      setAmountError(true);
    }
  };

  const onResetClick = () => {
    reset();
    console.log('Reset');
  };

  return (
    <form noValidate className={classes.form} autoComplete="off" onSubmit={onSubmit}>
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
              <TextField color="secondary" className={classes.field} {...params} />
            )}
          />
        </Stack>
      </LocalizationProvider>
      <TextField
        className={[classes.field, classes.description].join(' ')}
        helperText="Введите описание"
        color="secondary"
        label={placeholder[0]}
        onChange={handleChangeDescription}
        value={comment}
        type="text"
        name="description"
      />
      <Box className={[classes.field, classes.category].join(' ')}>
        <FormControl color="secondary" fullWidth>
          <InputLabel>{placeholder[1]}</InputLabel>
          <Select
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
        className={[classes.field, classes.amount].join(' ')}
        color="secondary"
        helperText="Введите сумму"
        label="0,00"
        value={amount}
        onChange={handleChangeSum}
        type="number"
        name="amount"
        required
        error={amountError}
        // InputProps={{
        //   startAdornment: (
        //     <InputAdornment position="start">
        //       <CalculateIcon onClick={() => console.log('Button')} />
        //     </InputAdornment>
        //   ),
        // }}
      />

      <Stack m="auto" mt={{ md: 4, lg: 0 }}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Button name="ВВОД" type="submit" />
          <Button name="ОЧИСТИТЬ" type="button" onClick={onResetClick} />
        </Stack>
      </Stack>
    </form>
  );
};

BalanceForm.propTypes = {
  placeholder: PropTypes.array.isRequired,
  categoryArray: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  getCurrentDate: PropTypes.func.isRequired,
};

export default BalanceForm;
