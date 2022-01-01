import { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import TextField from '@mui/material/TextField';
import CalculateIcon from '@mui/icons-material/Calculate';
import GoBackButton from 'components/Balance/Mobile/GoBackButton';
import InputAdornment from '@mui/material/InputAdornment';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Button from 'components/Button/Button';
import COLORS from 'Constants/COLORS';
import Calculator from 'components/Calculator';
import { TRANSLATE_CATEGORIES } from 'Constants/category';
import { useUpdateTransactionMutation } from 'redux/service/transactionApi';
import { DateInput } from 'components/Balance/BalanceForm/DateInput';
import EditModal from 'components/Modal/EditModal';

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
    },

    '& .MuiFormHelperText-root ': {
      display: 'none',
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

    '& .MuiOutlinedInput-input': {
      textAlign: 'center',
    },

    '& .MuiOutlinedInput-root': {
      borderRadius: '16px 16px 0 0',
      marginTop: 20,
    },
  },

  category: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '0 0 16px 0',
      marginBottom: 30,
    },

    '& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input':
      {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 20,
        minHeight: 44,
        justifyContent: 'center',
      },
  },

  amount: {
    '& .MuiOutlinedInput-root': {
      borderRadius: 16,
      width: 185,

      marginBottom: 155,
    },

    '& .MuiOutlinedInput-input': {
      padding: '0 0 0 20px',
      borderLeft: `2px solid ${COLORS.mainLight}`,
    },
  },

  calculateButton: {
    cursor: 'pointer',
  },
});

const MobileEditForm = ({
  type,
  initialAmount,
  initialComment,
  initialCategory,
  categoryArray,
  id,
  editDate,
}) => {
  const [category, setCategory] = useState(initialCategory);
  const [comment, setComment] = useState(initialComment);
  const [amount, setAmount] = useState(initialAmount);
  const [categoryError, setCategoryError] = useState(false);
  const [commentError, setCommentError] = useState(false);
  const [amountError, setAmountError] = useState(false);
  const [isCalculator, setIsCalculator] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const prepareDate = editDate.slice(0, editDate.indexOf('T'));
  const resultDate = new Date(prepareDate);

  const toggleEditForm = () => setOpenEditModal(!openEditModal);

  const classes = useStyles();

  const [updateTransaction] = useUpdateTransactionMutation();

  // LOCALISE
  const { t } = useTranslation();

  const reset = () => {
    setCategoryError(false);
    setCommentError(false);
    setAmountError(false);
    setIsCalculator(false);
  };

  const dateObj = { value: '' };

  const getDate = date => (dateObj.value = date);

  const onSubmit = event => {
    event.preventDefault();

    if (category && amount && comment) {
      if (amount <= 0) {
        toast.error(t('balanceForm.amountGreaterZero'));
        return;
      }

      const result = {
        id,
        date: dateObj.value,
        category: TRANSLATE_CATEGORIES[category],
        comment: comment,
        amount: amount,
        type,
      };

      if (
        category === initialCategory &&
        comment === initialComment &&
        Number(amount) === initialAmount &&
        resultDate.toString() === new Date(dateObj.value).toString()
      ) {
        toast.error(t('MobileEditForm.NothingHasChanged'));

        return;
      }

      updateTransaction(result);
      reset();
      toast(t('balanceForm.transactionUpdate'), {
        icon: '👏',
      });
      toggleEditForm();
    }

    if (category === '') {
      setCategoryError(true);
    }

    if (comment === '') {
      setCommentError(true);
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
      <EditIcon className={classes.buttonIcon} onClick={toggleEditForm} />

      {openEditModal && (
        <EditModal openEditModal={openEditModal} toggleEditForm={toggleEditForm}>
          <Box pt={3} textAlign="left" ml={2}>
            <GoBackButton toggleForm={toggleEditForm} />
          </Box>

          <form noValidate className={classes.form} autoComplete="off" onSubmit={onSubmit}>
            <>
              <DateInput initialDate={resultDate} getDate={getDate} edit={true} />

              <TextField
                className={[classes.field, classes.description].join(' ')}
                color="info"
                error={commentError}
                helperText={t('balanceForm.enterDescription')}
                onChange={handleChangeDescription}
                value={comment}
                type="text"
                name="description"
              />

              <Box className={[classes.field, classes.category].join(' ')}>
                <FormControl fullWidth>
                  <Select
                    color="info"
                    error={categoryError}
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

              <Stack direction="row" justifyContent="center">
                <Button name={t('MobileEditForm.updateButton')} type="submit" />
              </Stack>
            </>
          </form>

          {isCalculator && <Calculator getAmountFromCalculator={getAmountFromCalculator} />}
        </EditModal>
      )}
    </>
  );
};

MobileEditForm.propTypes = {
  type: PropTypes.string.isRequired,
  initialAmount: PropTypes.number.isRequired,
  initialComment: PropTypes.string.isRequired,
  initialCategory: PropTypes.string.isRequired,
  categoryArray: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
  editDate: PropTypes.string.isRequired,
};

export default MobileEditForm;
