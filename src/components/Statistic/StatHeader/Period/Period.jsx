import { useState } from 'react';
// import TextField from '@mui/material/TextField';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import DatePicker from '@mui/lab/DatePicker';
// import Stack from '@mui/material/Stack';
import s from './Period.module.scss';

const Period = () => {
  const [value, setValue] = useState(new Date());
  const newMonth = value.toLocaleString('ru', { month: 'long' }).toUpperCase();
  const newYear = value.getFullYear();

  const monthRangePicker = (currentDate, range) => {
    const newDate = currentDate.setMonth(currentDate.getMonth() + range);
    setValue(new Date(newDate));
  };

  return (
    <div className={s.period}>
      <h2 className={s.period__title}>Текущий период:</h2>

      <div className={s.period__select}>
        <button
          className={s.search__buttonPickerBack}
          onClick={() => monthRangePicker(value, -1)}
        ></button>

        <div className={s.period__currentDate}>{`${newMonth} ${newYear}`}</div>
        {/* <div className={s.period__currentDate}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
              <DatePicker
                views={['year', 'month']}
                value={value}
                onChange={newValue => {
                  setValue(newValue);
                }}
                renderInput={params => <TextField {...params} helperText={null} />}
              />
            </Stack>
          </LocalizationProvider>
        </div> */}

        <button
          className={s.search__buttonPickerNext}
          onClick={() => monthRangePicker(value, +1)}
        ></button>
      </div>
    </div>
  );
};

export default Period;
