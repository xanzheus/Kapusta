import { useState } from 'react';
import PropTypes from 'prop-types';
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
import BalanceFormButtons from 'components/Buttons/Buttons';
import style from './BalanceTable.module.scss';

const Form = ({ placeholder, categoryArray }) => {
  const [date, setDate] = useState(new Date());
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [sum, setSum] = useState('');

  const reset = () => {
    setCategory('');
    setDescription('');
    setSum('');
  };

  const handleChangeCategry = event => {
    setCategory(event.target.value);
  };

  const handleChangeDescription = event => {
    setDescription(event.target.value);
  };

  const handleChangeSum = event => {
    setSum(event.target.value);
  };

  const onSubmit = event => {
    event.preventDefault();
    reset();

    const dateResponse = {
      date,
      category,
      description,
      sum,
    };
    console.log(dateResponse);
    console.log('Submit Form');
  };

  const onResetClick = () => {
    reset();
    console.log('Reset');
  };
  return (
    <form className={style.balance__form} autoComplete="off" onSubmit={onSubmit}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack spacing={3}>
          <DatePicker
            inputFormat="dd/MM/yyyy"
            disableFuture
            label="Дата"
            openTo="year"
            value={date}
            onChange={newValue => {
              setDate(newValue);
            }}
            renderInput={params => <TextField {...params} />}
          />
        </Stack>
      </LocalizationProvider>

      <TextField
        helperText="Введите описание"
        id="income"
        label={placeholder[0]}
        onChange={handleChangeDescription}
        value={description}
        type="text"
        name="income"
        required
      />

      <Box className={style.category__field}>
        <FormControl fullWidth>
          <InputLabel id="category">{placeholder[1]}</InputLabel>
          <Select
            labelId="category"
            id="selectCategory"
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
        helperText="Введите сумму"
        id="sum"
        label="0"
        value={sum}
        onChange={handleChangeSum}
        type="number"
        name="income"
        required
      />
      <div className={style.balance__buttons}>
        <BalanceFormButtons
          name={['ВВОД', 'ОЧИСТИТЬ']}
          type={['submit', 'button']}
          onClick={onResetClick}
        />
      </div>
    </form>
  );
};

Form.propTypes = {
  placeholder: PropTypes.array.isRequired,
  categoryArray: PropTypes.array.isRequired,
};

export default Form;
