import { useState } from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Stack from '@mui/material/Stack';

const Period = () => {
  const [value, setValue] = useState(new Date());

  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();

  today = yyyy + '-' + mm + '-' + dd;

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack spacing={3}>
          <DatePicker
            views={['year', 'month']}
            label="Текущий период"
            // minDate={new Date('2021-03-01')}
            maxDate={new Date(today)}
            value={value}
            onChange={newValue => {
              setValue(newValue);
            }}
            renderInput={params => <TextField {...params} helperText={null} />}
          />
        </Stack>
      </LocalizationProvider>
    </div>
  );
};

export default Period;
