import { useState, Fragment } from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Stack from '@mui/material/Stack';
import DateRangePicker from '@mui/lab/DateRangePicker';
import Box from '@mui/material/Box';
// LOCALISE
import { useTranslation } from 'react-i18next';

const PeriodRange = () => {
  const [value, setValue] = useState([null, null]);

  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();

  today = yyyy + '-' + mm + '-' + dd;

  // LOCALISE
  const { t } = useTranslation();

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack spacing={3}>
          <DateRangePicker
            showFirstButton={false}
            startText={t('period.from')}
            endText={t('period.to')}
            // minDate={new Date('2021-03-01')}
            maxDate={new Date(today)}
            value={value}
            onChange={newValue => {
              setValue(newValue);
              console.log(newValue[0]);
              console.log(newValue[0].getFullYear());
            }}
            renderInput={(startProps, endProps) => (
              <Fragment>
                <TextField {...startProps} />
                <Box sx={{ mx: 2 }}> to </Box>
                <TextField {...endProps} />
              </Fragment>
            )}
          />
        </Stack>
      </LocalizationProvider>
    </div>
  );
};

export default PeriodRange;
