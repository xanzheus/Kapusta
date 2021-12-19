import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { makeStyles } from '@material-ui/core';
import Stack from '@mui/material/Stack';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TextField from '@mui/material/TextField';
import TranceActions from 'components/BalanceTable/MobileTable/TranceActions';
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
});

const MobileTable = ({ getCurrentDate }) => {
  const [date, setDate] = useState(() => new Date());
  const classes = useStyles();

  useEffect(() => {
    getCurrentDate(date);
  }, [date, getCurrentDate]);

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack className={classes.dateField}>
          <DatePicker
            inputFormat="dd/MM/yyyy"
            openTo="year"
            value={date}
            onChange={newValue => {
              setDate(newValue);
            }}
            renderInput={params => <TextField color="info" className={classes.field} {...params} />}
          />
        </Stack>
      </LocalizationProvider>

      <TranceActions />

      <Stack direction="row">
        <button>Расход</button>
        <button>Доход</button>
      </Stack>
    </>
  );
};

MobileTable.propTypes = {
  getCurrentDate: PropTypes.func.isRequired,
};

export default MobileTable;
