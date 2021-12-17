import { useState } from 'react';
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
import COLORS from 'Constants/COLORSS';

// import CalculateIcon from '@mui/icons-material/Calculate';
// import InputAdornment from '@mui/material/InputAdornment';

const useStyles = makeStyles({
  form: {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: '60px',
  },

  field: {
    '& .MuiInputLabel-root': {
      fontSize: '12px',
      lineHeight: '1.16',
      letterSpacing: '0.02em',
      color: '#c7ccdc',
    },

    '& .MuiOutlinedInput-input': {
      minHeight: '44px',
      fontSize: '12px',
      color: COLORS.primary,
      fontWeight: '700',
      padding: '0 0 0 15px',
    },

    '& .MuiFormHelperText-root ': {
      fontSize: '10px',
      lineHeight: '1.16',
      letterSpacing: '0.02em',
      color: '#c7ccdc',
      textAlign: 'center',
    },

    '& .MuiOutlinedInput-root': {
      borderRadius: '0',
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
    width: '290px',
  },

  category: {
    width: '190px',
  },

  amount: {
    width: '120px',
    '& .MuiOutlinedInput-root': {
      borderRadius: '0px 16px 16px 0px',
    },
  },

  dateField: {
    width: '130px',
    '& .MuiOutlinedInput-root': {
      borderRadius: '16px 0px 0px 0px',
    },

    '& .MuiButtonBase-root': {
      paddingLeft: '0',
    },

    '& .MuiSvgIcon-root': {
      width: '20px',
      hight: '20px',
    },

    '& .css-axso3v-MuiInputBase-root-MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline':
      {
        borderColor: COLORS.mainAccent,
      },
  },
});

const BalanceForm = ({ placeholder, categoryArray, type }) => {
  const [date, setDate] = useState(() => new Date());
  const [category, setCategory] = useState('');
  const [comment, setComment] = useState('');
  const [amount, setAmount] = useState('');
  const [categoryError, setCategoryError] = useState(false);
  const [amountError, setAmountError] = useState(false);

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

      <Stack ml="auto">
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
};

export default BalanceForm;
